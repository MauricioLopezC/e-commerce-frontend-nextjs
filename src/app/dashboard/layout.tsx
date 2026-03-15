import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import DashBoardBreadCrumbs from '@/components/dashboard/DashBoardBreadCrumbs';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <SidebarProvider className="relative">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DashBoardBreadCrumbs />
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
