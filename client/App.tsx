import React from "react";
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleSelection from "./pages/RoleSelection";
import ProfileSetup from "./pages/ProfileSetup";
import Swipe from "./pages/SwipeNew";
import Farm from "./pages/Farm";
import Forum from "./pages/Forum";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />

          {/* Main App Routes */}
          <Route path="/swipe" element={<Swipe />} />
          <Route path="/farm" element={<Farm />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
