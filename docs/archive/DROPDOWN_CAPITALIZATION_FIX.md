# Dropdown Capitalization Fix - Enhanced Prompt

## Context
All dropdown options across the application must be properly capitalized in Spanish. The codebase uses lowercase keys for data consistency, but display labels must use proper Spanish capitalization.

## Issues Found & Fixed

### 1. Missing Project Type Label
**File:** `lib/utils.ts`
**Issue:** The `getProjectTypeLabel` function was missing the "regularization" option.
**Fix:** Added `regularization: "Regularización"` to the labels object.

### 2. CSS Capitalize Instead of Proper Labels
**File:** `components/features/project-configuration.tsx`
**Issue:** Dropdowns were using CSS `capitalize` class which incorrectly capitalizes English words (e.g., "small" → "Small" instead of "Pequeño").
**Fix:** Created proper label functions:
- `getProjectSizeLabel()`: small → "Pequeño", medium → "Mediano", large → "Grande", industrial → "Industrial"
- `getMaterialQualityLabel()`: standard → "Estándar", premium → "Premium"
- `getUrgencyLabel()`: normal → "Normal", priority → "Prioritario", urgent → "Urgente"

### 3. SelectValue Not Showing Proper Labels
**Issue:** `SelectValue` components were empty, showing raw keys instead of proper labels.
**Fix:** Updated all `SelectValue` components to display proper labels using the helper functions.

### 4. Missing Regularization Option
**File:** `components/dashboard/settings-dialog.tsx`
**Issue:** Settings dialog dropdown was missing "regularization" option.
**Fix:** Added `<SelectItem value="regularization">Regularización</SelectItem>`

## Files That Need Review

### Critical Files (Already Fixed)
- ✅ `lib/utils.ts` - `getProjectTypeLabel()` function
- ✅ `components/features/project-configuration.tsx` - All dropdowns
- ✅ `components/dashboard/settings-dialog.tsx` - Project type dropdown

### Files to Verify (Should Already Be Correct)
- `app/quote/new/page.tsx` - Uses `getProjectTypeLabel()` helper
- `components/dashboard/quick-quote.tsx` - Uses `getProjectTypeLabel()` helper
- `app/resources/materials/page.tsx` - Static labels (verify capitalization)
- `app/resources/price-guide/page.tsx` - Static labels (verify capitalization)
- `app/backup/page.tsx` - Static labels (verify capitalization)
- `app/reports/page.tsx` - Static labels (verify capitalization)
- `app/settings/page.tsx` - Static labels (verify capitalization)

## Search Patterns to Find Issues

### 1. Find All Dropdowns Using CSS Capitalize
```bash
grep -r "capitalize" --include="*.tsx" --include="*.ts"
```
**What to look for:** Any `className` with "capitalize" that displays dropdown values.

### 2. Find All SelectValue Components
```bash
grep -r "SelectValue" --include="*.tsx"
```
**What to look for:** Empty `<SelectValue />` components that should display labels.

### 3. Find All SelectItem Components
```bash
grep -r "SelectItem.*value=" --include="*.tsx"
```
**What to look for:** 
- Options with lowercase English keys that need Spanish labels
- Inconsistent capitalization
- Missing options (like "regularization")

### 4. Find Dropdown Options with English Words
```bash
grep -r "SelectItem.*value=\"\(small\|medium\|large\|standard\|premium\|normal\|priority\|urgent\|economic\)\"" --include="*.tsx"
```
**What to look for:** Dropdowns displaying English words instead of Spanish labels.

## Fix Pattern

### For Dynamic Dropdowns (using Object.entries)
**Before:**
```tsx
<SelectContent>
  {Object.entries(projectSizeFactors).map(([key, data]) => (
    <SelectItem key={key} value={key}>
      <div>
        <div className="font-medium capitalize">{key}</div>
        <div className="text-xs text-muted-foreground">{data.description}</div>
      </div>
    </SelectItem>
  ))}
</SelectContent>
```

**After:**
```tsx
// Add helper function at top of file
const getProjectSizeLabel = (key: string): string => {
  const labels: Record<string, string> = {
    small: "Pequeño",
    medium: "Mediano",
    large: "Grande",
    industrial: "Industrial",
  };
  return labels[key] || key;
};

// Update SelectValue
<SelectTrigger>
  <SelectValue placeholder="Seleccionar tamaño">
    {getProjectSizeLabel(complexity)}
  </SelectValue>
</SelectTrigger>

// Update SelectItem
<SelectContent>
  {Object.entries(projectSizeFactors).map(([key, data]) => (
    <SelectItem key={key} value={key}>
      <div>
        <div className="font-medium">{getProjectSizeLabel(key)}</div>
        <div className="text-xs text-muted-foreground">{data.description}</div>
      </div>
    </SelectItem>
  ))}
</SelectContent>
```

