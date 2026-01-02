import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/appsidebar/AppSidebar";
import { Outlet } from "react-router";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Bell, Moon, Sun } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiFunctionLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { SidebarInset, SidebarTrigger } from "./components/ui/sidebar";
import { useTheme } from "./context/theme";

const Layout = () => {
  const role = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Manager",
      value: "manager",
    },
  ];
   const { theme, setTheme } = useTheme();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="workspace min-h-screen">
        {/* TOP NAVBAR */}
        <div className="top-nav flex justify-between p-4 box-border">
          <SidebarTrigger />
          <div className="search flex justify-start items-center gap-x-2">
            <Input
              type="text"
              className="w-92 bg-white"
              placeholder="Search the products"
            />
            <Button>Search</Button>
          </div>
          <div className="search flex justify-start items-center gap-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light"?"dark":"light")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            {/* ROLE DROPDOWN */}
            <Select className="!bg-white">
              <SelectTrigger className="w-[100px] bg-white">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  {role.map((item, index) => {
                    return (
                      <SelectItem key={`yr-${index}`} value={item.value}>
                        {item.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant={"outline"}>
              <RiFunctionLine />
            </Button>
            <Button variant={"outline"}>
              <Bell />
            </Button>
            <Avatar>
              <AvatarImage
                className="rounded-full w-10"
                alt="sale"
                src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <AvatarFallback>Sale</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="border-box p-4 pb-24">
          <Outlet />
        </div>
        {/* WORKSPACE REGION */}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
