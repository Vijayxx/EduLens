import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  HeartHandshake,
  FileText,
  User,
  GraduationCap,
  Target,
} from "lucide-react";

interface SidebarProps {
  userRole: 'student' | 'faculty' | 'admin';
}

export const Sidebar = ({ userRole }: SidebarProps) => {
  const location = useLocation();

  const getNavigationItems = () => {
    const baseItems = [
      { title: "Dashboard", url: "/app/dashboard", icon: LayoutDashboard },
    ];

    switch (userRole) {
      case 'student':
        return [
          ...baseItems,
          { title: "My Progress", url: "/app/student/me", icon: User },
          { title: "Study Plan", url: "/app/student/plan", icon: Target },
          { title: "My Courses", url: "/app/courses", icon: BookOpen },
        ];
      case 'faculty':
        return [
          ...baseItems,
          { title: "My Classes", url: "/app/courses", icon: GraduationCap },
          { title: "Students", url: "/app/students", icon: Users },
          { title: "Analytics", url: "/app/analytics", icon: BarChart3 },
          { title: "Interventions", url: "/app/interventions", icon: HeartHandshake },
        ];
      case 'admin':
      default:
        return [
          ...baseItems,
          { title: "Students", url: "/app/students", icon: Users },
          { title: "Courses", url: "/app/courses", icon: BookOpen },
          { title: "Analytics", url: "/app/analytics", icon: BarChart3 },
          { title: "Interventions", url: "/app/interventions", icon: HeartHandshake },
          { title: "Reports", url: "/app/reports", icon: FileText },
        ];
    }
  };

  const items = getNavigationItems();
  const currentPath = location.pathname;

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent hover:text-accent-foreground";

  return (
    <SidebarRoot className="w-64">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarRoot>
  );
};