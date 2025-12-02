import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function generateRealPDF() {
  console.log('🚀 Starting PDF generation...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to the generate-pdf.html file
  const htmlPath = `file://${join(projectRoot, 'generate-pdf.html')}`;
  await page.goto(htmlPath);
  
  console.log('📄 Loaded HTML file, waiting for libraries to load...');
  await page.waitForTimeout(2000);
  
  // Click the generate button
  console.log('🖱️  Clicking generate button...');
  await page.click('button:has-text("Generar PDF")');
  
  // Wait for PDF generation to complete
  console.log('⏳ Waiting for PDF generation...');
  await page.waitForTimeout(5000);
  
  // Check if PDF was generated (look for success message)
  const statusText = await page.textContent('#status');
  console.log('📊 Status:', statusText);
  
  // Generate PDF using Playwright's built-in PDF generation
  console.log('📑 Generating PDF using Playwright...');
  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm'
    },
    printBackground: true
  });
  
  // Save the PDF
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `proyecto-electrico-test-${timestamp}.pdf`;
  const outputPath = join(projectRoot, filename);
  
  writeFileSync(outputPath, pdfBuffer);
  
  console.log('✅ PDF generated successfully!');
  console.log('📁 Saved to:', outputPath);
  console.log('📊 File size:', (pdfBuffer.length / 1024).toFixed(2), 'KB');
  
  await browser.close();
  
  return outputPath;
}

generateRealPDF().catch(console.error);

