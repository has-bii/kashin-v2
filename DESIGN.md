# DESIGN.md — Kashin Design System Guide

> Visual language reference. No feature specs, no architecture, no file paths. Survives code changes.

## Shadcn UI — Always First

**Prioritize shadcn components for everything.** Custom UI only when shadcn lacks a primitive.

Before building any UI element: check installed components → check registry → add what's missing → use it.

### Installed

`alert` · `button` · `card` · `input` · `label`

### Available in `@shadcn` Registry

`accordion` · `alert-dialog` · `aspect-ratio` · `avatar` · `badge` · `breadcrumb` · `button-group` · `calendar` · `carousel` · `chart` · `checkbox` · `collapsible` · `combobox` · `command` · `context-menu` · `dialog` · `drawer` · `dropdown-menu` · `empty` · `field` · `form` · `hover-card` · `input-group` · `input-otp` · `item` · `kbd` · `menubar` · `native-select` · `navigation-menu` · `pagination` · `popover` · `progress` · `radio-group` · `resizable` · `scroll-area` · `select` · `separator` · `sheet` · `sidebar` · `skeleton` · `slider` · `sonner` · `spinner` · `switch` · `table` · `tabs` · `textarea` · `toggle` · `toggle-group` · `tooltip`

Pre-built blocks also available (dashboard layouts, login/signup forms, chart variants, sidebar patterns). Search registry for more.

## Design Personality

**Minimalist.** Whitespace-heavy, muted palette, subtle borders, no bold gradients. Clean and calm — money is stressful enough.

- Generous padding and spacing
- Neutral base (`baseColor: neutral`)
- Green primary accent for CTAs and positive indicators
- Soft card containers, no heavy shadows
- Inter font

## Color System

Use Tailwind semantic classes — never raw color values.

| Token | Tailwind class | Usage |
|-------|---------------|-------|
| `--background` | `bg-background` | Page background |
| `--foreground` | `text-foreground` | Primary text |
| `--primary` | `bg-primary`, `text-primary` | CTAs, active states, accents |
| `--primary-foreground` | `text-primary-foreground` | Text on primary backgrounds |
| `--muted` | `bg-muted` | Subtle backgrounds, sections |
| `--muted-foreground` | `text-muted-foreground` | Secondary text, labels |
| `--destructive` | `bg-destructive` | Errors, delete actions, negative amounts |
| `--card` | `bg-card` | Card surfaces |
| `--border` | `border-border` | Dividers, card outlines |

### Finance Semantic Colors

| Concept | Approach |
|---------|----------|
| Expense / money out | `text-destructive` |
| Income / money in | `text-primary` (green) |
| Neutral amount | `text-foreground` |
| Budget warning (>80%) | `text-chart-4` |
| Budget exceeded | `text-destructive` |

### Dark Mode

**Light mode only.** Do not use `dark:` variants.

## Typography

- **Font**: Inter Variable (`--font-sans`)
- **Heading font**: Same as body

| Element | Classes | Notes |
|---------|---------|-------|
| Page title | `text-2xl font-semibold tracking-tight` | One per screen |
| Section heading | `text-lg font-medium` | Card headers, section labels |
| Body text | `text-sm` | Default readable size |
| Caption / meta | `text-xs text-muted-foreground` | Timestamps, labels, hints |
| Amount / money | `text-lg font-semibold tabular-nums` | Always `tabular-nums` for alignment |
| Large amount | `text-3xl font-bold tabular-nums` | Hero numbers |

## Spacing

- **Page padding**: `p-4` mobile (16px)
- **Section gap**: `space-y-6` between major sections
- **Card padding**: `p-4` or `p-6` depending on density
- **Element gap**: `gap-2` for tight groups, `gap-4` for standard
- **Border radius**: `--radius: 0.625rem` (10px). Tailwind: `rounded-lg` default, `rounded-md` for buttons/inputs

## Layout Principles

- **Cards group related content**. One `Card` per content section.
- **Lists use dividers, not cards-per-item**. Single card with `divide-y`.
- **Section headers**: `text-xs text-muted-foreground uppercase tracking-wider` for grouping labels.
- **Bottom sheets** for quick-add forms (`Sheet side="bottom"`), not full pages.
- **Filters/sub-navigation at top** using `Tabs` or compact chip buttons.
- **Action menus**: `DropdownMenu` on item tap for edit/delete.
- **Bottom tab bar**: Fixed viewport bottom. Content needs `pb-20` clearance. Scroll container on content, not page.

## Iconography

- **Library**: `@tabler/icons-react`
- **Size**: `size-4` inline, `size-5` tab bar, `size-6` empty states
- **Style**: Outline default. Filled only for active tab icons.
- **Color**: Inherit from parent. `text-muted-foreground` for secondary.

## States

### Loading

- **Full page**: Center spinner + "Loading…"
- **Cards/sections**: `Skeleton` matching content dimensions
- **Buttons**: Spinner + text change + `disabled`
- **Lists**: Skeleton rows matching item height

### Empty

- Centered icon (muted, 48px) + message (`text-muted-foreground`) + CTA button

### Error

- **Form errors**: Inline below input. `text-destructive text-xs`
- **API errors**: `Alert` variant `destructive` at top of content
- **Toast notifications**: `sonner` for success/error on mutations
- **Network errors**: Full-screen error state with retry button

## Currency & Numbers

- **Always** `tabular-nums` on amount elements
- **Format**: Locale-aware (`Intl.NumberFormat`). Default: JPY (¥, no decimals)
- **Sign**: Expenses `-`, Income `+`
- **Color**: Expense `text-destructive`, Income `text-primary`

## Animation

- **Minimal**. No page transitions, no spring physics
- **Micro-interactions OK**: `animate-spin` on loaders, `transition-colors` on hover
- **shadcn defaults**: Keep Radix animations as-is
- **No custom keyframes** unless essential

## Accessibility

- All interactive elements: visible focus rings (shadcn default)
- Form inputs: `Label` + `aria-invalid` on error
- Icons: `aria-hidden="true"` when decorative
- Touch targets: minimum 44px (`min-h-11 min-w-11`)
- Color is never the only indicator — pair with text/icon

## Anti-Patterns

- Don't use raw hex/rgb — Tailwind semantic classes only
- Don't create custom button/input variants — extend shadcn first
- Don't use `dark:` variants
- Don't hardcode spacing — Tailwind scale
- Don't install non-shadcn UI libraries without checking registry first
- Don't use emoji in production UI — use `@tabler/icons-react`
