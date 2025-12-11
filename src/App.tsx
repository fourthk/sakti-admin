import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ChangeRequest from "./pages/ChangeRequest";
import ChangeResults from "./pages/ChangeResults";
import PatchJob from "./pages/PatchJob";
import PatchResults from "./pages/PatchResults";
import Schedule from "./pages/Schedule";
import CMDB from "./pages/CMDB";
import Approval from "./pages/Approval";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/change-request" element={<ChangeRequest />} />
            <Route path="/change-results" element={<ChangeResults />} />
            <Route path="/patch-job" element={<PatchJob />} />
            <Route path="/patch-results" element={<PatchResults />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/cmdb" element={<CMDB />} />
            <Route path="/approval" element={<Approval />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
