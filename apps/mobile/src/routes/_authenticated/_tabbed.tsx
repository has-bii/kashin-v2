import { Outlet, createFileRoute } from '@tanstack/react-router'

import { BottomNav } from '../../components/bottom-nav'

export const Route = createFileRoute('/_authenticated/_tabbed')({
  component: TabbedLayout,
})

function TabbedLayout() {
  return (
    <>
      <main className="bg-accent/50 no-scrollbar min-h-0 flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </>
  )
}
