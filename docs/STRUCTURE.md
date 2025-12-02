# Repository Structure

## Directory Organization

```
├── app/                    # Next.js app directory (pages and layouts)
│   ├── advanced-calculator/
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
│   ├── line-items.ts
│   ├── quotes.ts
│   └── schema.ts
├── docs/                  # Documentation and PDF files
├── hooks/                 # Custom React hooks
│   ├── index.ts          # Barrel exports
│   ├── use-current-quote.tsx
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/                   # Utility functions and helpers
│   ├── index.ts          # Barrel exports
│   ├── pdf-generator.ts
│   ├── pricing-plans.ts
│   └── utils.ts
├── public/                # Static assets
└── types/                 # TypeScript type definitions
    ├── index.ts
    ├── pricing.ts
    └── quote.ts
```

## Import Patterns

### Components
```typescript
// Feature components
import { AdvancedCalculator } from '@/components/features';
// or
import { AdvancedCalculator } from '@/components/features/advanced-calculator';

// UI components
import { Button } from '@/components/ui/button';

// Providers
import { Providers } from '@/components/providers';
```

### Hooks
```typescript
import { useIsMobile, useToast, useCurrentQuote } from '@/hooks';
// or
import { useIsMobile } from '@/hooks/use-mobile';
```

### Utilities
```typescript
import { cn, formatCLP } from '@/lib';
// or
import { cn } from '@/lib/utils';
import { formatCLP } from '@/lib/pricing-plans';
```

### Types
```typescript
import type { QuoteContextType } from '@/types';
// or
import type { QuoteContextType } from '@/types/quote';
```

### Constants
```typescript
import { MOBILE_BREAKPOINT, TOAST_LIMIT } from '@/constants';
```

## Standards

1. **No duplicate files** - Each file exists in one location only
2. **Barrel exports** - Use index.ts files for cleaner imports
3. **Feature-based organization** - Feature components in `components/features/`
4. **Type safety** - All types in `types/` directory
5. **Constants extraction** - Magic numbers/strings in `constants/`
6. **Consistent naming** - kebab-case for files, PascalCase for components