### For Static Dropdowns
**Before:**
```tsx
<SelectItem value="small">Small</SelectItem>
```

**After:**
```tsx
<SelectItem value="small">Pequeño</SelectItem>
```

## Label Mappings Reference

### Project Types
- `residential` → "Residencial"
- `commercial` → "Comercial"
- `industrial` → "Industrial"
- `renovation` → "Renovación"
- `emergency` → "Emergencia"
- `regularization` → "Regularización"

### Project Sizes
- `small` → "Pequeño"
- `medium` → "Mediano"
- `large` → "Grande"
- `industrial` → "Industrial"
- `complex` → "Complejo"

### Material Quality
- `basic` → "Básica"
- `standard` → "Estándar"
- `premium` → "Premium"
- `luxury` → "Lujo"

### Urgency Levels
- `normal` → "Normal"
- `priority` → "Prioritario"
- `urgent` → "Urgente"

### Payment Types
- `monthly` → "Pago Mensual"
- `upfront` → "Pago Anticipado"

### VAT Options
- `false` → "Sin IVA (Chile Hillbilly Mode)"
- `true` → "Con IVA (19%)"

## Verification Checklist

- [x] All `SelectValue` components display proper Spanish labels (not raw keys)
- [x] No CSS `capitalize` class used on dropdown option text
- [x] All project type dropdowns include "regularization" option
- [x] All dynamic dropdowns use helper functions for labels
- [x] All static dropdowns have proper Spanish capitalization
- [x] Consistency across all dropdowns (same options have same labels everywhere)
- [x] No English words displayed in dropdowns (except proper nouns like "Premium")

## Testing Steps

1. **Visual Inspection:**
   - Open each page with dropdowns
   - Check that all options display proper Spanish capitalization
   - Verify no English words appear (except proper nouns)

2. **Functional Testing:**
   - Select each dropdown option
   - Verify the selected value displays correctly in the trigger
   - Check that values are saved correctly (lowercase keys, proper display)

3. **Consistency Check:**
   - Same option should have same label across all dropdowns
   - Project type "residential" should always show "Residencial"
   - Project size "small" should always show "Pequeño"

## Common Pitfalls to Avoid

1. **Don't use CSS `capitalize`** - It capitalizes English words incorrectly
2. **Don't forget SelectValue** - Must display the label, not the raw key
3. **Don't mix English and Spanish** - All user-facing text must be Spanish
4. **Don't forget "regularization"** - It's a valid project type in the schema
5. **Don't hardcode labels** - Use helper functions for consistency

## Files Modified (Reference)

1. `lib/utils.ts` - Added regularization to getProjectTypeLabel + added helper functions:
   - `getProjectSizeLabel()` - Project size labels
   - `getMaterialQualityLabel()` - Material quality labels
   - `getPaymentTypeLabel()` - Payment type labels
   - `getCurrencyLabel()` - Currency labels
   - `getVATLabel()` - VAT labels
2. `components/features/project-configuration.tsx` - Fixed all dropdowns with proper labels
3. `components/dashboard/settings-dialog.tsx` - Added regularization option + fixed all SelectValue components
4. `app/quote/new/page.tsx` - Fixed project type SelectValue
5. `app/resources/materials/page.tsx` - Fixed category filter SelectValue
6. `app/resources/price-guide/page.tsx` - Fixed category filter SelectValue
7. `app/backup/page.tsx` - Fixed backup location and retention SelectValue components
8. `app/reports/page.tsx` - Fixed time period SelectValue
9. `app/settings/page.tsx` - Fixed currency and theme SelectValue components

## Next Steps for Agent

✅ **COMPLETED:**
1. ✅ Searched for all instances of `capitalize` class in dropdowns - None found
2. ✅ Found and fixed all empty `SelectValue` components - All now display proper labels
3. ✅ Verified all static dropdown options use proper Spanish capitalization
4. ✅ Checked for missing options - "regularization" added where needed
5. ✅ Ensured consistency across all dropdowns using helper functions
6. ⏳ Ready for visual and functional testing

**All dropdown capitalization fixes have been completed.**

## Additional Context

- The application is in Spanish (Chile)
- Dropdown values (keys) remain lowercase for data consistency
- Display labels must be properly capitalized Spanish text
- Helper functions should be created for reusable label mappings
- All user-facing text must be in Spanish with proper capitalization

