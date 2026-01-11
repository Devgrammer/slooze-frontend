import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  RiHome5Line,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiFunctionLine,
  RiStore2Line,
  RiBarChart2Line,
  RiMoneyDollarBoxLine,
  RiSettings5Line,
  RiIdCardLine,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import { SidebarFooter } from "../ui/sidebar";
import { Button } from "../ui/button";
import { LucideLogOut } from "lucide-react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { API_URLS } from "../../constant/api";

const AppSidebar = () => {
  const { open } = useSidebar();
  const navigate = useNavigate();
  const { clearAuth, setError } = useAuth();
  const data = {
    navMain: [
      {
        title: "Home",
        url: "#",
        icon: RiHome5Line,
        items: [],
      },
      {
        title: "Dashboard",
        url: "#",
        icon: RiFunctionLine,
        items: [
          {
            title: "Dashboard",
            url: "dashboard",
          },
        ],
      },
      {
        title: "Store",
        url: "#",
        icon: RiStore2Line,
        items: [
          {
            title: "Product",
            url: "product",
          },
          {
            title: "Add Product",
            url: "add-product",
          },
        ],
      },
      {
        title: "Analytic",
        url: "#",
        icon: RiBarChart2Line,
        items: [
          {
            title: "Traffic",
            url: "#",
          },
          {
            title: "Earning",
            url: "#",
          },
        ],
      },
      {
        title: "Finances",
        url: "#",
        icon: RiMoneyDollarBoxLine,
        items: [
          {
            title: "Payment",
            url: "#",
          },
          {
            title: "Payout",
            url: "#",
          },
        ],
      },
      {
        title: "Account Setting",
        url: "#",
        icon: RiSettings5Line,
        items: [
          {
            title: "My Profile",
            url: "#",
          },
          {
            title: "Security",
            url: "#",
          },
        ],
      },
      {
        title: "Help & Support",
        url: "#",
        icon: RiIdCardLine,
        items: [],
      },
    ],
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(API_URLS.LOGOUT);
      if (response.status === 201) {
        clearAuth();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error))
      clearAuth();
      navigate("/login");
    }
  };
  return (
    <Sidebar collapsible="icon" variant="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="#">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Bitstore</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {<item.icon />}
                      {item.title}{" "}
                      {item.items.length > 0 && (
                        <>
                          <RiArrowUpSLine className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <RiArrowDownSLine className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout} title="Logout">
          {open && "Logout"}
          <LucideLogOut />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
