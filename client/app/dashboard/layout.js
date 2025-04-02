import { AppSidebar } from "./add-property/_components/sideBar";
import { Navbar } from "../(home)/_components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-[#F5F5FA]">
        <div className="flex flex-col md:flex-row flex-1">
          <AppSidebar />
          <main className="flex-1 p-4 sm:p-6 md:p-8 w-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;