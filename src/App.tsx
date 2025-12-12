import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Emergency from "./pages/Emergency";
import ChangeRequest from "./pages/ChangeRequest";
import ChangeRequestDetail from "./pages/ChangeRequestDetail";
import ChangeResults from "./pages/ChangeResults";
import ChangeSchedule from "./pages/ChangeSchedule";
import PatchJob from "./pages/PatchJob";
import PatchResults from "./pages/PatchResults";
import PatchSchedule from "./pages/PatchSchedule";
import CMDB from "./pages/CMDB";
import Approval from "./pages/Approval";
import ApprovalDetail from "./pages/ApprovalDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated } from "./lib/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated() ? <Navigate to="/" replace /> : <Login />
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/change-request" element={<ChangeRequest />} />
              <Route path="/change-request/:id" element={<ChangeRequestDetail />} />
              <Route path="/change-schedule" element={<ChangeSchedule />} />
              <Route path="/change-results" element={<ChangeResults />} />
              <Route path="/patch-job" element={<PatchJob />} />
              <Route path="/patch-schedule" element={<PatchSchedule />} />
              <Route path="/patch-results" element={<PatchResults />} />
              <Route path="/cmdb" element={<CMDB />} />
              <Route path="/approval" element={<Approval />} />
              <Route path="/approval/:id" element={<ApprovalDetail />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
