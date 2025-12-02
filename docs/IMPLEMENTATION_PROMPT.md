# Deep Implementation Prompt: PDF Component Restructuring

## Context & Objective

You are tasked with restructuring the PDF generation system to match the authoritative blueprint structure defined in `docs/pdf-enhancement.zip`. The current implementation uses a monolithic component with generic Tailwind classes, but it needs to match the blueprint's modular component architecture, CSS variable-based styling, and multi-page article structure.

**Reference Documents:**
- `docs/PDF_BEST_PRACTICES.md` - Best practices and recommendations
- `docs/PDF_QUICK_REFERENCE.md` - Quick reference guide
- `docs/PDF_BLUEPRINTS.md` - Blueprint authority documentation
- `docs/pdf-enhancement.zip` - Authoritative blueprint (DO NOT MODIFY)

**Current State:**
- Main component: `components/pdf/pdf-document.tsx` (monolithic, 327 lines)
- Uses Tailwind utility classes (`bg-primary`, `text-primary-foreground`)
- Single `<div>` structure with sections
- Missing PDF-specific CSS variables
- Spacing doesn't match blueprint (`px-8 py-6` vs `px-10 py-8`)

**Target State:**
- Modular components matching blueprint structure
- CSS variables for styling (`var(--header-bg)`, etc.)
- Multi-page `<article>` structure with page breaks
- Exact spacing matching blueprint (`px-10 py-8`)
- Blueprint-compliant typography and layout

## Step-by-Step Implementation Plan

### Phase 1: Extract Blueprint Components (Day 1)

1. **Extract blueprint components to reference:**
   ```bash
   cd /mnt/Secondary/projects/Electrical\ Enterprise
   mkdir -p /tmp/pdf-blueprint-reference
   unzip -q docs/pdf-enhancement.zip -d /tmp/pdf-blueprint-reference
   ```

2. **Review blueprint component structure:**
   - `/tmp/pdf-blueprint-reference/components/document-header.tsx`
   - `/tmp/pdf-blueprint-reference/components/project-info.tsx`
   - `/tmp/pdf-blueprint-reference/components/partidas-table.tsx`
   - `/tmp/pdf-blueprint-reference/components/regularizacion-section.tsx`
   - `/tmp/pdf-blueprint-reference/components/options-comparison.tsx`
   - `/tmp/pdf-blueprint-reference/components/anexo-section.tsx`
   - `/tmp/pdf-blueprint-reference/components/resumen-cobros.tsx`
   - `/tmp/pdf-blueprint-reference/components/document-footer.tsx`

3. **Note key patterns:**
   - CSS variable usage: `bg-[var(--header-bg)]`, `text-[var(--header-foreground)]`
   - Spacing: `px-10 py-8` for sections, `p-5` or `p-6` for cards
   - Typography: `text-xs uppercase tracking-widest` for section headers
   - Multi-page structure with `<article>` elements
   - Page breaks using `page-break` class

### Phase 2: Create Modular PDF Components (Day 2)

Create new components in `components/pdf/` directory:

1. **`document-header.tsx`**
   - Extract header logic from current `pdf-document.tsx`
   - Match blueprint structure exactly
   - Use CSS variables: `bg-[var(--header-bg)]`, `text-[var(--header-foreground)]`
   - Accept props: `executorName`, `executorRut`, `executorCertification`, `projectName`, `date`
   - Include the "Propuesta Técnica" section with project title and date

2. **`document-footer.tsx`**
   - Extract footer logic
   - Match blueprint footer structure
   - Use CSS variables
   - Include: executor name, location, validity notice, generation timestamp

3. **`project-info.tsx`**
   - Extract client/project info section
   - Match blueprint: client info, description, scope, recommendation, notes
   - Use icons: `User`, `FileText`, `AlertCircle`, `CheckCircle2`
   - Structure with proper spacing and typography

4. **`partidas-table.tsx`**
   - Extract items table
   - Convert from current card layout to table layout (match blueprint)
   - Table structure: Number | Description | Value
   - Support sub-items (nested options)
   - Use `bg-[var(--table-header)]` for table header
   - Handle optional items and notes

