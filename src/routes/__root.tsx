import { Outlet, createRootRoute } from '@tanstack/react-router';

import { FocusWrapperManager } from '@/components/focus/FocusWrapperManager';
import { TopBar } from '@/components/tobar/TopBar';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="bg-background min-h-screen">
      <FocusWrapperManager />
      <TopBar />
      <Outlet />
    </div>
  );
}
