# PDF Generation Best Practices & Recommendations

## Overview

This document outlines best practices for maintaining consistency between the PDF blueprint (`pdf-enhancement.zip`) and the generated PDFs, ensuring proper styling, structure, and maintainability.

## 1. Design System Alignment

### Use CSS Variables Directly

**❌ Avoid:**
```tsx
className="bg-primary text-primary-foreground"
```

**✅ Prefer:**
```tsx
className="bg-[var(--header-bg)] text-[var(--header-foreground)]"
```

**Reason:** The blueprint uses CSS variables directly. Using semantic Tailwind classes creates a translation layer that may drift from the blueprint's intended design.

### Add Missing PDF-Specific CSS Variables

Add to `app/globals.css`:

```css
:root {
  /* PDF Document Tokens - match blueprint exactly */
  --header-bg: oklch(0.25 0.04 250);
  --header-foreground: oklch(0.98 0 0);
  --table-header: oklch(0.92 0.008 250);
  --highlight: oklch(0.75 0.12 75);
}
```

## 2. Component Architecture

### Modular Component Structure

**✅ Recommended Structure:**

```
components/pdf/
├── pdf-document.tsx          # Main container (orchestrator)
├── document-header.tsx       # Header section
├── document-footer.tsx       # Footer section
├── project-info.tsx          # Client/project info
├── partidas-table.tsx        # Items table
├── options-comparison.tsx    # Options/plans comparison
├── regularizacion-section.tsx # Regularization section
├── anexo-section.tsx         # Annex/optional items
└── resumen-cobros.tsx        # Payment summary
```

**Benefits:**
- Matches blueprint structure
- Easier to maintain and test
- Clear separation of concerns
- Reusable components

### Multi-Page Article Structure

**✅ Use `<article>` elements for pages:**

```tsx
<div id="electrical-quote-document">
  <article className="bg-card shadow-sm">
    <DocumentHeader />
    <ProjectInfo />
    <PartidasTable />
  </article>

  <article className="bg-card shadow-sm mt-4 page-break">
    <RegularizacionSection />
    <OptionsComparison />
  </article>
</div>
```

**Key Points:**
- Use `page-break` class for explicit page breaks
- Each `<article>` represents a logical page
- Maintains blueprint's multi-page structure

## 3. Styling Consistency

### Spacing Standards

Match blueprint spacing exactly:

| Element | Blueprint | Current | Status |
|---------|-----------|---------|--------|
| Header padding | `px-10 py-8` | `px-8 py-6` | ❌ Mismatch |
| Section padding | `px-10 py-8` | `px-8 py-6` | ❌ Mismatch |
| Border radius | `rounded-md` | `rounded-lg` | ⚠️ Check |

### Typography

**✅ Follow blueprint typography:**

```tsx
// Section headers
<h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
  <span className="w-8 h-px bg-border"></span>
  Section Title
</h3>

// Document title
<h2 className="text-xl font-medium">Proyecto Eléctrico Residencial</h2>
```

### Color Usage

**✅ Use blueprint color tokens:**

- Headers: `bg-[var(--header-bg)] text-[var(--header-foreground)]`
- Highlights: `bg-[var(--highlight)]/10 border-[var(--highlight)]`
- Table headers: `bg-[var(--table-header)]`
- Accent text: `text-[var(--accent-foreground)]`

## 4. PDF Generation Architecture

### Element ID Management

**✅ Always set the required ID:**

```tsx
<div 
  id="electrical-quote-document"
  ref={ref}
  className="pdf-document ..."
>
  {/* content */}
</div>
```

### Print Styles

**✅ Add print-specific CSS:**

```css
@media print {
  @page {
    margin: 1.5cm;
    size: letter;
  }
  body {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  .no-print {
    display: none !important;
  }
  .page-break {
    page-break-before: always;
  }
}
```

## 5. Data Structure & Type Safety

### Type Definitions

**✅ Keep interfaces aligned with blueprint structure:**

```typescript
export interface PDFQuoteData {
  // Header
  executorName: string
  executorRut: string
  executorCertification: string
  
  // Client
  clientName: string
  clientRut?: string
  clientAddress?: string
  
  // Project
  projectName: string
  projectDescription?: string
  location: string
  date: Date
  
  // Content
  items: QuoteItem[]
  options?: QuoteOption[]
  annexes?: Annex[]
  payments?: Payment[]
}
```

## 6. Code Organization Best Practices

### Single Responsibility Principle

Each PDF component should have one clear purpose:

- `DocumentHeader`: Header only
- `PartidasTable`: Items table only
- `ResumenCobros`: Payment summary only

### Composition Over Monolith

**❌ Avoid:** One giant component with everything

**✅ Prefer:** Composed smaller components

```tsx
export const PDFDocument = ({ data }: PDFDocumentProps) => (
  <div id="electrical-quote-document">
    <DocumentHeader data={data} />
    <ProjectInfo data={data} />
    <PartidasTable items={data.items} />
    {data.options && <OptionsComparison options={data.options} />}
    {data.annexes && <AnexoSection annexes={data.annexes} />}
    {data.payments && <ResumenCobros payments={data.payments} />}
    <DocumentFooter data={data} />
  </div>
)
```

## 7. Testing & Validation

### Visual Regression Testing

1. Generate PDF from blueprint code
2. Generate PDF from current implementation
3. Compare visually (side-by-side)
4. Document any intentional differences

### Checklist Before Deployment

- [ ] PDF document has correct `id="electrical-quote-document"`
- [ ] All CSS variables match blueprint
- [ ] Spacing matches blueprint (px-10, py-8, etc.)
- [ ] Typography matches blueprint
- [ ] Multi-page structure uses `<article>` elements
- [ ] Page breaks work correctly
- [ ] Colors use CSS variables, not Tailwind classes
- [ ] Component structure matches blueprint organization

## 8. Maintenance Strategy

### Blueprint as Source of Truth

- **Never modify** `pdf-enhancement.zip`
- **Always reference** blueprint components when in doubt
- **Document** any deviations from blueprint with clear reasons

### Version Control

- Track changes to PDF components separately
- Maintain changelog for PDF structure updates
- Tag releases when PDF format changes

## 9. Performance Considerations

### PDF Generation Optimization

1. **Lazy load** PDF preview until needed
2. **Debounce** PDF generation triggers
3. **Cache** rendered PDF when data hasn't changed
4. **Optimize images** before embedding

### Bundle Size

- Import PDF components dynamically:
  ```tsx
  const PDFDocument = dynamic(() => import('@/components/pdf/pdf-document'), {
    ssr: false
  })
  ```

## 10. Accessibility

### Print Accessibility

- Ensure color contrast meets WCAG AA standards
- Use semantic HTML structure
- Include alt text for icons/images
- Test with screen readers when printing

## Implementation Priority

1. **High Priority:**
   - Add missing CSS variables to globals.css
   - Fix spacing to match blueprint (px-10, py-8)
   - Use CSS variables instead of Tailwind classes

2. **Medium Priority:**
   - Break PDFDocument into modular components
   - Implement multi-page article structure
   - Match typography exactly

3. **Low Priority:**
   - Visual regression testing setup
   - Performance optimizations
   - Advanced accessibility features

## Recommended Next Steps

1. Extract PDF-specific CSS variables from blueprint
2. Create modular PDF components matching blueprint structure
3. Refactor PDFDocument to use new components
4. Update styling to use CSS variables directly
5. Test generated PDF against original blueprint output
6. Document any intentional deviations

---

**Remember:** The blueprint in `pdf-enhancement.zip` is the authoritative source. When in doubt, match the blueprint exactly.

