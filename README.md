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

- Project information management
- Partidas (items) table
- Options comparison
- Document generation
- Print functionality
- Responsive design
- **Real-time data persistence with Convex**
- **Quote management and history**
- **Calculator session storage**

## 🏃‍♂️ Local Development

### Prerequisites

1. **Authenticate with Convex** (required for data persistence):
   ```bash
   # Quick authentication setup
   npm run convex:auth

   # This will open your browser for:
   # - Convex account login (or signup)
   # - Project creation/selection
   # - Deployment URL setup
   ```

2. **Complete Convex Setup**:
   ```bash
   # After authentication, run full setup
   npm run convex:init

   # This will:
   # - Set up .env.local with deployment URL
   # - Deploy the database schema
   # - Generate TypeScript types
   ```

2. **No Authentication Required** - The app uses anonymous access for quote management.

### Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Convex commands
npm run convex:dev      # Start Convex development server
npm run convex:deploy   # Deploy schema changes
npm run convex:codegen  # Generate TypeScript types

# Deployment
npm run deploy          # Complete deployment (build, commit, push, deploy Convex & Vercel)
npm run deploy:prod     # Same as deploy
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
├── docs/                  # Documentation and PDF files
│   ├── CONVEX_SETUP.md
│   ├── PDF_BLUEPRINTS.md
│   ├── pdf-enhancement.zip
│   └── Proyecto Graciela 2025.pdf
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

See [STRUCTURE.md](./STRUCTURE.md) for detailed structure documentation and import patterns.
