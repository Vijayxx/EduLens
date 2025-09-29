import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { useState } from "react";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentView from "./pages/StudentView";
import Courses from "./pages/Courses";
import Analytics from "./pages/Analytics";
import Interventions from "./pages/Interventions";
import Reports from "./pages/Reports";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [userRole, setUserRole] = useState<'student' | 'faculty' | 'admin'>('admin');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            
            {/* Authenticated App Pages with Layout */}
            <Route path="/app/*" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full bg-background">
                  <Sidebar userRole={userRole} />
                  <div className="flex-1 flex flex-col">
                    <Header userRole={userRole} onRoleChange={setUserRole} />
                    <main className="flex-1">
                      <Routes>
                        <Route path="dashboard" element={<Dashboard userRole={userRole} />} />
                        <Route path="students" element={<Students />} />
                        <Route path="student/:id" element={<StudentView />} />
                        <Route path="courses" element={<Courses />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="interventions" element={<Interventions />} />
                        <Route path="reports" element={<Reports />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </SidebarProvider>
            } />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;