import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import MeetingPage from "./meetings-page";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Layout() {
  
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full p-4 flex flex-col">
          <SidebarTrigger />
          <MeetingPage />
        </main>
      </SidebarProvider>
    </>
  );
}
