import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import Index from "./pages/Index";
import Education from "./pages/Education";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import ProjectDetail from "./pages/ProjectDetail";
import Portfolio from "./pages/Portfolio";
import ProjetHouefa from "./pages/ProjetHouefa";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const AuthenticatedApp = () => {
  const { isAuthenticated, login } = useSimpleAuth();
  const [, forceUpdate] = useState({});

  if (!isAuthenticated) {
    return <Auth onAuthenticated={() => forceUpdate({})} login={login} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/education" element={<Education />} />
        <Route path="/ajouter" element={<AddProject />} />
        <Route path="/edit/:id" element={<EditProject />} />
        <Route path="/projet/:id" element={<ProjectDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projet-houefa" element={<ProjetHouefa />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthenticatedApp />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
