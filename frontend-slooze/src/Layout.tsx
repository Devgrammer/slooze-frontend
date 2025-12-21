import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/appsidebar/AppSidebar";
import { Outlet } from "react-router";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Bell, Search } from "lucide-react";
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

const Layout = () => {
    const role = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Manager",
      value: 'manager',
    },
  ];
  return (
    <div className="main-container w-screen flex">
      <div className="side-menu-panel w-fit">
        {" "}
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
      <div className="workspace bg-indigo-50 w-screen  box-border space-y-8 overflow-x-hidden">
        {/* TOP NAVBAR */}
        <div className="top-nav flex justify-between p-4">
          <div className="search flex justify-start items-center gap-x-2">
            <Input
              type="text"
              className="max-w-lg bg-white"
              placeholder="Search the products"
            />
            <Button>Search</Button>
          </div>
          <div className="search flex justify-start items-center gap-x-2">
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
        {/* WORKSPACE REGION */}
        <main className="w-full sticky top-0 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
