import { AppSidebar } from "./add-property/_components/sideBar";
import { Navbar } from "../(home)/_components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = ({ children }) => {
  return (
    <div className="flex flex-col bg-[#F5F5FA]">
      <div className="flex flex-row bg-[#F5F5FA]">
        <AppSidebar />
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
