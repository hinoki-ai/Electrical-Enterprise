#!/usr/bin/env node

/**
 * 🕊️ DIVINE PARSING ORACLE
 * 
 * Intelligently extracts translation strings from code files
 * Generates i18n JSON files for chunked translation system
 * 
 * Features:
 * - Parses TSX/JSX/TS/JS files
 * - Extracts hardcoded strings
 * - Groups by namespace (page/component)
 * - Generates translation JSON files
 * - Detects nested structures
 * - Handles template literals
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  sourceDirs: ['app', 'components', 'lib'],
  outputDir: 'locales',
  defaultLanguage: 'es',
  languages: ['es', 'en'],
  excludePatterns: [
    /node_modules/,
    /\.next/,
    /\.git/,
    /dist/,
    /build/,
    /test/,
    /spec/,
    /\.test\./,
    /\.spec\./,
  ],
  minStringLength: 2,
  excludeStrings: [
    /^[a-z]+$/i, // Single words (likely variables)
    /^[A-Z][a-z]+$/, // PascalCase (likely components)
    /^[a-z]+[A-Z]/, // camelCase (likely variables)
    /^\d+$/, // Numbers
    /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, // Only symbols
  ],
};

// String extraction patterns
const STRING_PATTERNS = [
  // JSX text content
  />\s*([^<{]+?)\s*</g,
  // String literals
  /["']([^"']{3,})["']/g,
  // Template literals
  /`([^`]{3,})`/g,
  // JSX attributes
  /(?:title|label|placeholder|aria-label|alt|description|text|content|message|error|success|warning|info)\s*[:=]\s*["']([^"']{3,})["']/gi,
];

// Namespace detection patterns
const NAMESPACE_PATTERNS = {
  page: /app\/([^/]+)/,
  component: /components\/([^/]+)/,
  feature: /features\/([^/]+)/,
  dashboard: /dashboard\/([^/]+)/,
};

class DivineParsingOracle {
  constructor(config = {}) {
    this.config = { ...CONFIG, ...config };
    this.extractedStrings = new Map();
    this.fileStats = {
      processed: 0,
      skipped: 0,
      errors: 0,
    };
  }

  /**
   * Main entry point - scan and extract
   */
  async invoke() {
    console.log('🕊️  DIVINE PARSING ORACLE - Starting extraction...\n');

    // Find all source files
    const files = this.findSourceFiles();
    console.log(`Found ${files.length} files to process\n`);

    // Extract strings from each file
    for (const file of files) {
      try {
        await this.extractFromFile(file);
        this.fileStats.processed++;
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
        this.fileStats.errors++;
      }
    }

    // Generate translation files
    this.generateTranslationFiles();

    // Print summary
    this.printSummary();
  }

  /**
   * Find all source files to process
   */
  findSourceFiles() {
    const files = [];
    const rootDir = process.cwd();

    const walkDir = (dir, relativePath = '') => {
      if (!fs.existsSync(dir)) return;

      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.join(relativePath, entry.name);

        // Skip excluded patterns
        if (this.config.excludePatterns.some(pattern => pattern.test(relPath))) {
          continue;
        }

        if (entry.isDirectory()) {
          walkDir(fullPath, relPath);
        } else if (this.isSourceFile(entry.name)) {
          files.push(fullPath);
        }
      }
    };

    for (const sourceDir of this.config.sourceDirs) {
      const dirPath = path.join(rootDir, sourceDir);
      if (fs.existsSync(dirPath)) {
        walkDir(dirPath, sourceDir);
      }
    }

    return files;
  }

  /**
   * Check if file is a source file we should process
   */
  isSourceFile(filename) {
    return /\.(tsx?|jsx?)$/.test(filename);
  }

  /**
   * Extract strings from a single file
   */
  async extractFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const namespace = this.detectNamespace(filePath);
    const strings = this.extractStrings(content);

    // Group strings by namespace
    if (!this.extractedStrings.has(namespace)) {
      this.extractedStrings.set(namespace, new Set());
    }

    const namespaceSet = this.extractedStrings.get(namespace);
    strings.forEach(str => {
      if (this.isValidString(str)) {
        namespaceSet.add(str);
      }
    });
  }

  /**
   * Detect namespace from file path
   */
  detectNamespace(filePath) {
    const relPath = path.relative(process.cwd(), filePath);

    // Try page pattern
    const pageMatch = relPath.match(NAMESPACE_PATTERNS.page);
    if (pageMatch) {
      return pageMatch[1];
    }

    // Try component pattern
    const componentMatch = relPath.match(NAMESPACE_PATTERNS.component);
    if (componentMatch) {
      return componentMatch[1];
    }

    // Try feature pattern
    const featureMatch = relPath.match(NAMESPACE_PATTERNS.feature);
    if (featureMatch) {
      return featureMatch[1];
    }

    // Try dashboard pattern
    const dashboardMatch = relPath.match(NAMESPACE_PATTERNS.dashboard);
    if (dashboardMatch) {
      return dashboardMatch[1];
    }

    // Default to 'common'
    return 'common';
  }

  /**
   * Extract strings from content
   */
  extractStrings(content) {
    const strings = new Set();

    // Remove comments
    const noComments = content
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');

    // Extract using patterns
    for (const pattern of STRING_PATTERNS) {
      const matches = noComments.matchAll(new RegExp(pattern.source, pattern.flags));
      for (const match of matches) {
        if (match[1]) {
          const str = match[1].trim();
          if (str.length >= this.config.minStringLength) {
            strings.add(str);
          }
        }
      }
    }

    return Array.from(strings);
  }

  /**
   * Validate if string should be extracted
   */
  isValidString(str) {
    // Check minimum length
    if (str.length < this.config.minStringLength) {
      return false;
    }

    // Check exclusion patterns
    if (this.config.excludeStrings.some(pattern => pattern.test(str))) {
      return false;
    }

    // Must contain at least one letter
    if (!/[a-zA-Z]/.test(str)) {
      return false;
    }

    // Exclude common code patterns
    if (
      str.includes('${') || // Template literal expressions
      str.includes('{') && str.includes('}') && str.includes('$') || // JSX expressions
      str.startsWith('http') || // URLs
      str.startsWith('@') || // Mentions/imports
      str.startsWith('#') || // Hashes/IDs
      /^[a-z]+:\/\//.test(str) // URLs
    ) {
      return false;
    }

    return true;
  }

  /**
   * Generate translation JSON files
   */
  generateTranslationFiles() {
    const outputBase = path.join(process.cwd(), this.config.outputDir);

    // Create output directories
    for (const lang of this.config.languages) {
      const langDir = path.join(outputBase, lang);
      if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
      }
    }

    // Generate files for each namespace
    for (const [namespace, strings] of this.extractedStrings.entries()) {
      const sortedStrings = Array.from(strings).sort();

      for (const lang of this.config.languages) {
        const filePath = path.join(outputBase, lang, `${namespace}.json`);
        const existing = this.loadExistingTranslations(filePath);
        
        // Merge existing with new strings
        const translations = { ...existing };
        sortedStrings.forEach(str => {
          const key = this.stringToKey(str);
          if (!translations[key]) {
            translations[key] = lang === this.config.defaultLanguage ? str : '';
          }
        });

        // Write file
        fs.writeFileSync(
          filePath,
          JSON.stringify(translations, null, 2) + '\n',
          'utf8'
        );
      }
    }
  }

  /**
   * Load existing translations from file
   */
  loadExistingTranslations(filePath) {
    if (!fs.existsSync(filePath)) {
      return {};
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.warn(`Warning: Could not parse ${filePath}`);
      return {};
    }
  }

  /**
   * Convert string to translation key
   */
  stringToKey(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 50);
  }

  /**
   * Print summary statistics
   */
  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('🕊️  DIVINE PARSING ORACLE - Extraction Complete');
    console.log('='.repeat(60));
    console.log(`Files processed: ${this.fileStats.processed}`);
    console.log(`Files skipped: ${this.fileStats.skipped}`);
    console.log(`Errors: ${this.fileStats.errors}`);
    console.log(`Namespaces found: ${this.extractedStrings.size}`);
    
    let totalStrings = 0;
    for (const [namespace, strings] of this.extractedStrings.entries()) {
      const count = strings.size;
      totalStrings += count;
      console.log(`  ${namespace}: ${count} strings`);
    }
    
    console.log(`Total strings extracted: ${totalStrings}`);
    console.log(`Output directory: ${this.config.outputDir}`);
    console.log('='.repeat(60) + '\n');
  }
}

// CLI interface
const oracle = new DivineParsingOracle();
oracle.invoke().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

export default DivineParsingOracle;