5. **`regularizacion-section.tsx`**
   - Create section for regularization/increase of power
   - Match blueprint layout with icon, description, payment breakdown
   - Use highlight styling: `bg-[var(--highlight)]/10`

6. **`options-comparison.tsx`**
   - Extract options comparison section
   - Match blueprint: two-column grid with highlighted "Recomendado" option
   - Use `border-[var(--highlight)]` for recommended option
   - Include breakdown: total, advance, partial payment, final total

7. **`anexo-section.tsx`**
   - Extract annex/optional items section
   - Match blueprint structure with icons for each item type
   - Support optional items with dashed borders
   - Include summary table at bottom
   - Use proper spacing and typography

8. **`resumen-cobros.tsx`**
   - Extract payment summary section
   - Match blueprint: numbered payment items with descriptions
   - Support options within payments (grid layout)
   - Highlight recommended options
   - Use `bg-[var(--highlight)]/10` for recommended items

### Phase 3: Refactor Main PDF Document (Day 3)

1. **Update `components/pdf/pdf-document.tsx`:**
   - Remove all inline component logic
   - Import all new modular components
   - Restructure to use multi-page `<article>` elements:
     ```tsx
     <div id="electrical-quote-document" ref={ref}>
       {/* Page 1 */}
       <article className="bg-card shadow-sm">
         <DocumentHeader data={data} />
         <div className="px-10 py-8 space-y-8">
           <ProjectInfo data={data} />
           <PartidasTable items={data.items} />
         </div>
       </article>

       {/* Page 2 */}
       <article className="bg-card shadow-sm mt-4 page-break">
         <div className="px-10 py-8 space-y-8">
           {data.regularization && <RegularizacionSection data={data.regularization} />}
           {data.options && <OptionsComparison options={data.options} />}
         </div>
       </article>

       {/* Page 3 - Annex */}
       {data.annexes && data.annexes.length > 0 && (
         <article className="bg-card shadow-sm mt-4 page-break">
           <div className="px-10 py-8 space-y-8">
             {data.annexes.map(annex => (
               <AnexoSection key={annex.id} annex={annex} />
             ))}
           </div>
         </article>
       )}

       {/* Page 4 - Payments & Footer */}
       <article className="bg-card shadow-sm mt-4 page-break">
         <div className="px-10 py-8 space-y-8">
           {data.payments && <ResumenCobros payments={data.payments} />}
           <DocumentFooter data={data} />
         </div>
       </article>
     </div>
     ```

2. **Ensure proper data mapping:**
   - Map current `PDFQuoteData` interface to component props
   - Handle optional sections gracefully
   - Maintain backward compatibility with existing data structure

### Phase 4: Update Styling System (Day 4)

1. **Verify CSS variables in `app/globals.css`:**
   - Confirm these variables exist:
     - `--header-bg: oklch(0.25 0.04 250)`
     - `--header-foreground: oklch(0.98 0 0)`
     - `--table-header: oklch(0.92 0.008 250)`
     - `--highlight: oklch(0.75 0.12 75)`
   - If missing, add them (they should already be there from previous work)

2. **Update all components to use CSS variables:**
   - Replace `bg-primary` with `bg-[var(--header-bg)]`
   - Replace `text-primary-foreground` with `text-[var(--header-foreground)]`
   - Replace `bg-accent/10` with `bg-[var(--highlight)]/10`
   - Replace all generic color classes with CSS variable equivalents

3. **Fix spacing throughout:**
   - Change `px-8 py-6` to `px-10 py-8` in all sections
   - Match blueprint spacing exactly

4. **Update typography:**
   - Match blueprint typography patterns
   - Use `text-xs uppercase tracking-widest` for section headers
   - Use proper font weights: `font-semibold`, `font-medium`

### Phase 5: Data Interface Updates (Day 5)

1. **Extend `PDFQuoteData` interface if needed:**
   - Check if we need to add fields for:
     - `regularization?: RegularizationData`
     - Ensure `options`, `annexes`, `payments` are properly typed

2. **Create type definitions for new components:**
   ```typescript
   export interface RegularizationData {
     description: string
     amount: number
     paymentTerms: string
   }

   export interface AnexoData {
     id: string
     title: string
     items: AnnexItem[]
     totalValue: number
   }
   ```

