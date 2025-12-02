# PDF Restructuring Implementation Checklist

Quick reference checklist for the implementation agent.

## Pre-Implementation Setup

- [ ] Extract blueprint: `unzip docs/pdf-enhancement.zip -d /tmp/pdf-blueprint-reference`
- [ ] Review blueprint structure and components
- [ ] Verify CSS variables exist in `app/globals.css`
- [ ] Read `docs/PDF_BEST_PRACTICES.md`
- [ ] Read `docs/PDF_QUICK_REFERENCE.md`

## Component Creation (8 components)

### 1. Document Header
- [ ] Create `components/pdf/document-header.tsx`
- [ ] Match blueprint structure exactly
- [ ] Use CSS variables: `bg-[var(--header-bg)]`, `text-[var(--header-foreground)]`
- [ ] Include "Propuesta Técnica" section
- [ ] Spacing: `px-10 py-8`
- [ ] Icon: Zap with proper styling

### 2. Document Footer
- [ ] Create `components/pdf/document-footer.tsx`
- [ ] Match blueprint structure
- [ ] Use CSS variables
- [ ] Include validity notice and timestamp

### 3. Project Info
- [ ] Create `components/pdf/project-info.tsx`
- [ ] Client info section
- [ ] Project description
- [ ] Scope/notes section
- [ ] Recommendation highlight
- [ ] Use icons: User, FileText, AlertCircle, CheckCircle2

### 4. Partidas Table
- [ ] Create `components/pdf/partidas-table.tsx`
- [ ] Convert to table layout (not cards)
- [ ] Columns: Number | Description | Value
- [ ] Table header: `bg-[var(--table-header)]`
- [ ] Support sub-items
- [ ] Handle optional items and notes

### 5. Regularizacion Section
- [ ] Create `components/pdf/regularizacion-section.tsx`
- [ ] Match blueprint layout
- [ ] Include icon and description
- [ ] Payment breakdown
- [ ] Highlight styling: `bg-[var(--highlight)]/10`

### 6. Options Comparison
- [ ] Create `components/pdf/options-comparison.tsx`
- [ ] Two-column grid layout
- [ ] Highlight "Recomendado" option
- [ ] Border: `border-[var(--highlight)]`
- [ ] Include payment breakdown per option

### 7. Anexo Section
- [ ] Create `components/pdf/anexo-section.tsx`
- [ ] Match blueprint structure
- [ ] Icons for each item type
- [ ] Optional items with dashed borders
- [ ] Summary table at bottom
- [ ] Proper spacing and typography

### 8. Resumen Cobros
- [ ] Create `components/pdf/resumen-cobros.tsx`
- [ ] Numbered payment items
- [ ] Support options within payments
- [ ] Grid layout for options
- [ ] Highlight recommended: `bg-[var(--highlight)]/10`

## Main Component Refactoring

### PDF Document Component
- [ ] Refactor `components/pdf/pdf-document.tsx`
- [ ] Remove all inline component logic
- [ ] Import all 8 new components
- [ ] Use multi-page `<article>` structure
- [ ] Element ID: `id="electrical-quote-document"`
- [ ] Page breaks: `page-break` class
- [ ] Spacing: `px-10 py-8` in sections

## Styling Updates

### CSS Variables
- [ ] Verify all CSS variables exist:
  - [ ] `--header-bg`
  - [ ] `--header-foreground`
  - [ ] `--table-header`
  - [ ] `--highlight`
- [ ] Replace all Tailwind classes with CSS variables
- [ ] NO `bg-primary` or `text-primary-foreground`
- [ ] Use: `bg-[var(--header-bg)]`, etc.

### Spacing
- [ ] Change all `px-8 py-6` → `px-10 py-8`
- [ ] Match blueprint spacing exactly
- [ ] Cards: `p-5` or `p-6` as per blueprint

### Typography
- [ ] Section headers: `text-xs uppercase tracking-widest`
- [ ] Match blueprint font weights
- [ ] Proper heading hierarchy

## Structure Requirements

- [ ] Multi-page using `<article>` elements
- [ ] Page 1: Header + Project Info + Partidas
- [ ] Page 2: Regularizacion + Options
- [ ] Page 3: Anexo (if exists)
- [ ] Page 4: Resumen Cobros + Footer
- [ ] All articles: `bg-card shadow-sm`
- [ ] Page breaks: `mt-4 page-break`

## Data & Types

- [ ] Define props interfaces for all components
- [ ] Update `PDFQuoteData` if needed
- [ ] Create types for new data structures
- [ ] Ensure proper null/undefined handling
- [ ] No `any` types

## Integration

- [ ] Import components correctly
- [ ] Pass data from quote-editor
- [ ] Handle optional sections
- [ ] Maintain backward compatibility
- [ ] Test data flow

## Testing

### Visual Testing
- [ ] Generate PDF from blueprint (reference)
- [ ] Generate PDF from implementation
- [ ] Side-by-side comparison
- [ ] Document differences

### Functional Testing
- [ ] PDF generation works
- [ ] Print preview works
- [ ] Multi-page rendering correct
- [ ] Page breaks work
- [ ] Test with sample data
- [ ] Test with missing optional sections
- [ ] Test edge cases

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari

## Final Verification

### Code Quality
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] All components follow same patterns
- [ ] Code is maintainable

### Blueprint Compliance
- [ ] Structure matches blueprint
- [ ] Styling matches blueprint
- [ ] Spacing matches blueprint
- [ ] Typography matches blueprint
- [ ] Visual output matches blueprint

### Documentation
- [ ] Components have JSDoc comments
- [ ] Props interfaces documented
- [ ] Usage examples provided

## Success Criteria

- [ ] ✅ All 8 components created
- [ ] ✅ Main component refactored
- [ ] ✅ All CSS variables used (no Tailwind classes)
- [ ] ✅ Spacing matches blueprint
- [ ] ✅ Multi-page structure works
- [ ] ✅ Visual output matches blueprint
- [ ] ✅ PDF generation works
- [ ] ✅ All tests pass
- [ ] ✅ No errors or warnings

## Quick Reference

**CSS Variables:**
```tsx
bg-[var(--header-bg)]
text-[var(--header-foreground)]
bg-[var(--highlight)]/10
text-[var(--accent-foreground)]
bg-[var(--table-header)]
```

**Spacing:**
```tsx
px-10 py-8  // Sections
p-5 or p-6  // Cards
```

**Structure:**
```tsx
<article className="bg-card shadow-sm">
  <div className="px-10 py-8 space-y-8">
    {/* Content */}
  </div>
</article>
```

**Page Break:**
```tsx
<article className="bg-card shadow-sm mt-4 page-break">
```

---

**Remember:** The blueprint is the single source of truth. When in doubt, match the blueprint exactly.

