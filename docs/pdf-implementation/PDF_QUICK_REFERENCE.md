# PDF Generation Quick Reference

## Essential CSS Variables

Use these CSS variables directly (match blueprint):

```css
/* In className, use: */
bg-[var(--header-bg)]           /* Header background */
text-[var(--header-foreground)] /* Header text */
bg-[var(--highlight)]           /* Highlight color */
text-[var(--accent-foreground)] /* Accent text */
bg-[var(--table-header)]        /* Table header background */
```

## Component Structure Pattern

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

## Spacing Standards

| Element | Spacing |
|---------|---------|
| Header/Footer | `px-10 py-8` |
| Sections | `px-10 py-8` |
| Cards | `p-5` or `p-6` |

## Typography Pattern

```tsx
// Section header with divider
<h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
  <span className="w-8 h-px bg-border"></span>
  Section Title
</h3>

// Main heading
<h2 className="text-xl font-semibold">Title</h2>
```

## Color Usage Guide

- **Headers**: `bg-[var(--header-bg)] text-[var(--header-foreground)]`
- **Highlights**: `bg-[var(--highlight)]/10 border-[var(--highlight)]`
- **Tables**: `bg-[var(--table-header)]`
- **Important text**: `text-[var(--accent-foreground)]`

## Checklist

Before deploying PDF changes:

- [ ] Element has `id="electrical-quote-document"`
- [ ] Uses CSS variables, not Tailwind classes
- [ ] Spacing matches blueprint (px-10, py-8)
- [ ] Multi-page uses `<article>` elements
- [ ] Page breaks use `page-break` class

## Common Mistakes to Avoid

❌ **Don't:**
- Use `bg-primary` (use `bg-[var(--header-bg)]`)
- Use `px-8 py-6` (use `px-10 py-8`)
- Put everything in one `<div>` (use `<article>` pages)

✅ **Do:**
- Reference blueprint components directly
- Use CSS variables from globals.css
- Match spacing exactly
- Break into modular components

