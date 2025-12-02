# Presupuestador

Electrical Enterprise Quoting System - A comprehensive quoting and estimation tool for electrical projects.

## 📋 Important Notes

**PDF Layout Blueprints**: The `docs/pdf-enhancement.zip` file contains blueprints that define the PDF layout requirements. These blueprints are authoritative and must not be modified or challenged. All PDF layout and formatting decisions should follow the specifications contained in this zip file. See [PDF_BLUEPRINTS.md](./docs/PDF_BLUEPRINTS.md) for detailed information.

**Website Development**: All other files and directories in this repository constitute the website application being developed.

## 🚀 Deployment

- **GitHub Repository**: [quoter-DEV](https://github.com/hinoki-ai/quoter-DEV)
- **Vercel Project**: quoter-aramac
- **Live URL**: [quote.aramac.dev](https://quote.aramac.dev)

### Quick Deploy

**When you type "deploy", use the automated deployment script:**

```bash
# One command deploys everything:
npm run deploy

# Or with custom commit message:
./scripts/deploy.sh "Your commit message"
```

The deployment script automatically:
1. ✅ Lints code
2. ✅ Builds Next.js project
3. ✅ Commits all changes
4. ✅ Pushes to GitHub
5. ✅ Deploys Convex backend
6. ✅ Deploys to Vercel production

**Note**: Always ensure all changes are committed before deploying. The script handles this automatically.

## 🛠 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom UI components with shadcn/ui
- **Database**: Convex (real-time database)
- **Authentication**: Clerk
- **Deployment**: Vercel

## 📦 Features

### Core Features
- **Project Management**: Complete project information and configuration
- **Quote Generation**: Professional electrical quotes with detailed breakdowns
- **Calculator**: Advanced electrical calculation tools
- **Document Generation**: PDF quote documents with professional formatting
- **Print Functionality**: Optimized printing with proper page breaks
- **Responsive Design**: Mobile-first design with adaptive layouts

### Data & Persistence
- **Real-time Database**: Convex-powered data persistence
- **Quote Management**: Save, load, and manage quote history
- **Calculator Sessions**: Persistent calculator state and presets
- **Client Management**: Client database and relationship management

### PDF System
- **Modular PDF Components**: 8 specialized components for different document sections
- **Authoritative Blueprints**: PDF layout specifications in `docs/pdf-enhancement.zip`
- **CSS Variables**: Theme-consistent styling with custom CSS properties
- **Multi-page Documents**: Professional article-based layout structure

### Additional Tools
- **Templates**: Reusable quote templates
- **Reports**: Analytics and reporting dashboard
- **Backup/Restore**: Data backup and restoration
- **Settings**: Application configuration and preferences

## 📋 PDF Implementation Guidelines

### Critical Rules

1. **Blueprint Authority**: The `docs/pdf-enhancement.zip` file contains authoritative PDF layout specifications. **Do NOT modify or challenge these blueprints.**

2. **CSS Variables**: Use CSS custom properties instead of Tailwind utility classes:
   ```tsx
   // ✅ Correct
   className="bg-[var(--header-bg)] text-[var(--header-foreground)]"

   // ❌ Wrong
   className="bg-primary text-primary-foreground"
   ```

3. **Modular Components**: PDF system uses 8 specialized components:
   - `document-header.tsx` - Document header section
   - `document-footer.tsx` - Document footer
   - `project-info.tsx` - Project information
   - `partidas-table.tsx` - Line items table
   - `regularizacion-section.tsx` - Regularization section
   - `options-comparison.tsx` - Options comparison
   - `anexo-section.tsx` - Annex section
   - `resumen-cobros.tsx` - Payment summary

4. **Multi-page Structure**: Use article-based layout with proper page breaks:
   ```tsx
   <div id="electrical-quote-document">
     <article className="bg-card shadow-sm">
       {/* Page 1 content */}
     </article>
     <article className="bg-card shadow-sm mt-4 page-break">
       {/* Page 2 content */}
     </article>
   </div>
   ```

### Implementation Resources

- **Quick Start**: `docs/pdf-implementation/START_HERE_PDF_IMPLEMENTATION.md`
- **Detailed Guide**: `docs/pdf-implementation/IMPLEMENTATION_PROMPT.md`
- **Checklist**: `docs/pdf-implementation/IMPLEMENTATION_CHECKLIST.md`
- **Best Practices**: `docs/pdf-implementation/PDF_BEST_PRACTICES.md`
- **Reference**: `docs/pdf-implementation/PDF_QUICK_REFERENCE.md`

## 🏃‍♂️ Local Development

### Prerequisites

#### 1. Convex Database Setup (Required for Data Persistence)

**Option A: Quick Setup (Recommended)**
```bash
# One-command setup
npm run convex:auth
```
This will open your browser for Convex account login/signup and project setup.

**Option B: Manual Setup**
```bash
# 1. Authenticate with Convex
npx convex dev

# 2. This opens browser - sign in and create/select project

# 3. Get your deployment URL from dashboard
npx convex dashboard

# 4. Update .env.local with your URL:
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# 5. Deploy schema and generate types
npx convex deploy
npx convex codegen
```

**Features Added with Convex:**
- Real-time database for quotes and line items
- Persistent quote management and history
- Calculator session storage
- Anonymous access (no user authentication required)

#### 2. Internationalization Setup

The app supports Spanish and English. Translation files are located in:
- `locales/es/` - Spanish translations
- `locales/en/` - English translations

#### 3. No Additional Authentication Required

The application uses anonymous access for quote management - no user login needed.

### Development Commands

```bash
# Install dependencies
npm install

# Development
npm run dev             # Start development server (port 3000)
npm run convex:dev      # Start Convex development server

# Building
npm run build           # Build for production
npm run lint            # Run ESLint

# Database & Types
npx convex deploy       # Deploy Convex schema changes
npx convex codegen      # Generate TypeScript types
npx convex dashboard    # Open Convex dashboard

# Testing
npm run test:e2e        # Run end-to-end tests
npm run test:e2e:ui     # Run tests with UI

# Deployment
npm run deploy          # Complete deployment (lint, build, commit, push, deploy)
./scripts/deploy.sh "Your message"  # Custom commit message deployment
```

## 📄 Project Structure

```
├── app/                    # Next.js app directory (pages and layouts)
│   ├── advanced-calculator/
│   ├── quote/[id]/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/             # React components
│   ├── features/          # Feature-specific components
│   │   ├── index.ts      # Barrel exports
│   │   └── *.tsx         # Feature components
│   ├── providers/         # Context providers
│   │   ├── index.ts      # Barrel exports
│   │   ├── providers.tsx
│   │   └── theme-provider.tsx
│   └── ui/                # Reusable UI component library
├── constants/              # Application constants
│   └── index.ts
├── convex/                # Convex backend functions and schema
│   ├── _generated/
│   ├── auth.config.ts
│   ├── auth.ts
│   ├── calculator_sessions.ts
│   ├── line_items.ts
│   ├── quotes.ts
│   ├── schema.ts
│   └── tsconfig.json
├── docs/                  # Documentation and project files
│   ├── PDF_BLUEPRINTS.md          # PDF layout specifications
│   ├── pdf-enhancement.zip        # Authoritative PDF blueprints
│   ├── Proyecto Graciela 2025.pdf # Project documentation
│   ├── setup/                     # Setup and configuration guides
│   │   ├── CONVEX_SETUP.md        # Convex database setup
│   │   └── I18N_SETUP.md          # Internationalization setup
│   ├── pdf-implementation/        # PDF system implementation docs
│   │   ├── START_HERE_PDF_IMPLEMENTATION.md
│   │   ├── IMPLEMENTATION_PROMPT.md
│   │   ├── IMPLEMENTATION_CHECKLIST.md
│   │   ├── PDF_BEST_PRACTICES.md
│   │   └── PDF_QUICK_REFERENCE.md
│   └── archive/                   # Archived documentation
├── hooks/                 # Custom React hooks
│   ├── index.ts          # Barrel exports
│   ├── use-auth.tsx
│   ├── use-current-quote.tsx
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/                   # Utility functions and helpers
│   ├── index.ts          # Barrel exports
│   ├── pdf-generator.ts
│   ├── pricing-plans.ts
│   └── utils.ts
├── public/                # Static assets
├── scripts/               # Setup and utility scripts
├── types/                 # TypeScript type definitions
│   ├── index.ts
│   ├── pricing.ts
│   └── quote.ts
└── [config files]         # package.json, tsconfig.json, etc.
```

### Directory Details

- **`app/`** - Next.js 13+ app router pages and layouts
- **`components/features/`** - Feature-specific components (calculator, tables, sections) with barrel exports
- **`components/providers/`** - React context providers (theme, quotes, etc.) with barrel exports
- **`components/ui/`** - Reusable UI component library (shadcn/ui based)
- **`constants/`** - Application-wide constants with barrel exports
- **`convex/`** - Backend functions, queries, and database schema with generated types
- **`docs/`** - Project documentation, PDF blueprints, and setup guides
- **`hooks/`** - Custom React hooks for shared logic with barrel exports
- **`lib/`** - Utility functions, pricing calculations, and helpers with barrel exports
- **`scripts/`** - Setup and utility scripts for development workflow
- **`types/`** - TypeScript type definitions and interfaces with barrel exports

See [docs/STRUCTURE.md](./docs/STRUCTURE.md) for detailed structure documentation and import patterns.

## 📚 Documentation

### Getting Started
- **[Setup & Configuration](./docs/setup/)** - Database setup, authentication, and internationalization
- **[Project Structure](./docs/STRUCTURE.md)** - Detailed codebase organization and import patterns
- **[Deployment Guide](./DEPLOY.md)** - Automated deployment process and manual steps

### PDF Implementation
- **[PDF Blueprints](./docs/PDF_BLUEPRINTS.md)** - Authoritative PDF layout specifications
- **[PDF Implementation Guide](./docs/pdf-implementation/)** - Complete PDF system restructuring documentation
- **Blueprint Archive**: `docs/pdf-enhancement.zip` (authoritative, do not modify)

### Development Resources
- **[E2E Testing](./e2e/)** - End-to-end test suite and documentation
- **[Convex Backend](./convex/)** - Database schema and API documentation
- **[Component Library](./components/ui/)** - Reusable UI components with shadcn/ui

### Archived Documentation
Historical implementation notes, verification reports, and resolved issues are archived in `docs/archive/`.