3. **Update data mapping in quote-editor.tsx:**
   - Ensure all data flows correctly to PDF components
   - Test with sample data

### Phase 6: Testing & Validation (Day 6)

1. **Visual Comparison:**
   - Generate PDF from blueprint codebase (reference)
   - Generate PDF from new implementation
   - Compare side-by-side visually
   - Document any differences

2. **Functional Testing:**
   - Test PDF generation with various data combinations
   - Test with missing optional sections
   - Test multi-page handling
   - Test page breaks

3. **Cross-browser Testing:**
   - Test PDF generation in Chrome
   - Test PDF generation in Firefox
   - Test PDF generation in Safari
   - Verify print preview matches

4. **Edge Cases:**
   - Empty sections
   - Very long content
   - Many items in table
   - Missing optional fields

## Critical Requirements

### Must-Have (Non-Negotiable)

1. **CSS Variables:**
   - ALL styling MUST use CSS variables from `globals.css`
   - NO generic Tailwind color classes (`bg-primary`, `text-primary`)
   - Use: `bg-[var(--header-bg)]`, `text-[var(--header-foreground)]`, etc.

2. **Spacing:**
   - Sections: `px-10 py-8` (NOT `px-8 py-6`)
   - Cards: `p-5` or `p-6` as per blueprint
   - Match blueprint spacing exactly

3. **Structure:**
   - Multi-page using `<article>` elements
   - Each article wrapped in proper container
   - Page breaks using `page-break` class
   - Element ID: `id="electrical-quote-document"`

4. **Component Modularity:**
   - Each section as separate component
   - Clear props interfaces
   - Reusable and testable

5. **Blueprint Compliance:**
   - Match blueprint component structure
   - Match blueprint typography
   - Match blueprint layout
   - Match blueprint visual hierarchy

### Should-Have (Important)

1. **Type Safety:**
   - Proper TypeScript interfaces
   - No `any` types
   - Proper null/undefined handling

2. **Accessibility:**
   - Semantic HTML
   - Proper heading hierarchy
   - Alt text for icons

3. **Performance:**
   - Efficient rendering
   - No unnecessary re-renders
   - Proper memoization where needed

### Nice-to-Have (Optional)

1. **Error Handling:**
   - Graceful degradation for missing data
   - Clear error messages

2. **Documentation:**
   - JSDoc comments on components
   - Usage examples

## Implementation Checklist

Use this checklist as you work:

### Component Creation
- [ ] `components/pdf/document-header.tsx` created and matches blueprint
- [ ] `components/pdf/document-footer.tsx` created and matches blueprint
- [ ] `components/pdf/project-info.tsx` created and matches blueprint
- [ ] `components/pdf/partidas-table.tsx` created and matches blueprint
- [ ] `components/pdf/regularizacion-section.tsx` created and matches blueprint
- [ ] `components/pdf/options-comparison.tsx` created and matches blueprint
- [ ] `components/pdf/anexo-section.tsx` created and matches blueprint
- [ ] `components/pdf/resumen-cobros.tsx` created and matches blueprint

### Styling
- [ ] All components use CSS variables (not Tailwind classes)
- [ ] Spacing matches blueprint (`px-10 py-8`)
- [ ] Typography matches blueprint
- [ ] Colors use CSS variables
- [ ] Print styles working correctly

### Structure
- [ ] Main PDF document uses `<article>` elements
- [ ] Page breaks working correctly
- [ ] Element ID is `electrical-quote-document`
- [ ] Multi-page structure matches blueprint

### Integration
- [ ] All components imported correctly
- [ ] Data flows correctly from quote editor
- [ ] Props interfaces defined
- [ ] TypeScript types correct

### Testing
- [ ] Visual comparison with blueprint
- [ ] PDF generation works
- [ ] Multi-page rendering correct
- [ ] Print preview works
- [ ] Edge cases handled

## Code Examples

### Example: Document Header Component

