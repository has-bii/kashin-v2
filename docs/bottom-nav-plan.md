# Bottom Navigation — Implementation Plan

## Overview

Add a bottom tab bar to the mobile app with 5 tabs: Home, Activity, Add Transaction, AI Sync, Settings.

## Design Decisions (resolved)

| Decision | Choice |
|----------|--------|
| Add Transaction tap | Navigate to full page route |
| Route structure | Nested `_tabbed` layout inside `_authenticated` |
| Center tab | Elevated FAB-style circle |
| Active indicator | Filled icon + `text-primary` color |
| Inactive state | Outline icon + `text-muted-foreground` |
| Labels | Always visible under icons |
| Bar background | Solid `bg-background` + top `border-border` |
| Content padding | `pb-20` per DESIGN.md |

## File Changes

### 1. Create layout route — `_authenticated/_tabbed.tsx`

Path: `apps/mobile/src/routes/_authenticated/_tabbed.tsx`

This is a **pathless layout route** (double underscore prefix). It wraps its children with the bottom nav bar.

```tsx
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_tabbed')({
  component: TabbedLayout,
})

function TabbedLayout() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Scrollable content area */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Fixed bottom nav */}
      <BottomNav />
    </div>
  )
}
```

The `<BottomNav />` component can be defined in the same file or extracted to `apps/mobile/src/components/bottom-nav.tsx`. Extracting is preferred for readability.

### 2. Create `<BottomNav />` component

Path: `apps/mobile/src/components/bottom-nav.tsx`

#### Structure

```
┌──────────────────────────────────────────┐
│  border-border (top border)              │
├──────────────────────────────────────────┤
│                                          │
│  🏠      📊      ⊕      ✨      ⚙️     │
│  Home  Activity  Add   AI Sync Settings  │
│                (elevated)                │
└──────────────────────────────────────────┘
```

- **Container**: `fixed bottom-0 inset-x-0 z-50 bg-background border-t border-border`
- **Inner**: `mx-auto max-w-3xl flex items-end justify-around` (match root `max-w-3xl`)
- **Regular tab**: column layout, icon + label, `min-h-11 min-w-11` (44px touch target from DESIGN.md)
- **Center tab (Add Transaction)**: elevated FAB-style. Uses `IconPlus`. Sits in a circle that breaks above the bar:
  - Circle: `bg-primary text-primary-foreground rounded-full` with negative top margin
  - Size: `h-14 w-14` or similar, centered vertically above bar
  - Icon: `size-6` (filled feel via background circle)
- **Active tab**: filled icon variant + `text-primary` + bold label
- **Inactive tab**: outline icon variant + `text-muted-foreground`
- **Icons**: `size-5` per DESIGN.md (tab bar size)

#### Tab data

```ts
const tabs = [
  { to: '/_authenticated/_tabbed/' as const, label: 'Home', icon: 'IconHome', iconFilled: 'IconHomeFilled' },
  { to: '/_authenticated/_tabbed/activity' as const, label: 'Activity', icon: 'IconArrowBarDown', iconFilled: 'IconArrowBarDown' },  // pick appropriate filled variant
  { to: '/_authenticated/_tabbed/add-transaction' as const, label: 'Add', icon: 'IconPlus', isCenter: true },
  { to: '/_authenticated/_tabbed/ai-sync' as const, label: 'AI Sync', icon: 'IconSparkles', iconFilled: 'IconSparkles' },
  { to: '/_authenticated/_tabbed/settings' as const, label: 'Settings', icon: 'IconSettings', iconFilled: 'IconSettings' },
]
```

> **Note**: Check `@tabler/icons-react` for filled variants. Not all icons have `*Filled` versions. If no filled variant exists, use the outline version with `text-primary` for active state. The key distinction is color change, not icon shape.

#### Active detection

Use `useLocation()` from `@tanstack/react-router`:

```ts
const location = useLocation()
const isActive = (path: string) => location.pathname === path
```

Map route paths to tab indices. For the index route `/_authenticated/_tabbed/`, match exactly.

#### Navigation

Use `useNavigate()` or `<Link>` from TanStack Router:

```tsx
import { Link, useLocation } from '@tanstack/react-router'
```

Prefer `<Link>` for accessibility (renders `<a>` tag, keyboard navigable).

### 3. Move home route

**Move** `apps/mobile/src/routes/_authenticated/index.tsx`
**To** `apps/mobile/src/routes/_authenticated/_tabbed/index.tsx`

