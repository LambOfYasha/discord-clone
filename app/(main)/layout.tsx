import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { MainLayoutClient } from "@/components/navigation/main-layout-client";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full">
        <MainLayoutClient navigationSidebar={<NavigationSidebar />}>
          {children}
        </MainLayoutClient>
      </div>
    </>
  );
};

export default MainLayout;