```tsx
import { Zap } from "lucide-react"

interface DocumentHeaderProps {
  executorName: string
  executorRut: string
  executorCertification: string
  projectName: string
  date: Date
}

export function DocumentHeader({
  executorName,
  executorRut,
  executorCertification,
  projectName,
  date
}: DocumentHeaderProps) {
  return (
    <header className="bg-[var(--header-bg)] text-[var(--header-foreground)] px-10 py-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-md bg-[var(--highlight)] flex items-center justify-center">
            <Zap className="w-8 h-8 text-[var(--header-bg)]" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{executorName}</h1>
            <p className="text-sm text-[var(--header-foreground)]/70 mt-0.5">{executorCertification}</p>
          </div>
        </div>
        <div className="text-right text-sm">
          <p className="text-[var(--header-foreground)]/70">R.U.T.</p>
          <p className="font-medium">{executorRut}</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--header-foreground)]/20">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--header-foreground)]/50 mb-1">
              Propuesta Técnica
            </p>
            <h2 className="text-xl font-medium">{projectName}</h2>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-[var(--header-foreground)]/50 mb-1">Fecha</p>
            <p className="font-medium">
              {date.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
```

### Example: Section Header Pattern

```tsx
<h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
  <span className="w-8 h-px bg-border"></span>
  Detalle de Partidas y Costos
</h3>
```

### Example: Highlighted/Recommended Item

```tsx
<div className="bg-[var(--highlight)]/10 border border-[var(--highlight)]/30 rounded p-3">
  <p className="text-lg font-semibold text-[var(--accent-foreground)]">$635.000</p>
</div>
```

## Common Pitfalls to Avoid

1. **Don't use Tailwind semantic classes:**
   - ❌ `bg-primary` → ✅ `bg-[var(--header-bg)]`
   - ❌ `text-primary-foreground` → ✅ `text-[var(--header-foreground)]`

2. **Don't use wrong spacing:**
   - ❌ `px-8 py-6` → ✅ `px-10 py-8`

3. **Don't create single-page structure:**
   - ❌ Single `<div>` with sections → ✅ Multiple `<article>` elements

4. **Don't ignore blueprint structure:**
   - Always reference blueprint components
   - Match component organization
   - Match visual hierarchy

5. **Don't skip the element ID:**
   - Always include `id="electrical-quote-document"` on root element

## Testing Strategy

### Step 1: Component-Level Testing
Test each component in isolation:
- Render with sample props
- Verify styling matches blueprint
- Check spacing and typography

### Step 2: Integration Testing
Test components together:
- Render full PDF document
- Verify data flow
- Check page breaks

### Step 3: Visual Regression Testing
Compare outputs:
- Generate PDF from blueprint (reference)
- Generate PDF from implementation
- Side-by-side visual comparison
- Document differences

### Step 4: Functional Testing
Test all features:
- PDF generation works
- Print preview works
- Different data combinations
- Edge cases (empty sections, long content)

## Success Criteria

The implementation is successful when:

1. ✅ All components match blueprint structure
2. ✅ All styling uses CSS variables
3. ✅ Spacing matches blueprint exactly
4. ✅ Multi-page structure works correctly
5. ✅ Visual output matches blueprint PDF
6. ✅ No TypeScript errors
7. ✅ PDF generation works without errors
8. ✅ Print preview matches expected output
9. ✅ All tests pass
10. ✅ Code is maintainable and documented

## Resources

- **Blueprint Reference:** `/tmp/pdf-blueprint-reference/` (after extraction)
- **Current Implementation:** `components/pdf/pdf-document.tsx`
- **Best Practices:** `docs/PDF_BEST_PRACTICES.md`
- **Quick Reference:** `docs/PDF_QUICK_REFERENCE.md`
- **CSS Variables:** `app/globals.css`

## Questions to Consider

Before starting, clarify:

1. Should we maintain backward compatibility with existing PDF data structure?
2. Do we need to support all sections from blueprint, or only some?
3. Should optional sections be hidden when empty, or show placeholder?
4. Do we need to support different PDF templates, or just one?

## Notes

- The blueprint is the **single source of truth** - always reference it
- Don't modify the blueprint zip file
- If blueprint and requirements conflict, follow blueprint (per PDF_BLUEPRINTS.md)
- Focus on matching visual output, not just code structure
- Test thoroughly before considering complete

## Final Reminder

**The goal is not just to refactor code - it's to ensure the generated PDFs match the blueprint's visual output exactly.** Every styling decision, spacing choice, and component structure should be guided by: "Does this match what the blueprint produces?"

Good luck! 🚀

