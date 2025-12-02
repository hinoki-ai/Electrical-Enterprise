# TypeScript Error Fixes - Next Agent Prompt

## Context
The previous agent fixed 32 TypeScript errors from VERIFICATION_REPORT.md. The following errors remain and need to be fixed.

## Remaining TypeScript Errors

### 1. Auth Context - User Type Export Issue
**Files:** `components/auth-context.tsx`, `app/page.tsx`, `components/homepage-desktop.tsx`, `components/homepage-mobile.tsx`, `components/login-modal.tsx`, `components/signup-panel.tsx`

**Error:** `Module '"@/components/auth-context"' declares 'User' locally, but it is not exported.`

**Fix Required:**
- Export the `User` type from `components/auth-context.tsx`
- Ensure all files importing `User` can access it

### 2. Missing UI Component
**Files:** `components/login-modal.tsx`, `components/signup-panel.tsx`

**Error:** `Cannot find module '@/components/ui/password-input' or its corresponding type declarations.`

**Fix Required:**
- Create `components/ui/password-input.tsx` component OR
- Remove/replace the import if component doesn't exist

### 3. Missing Hook Export
**File:** `components/signup-panel.tsx`

**Error:** `Module '"@/hooks/use-mobile"' has no exported member 'useSwipeGesture'.`

**Fix Required:**
- Add `useSwipeGesture` export to `hooks/use-mobile.tsx` OR
- Remove the import if not needed

### 4. Undefined Variables in signup-panel.tsx
**File:** `components/signup-panel.tsx`

**Errors:**
- `Cannot find name 'email'. Did you mean 'Mail'?` (multiple occurrences)
- `Cannot find name 'setEmail'.`

**Fix Required:**
- Add missing `email` state variable and `setEmail` setter
- Ensure all references to `email` are properly defined

### 5. Implicit Any Types
**Files:** `components/login-modal.tsx`, `components/signup-panel.tsx`

**Errors:**
- `Parameter 'e' implicitly has an 'any' type.` (multiple occurrences)

**Fix Required:**
- Add explicit types to event handlers (e.g., `e: React.ChangeEvent<HTMLInputElement>`)

### 6. Missing Variable in convex/auth.ts
**File:** `convex/auth.ts`

**Error:** `Cannot find name 'normalizedEmail'.`

**Fix Required:**
- Define `normalizedEmail` variable or fix the reference

## Verification Report Status

✅ **Fixed (32 errors):**
- components/features/advanced-calculator.tsx - Type mismatches (3 errors)
- components/features/partidas-table.tsx - Implicit 'any' types (5 errors)
- components/features/price-breakdown.tsx - Missing exports/variables (10 errors)
- components/features/project-configuration.tsx - Missing types/props (8 errors)
- components/features/quote-manager.tsx - Missing API methods (2 errors)
- hooks/use-current-quote.tsx - Missing API method (1 error)
- lib/index.ts - Duplicate export (1 error)
- lib/pricing-plans.ts - Undefined variables (2 errors)

⏳ **Remaining (estimated 15-20 errors):**
- Auth context User type export
- Missing password-input component
- Missing useSwipeGesture hook
- Undefined variables in signup-panel
- Implicit any types
- Missing normalizedEmail in auth.ts

## Instructions for Next Agent

1. **Run TypeScript check:**
   ```bash
   npx tsc --noEmit --skipLibCheck
   ```

2. **Fix errors systematically:**
   - Start with auth-context.tsx (export User type)
   - Create missing components/hooks or remove unused imports
   - Fix undefined variables
   - Add explicit types to event handlers

3. **Verify fixes:**
   ```bash
   npx tsc --noEmit --skipLibCheck 2>&1 | grep "error TS" | wc -l
   ```
   Should return 0 errors when complete.

4. **Test build:**
   ```bash
   npm run build
   ```

## Files to Review

- `components/auth-context.tsx` - Export User type
- `components/login-modal.tsx` - Fix imports and types
- `components/signup-panel.tsx` - Fix all variable and type issues
- `components/ui/password-input.tsx` - Create if needed
- `hooks/use-mobile.tsx` - Add useSwipeGesture if needed
- `convex/auth.ts` - Fix normalizedEmail reference

## Notes

- All fixes from VERIFICATION_REPORT.md have been completed
- Remaining errors are in authentication and UI components
- Follow existing code patterns and TypeScript best practices
- Ensure all fixes maintain functionality