Update the route path in the file:

```diff
- export const Route = createFileRoute('/_authenticated/')({
+ export const Route = createFileRoute('/_authenticated/_tabbed/')({
```

Keep all existing content (Welcome, sign out button, etc.) unchanged. This is just a route relocation.

### 4. Create stub pages for new tabs

Each is a minimal placeholder. Full implementation comes later.

#### `apps/mobile/src/routes/_authenticated/_tabbed/activity.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_tabbed/activity')({
  component: Activity,
})

function Activity() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Activity</h1>
      <p className="text-muted-foreground mt-2">Transaction history coming soon.</p>
    </div>
  )
}
```

#### `apps/mobile/src/routes/_authenticated/_tabbed/add-transaction.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_tabbed/add-transaction')({
  component: AddTransaction,
})

function AddTransaction() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Add Transaction</h1>
      <p className="text-muted-foreground mt-2">Transaction form coming soon.</p>
    </div>
  )
}
```

#### `apps/mobile/src/routes/_authenticated/_tabbed/ai-sync.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_tabbed/ai-sync')({
  component: AiSync,
})

function AiSync() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">AI Sync</h1>
      <p className="text-muted-foreground mt-2">Email sync coming soon.</p>
    </div>
  )
}
```

#### `apps/mobile/src/routes/_authenticated/_tabbed/settings.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_tabbed/settings')({
  component: Settings,
})

function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="text-muted-foreground mt-2">Settings coming soon.</p>
    </div>
  )
}
```

### 5. Regenerate route tree

After creating/moving files, run:

```bash
bun run --filter mobile dev
```

The `@tanstack/router-plugin` auto-generates `routeTree.gen.ts` when dev server starts. Alternatively:

```bash
# If there's a dedicated generate script
cd apps/mobile && npx tsr generate
```

Verify `routeTree.gen.ts` includes the new `_tabbed` layout and all child routes.

### 6. Delete old index

After confirming the moved route works, delete:

```
apps/mobile/src/routes/_authenticated/index.tsx
```

## File Tree (after changes)

```
apps/mobile/src/
  routes/
    __root.tsx                          # unchanged
    login.tsx                           # unchanged
    terms.tsx                           # unchanged
    privacy.tsx                         # unchanged
    _authenticated.tsx                  # unchanged (auth guard only)
    _authenticated/
      _tabbed.tsx                       # NEW — layout with bottom nav
      _tabbed/
        index.tsx                       # MOVED from _authenticated/index.tsx
        activity.tsx                    # NEW — stub
        add-transaction.tsx             # NEW — stub
        ai-sync.tsx                     # NEW — stub
        settings.tsx                    # NEW — stub
  components/
    bottom-nav.tsx                      # NEW — bottom nav component
```

## DESIGN.md Compliance Checklist

- [x] Touch targets ≥ 44px (`min-h-11 min-w-11`)
- [x] Icons from `@tabler/icons-react`
- [x] Icon size `size-5` for tab bar
- [x] Outline default, filled for active
- [x] `text-muted-foreground` for inactive secondary elements
- [x] `text-primary` for active state
- [x] Semantic color tokens only (no raw hex/rgb)
- [x] `bg-background` + `border-border` for bar
- [x] `pb-20` content clearance for fixed bar
- [x] No `dark:` variants
- [x] `aria-hidden="true"` on decorative icons
- [x] No emoji — icons only
- [x] Content scroll container, not page scroll

## Notes for Implementer

1. **Tabler filled variants**: Check which icons have `*Filled` exports. `IconHomeFilled` exists. Others may not. For icons without filled variants, use the outline version with `text-primary` color for active state — that's sufficient.

2. **Center FAB positioning**: The elevated center button needs careful CSS. Common approach:
   - The tab bar uses `flex items-end justify-around` (not `items-center`)
   - Center item has a wrapper that extends above the bar with negative margin or absolute positioning
   - Circle button: `-mt-6` or similar to rise above the bar edge

3. **`max-w-3xl` constraint**: Root component wraps everything in `max-w-3xl mx-auto`. The bottom nav's `fixed` positioning breaks out of this. Add `max-w-3xl mx-auto` to the nav's inner container to stay aligned.

4. **Route type safety**: TanStack Router generates types from file structure. After creating files, the dev server must run once to regenerate `routeTree.gen.ts` before TypeScript compiles cleanly.

5. **Do not modify** `_authenticated.tsx` auth guard logic. Only route file locations change.
