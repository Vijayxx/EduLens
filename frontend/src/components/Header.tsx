import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

interface HeaderProps {
  userRole: 'student' | 'faculty' | 'admin';
  onRoleChange: (role: 'student' | 'faculty' | 'admin') => void;
}

export const Header = ({ userRole, onRoleChange }: HeaderProps) => {
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'student': return 'Student Portal';
      case 'faculty': return 'Faculty Dashboard';
      case 'admin': return 'Admin Console';
      default: return 'Dashboard';
    }
  };

  const getUserName = (role: string) => {
    switch (role) {
      case 'student': return 'Alex Chen';
      case 'faculty': return 'Dr. Sarah Johnson';
      case 'admin': return 'Admin User';
      default: return 'User';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold">EduLens</h1>
            <p className="text-xs text-muted-foreground">{getRoleDisplay(userRole)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Role Switcher for Demo */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                Switch Role <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onRoleChange('student')}>
                Student View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRoleChange('faculty')}>
                Faculty View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRoleChange('admin')}>
                Admin View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-xs">
                    {getUserName(userRole).split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm">{getUserName(userRole)}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};