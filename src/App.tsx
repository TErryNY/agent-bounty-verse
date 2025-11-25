import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";
import NotificationListener from "@/components/NotificationListener";
import { validateEnv } from "@/lib/env";
import { useAuth } from "@/hooks/use-auth";

// Lazy load route components for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./pages/Profile"));
const CreateQuest = lazy(() => import("./pages/CreateQuest"));
const QuestDetails = lazy(() => import("./pages/QuestDetails"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 3 * 60 * 1000, // 3 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection)
    },
  },
});

const App = () => {
  const { user } = useAuth();
  useEffect(() => {
    // Validate environment on mount
    try {
      validateEnv();
    } catch (error) {
      console.error("Environment validation failed:", error);
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <NotificationListener />
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/create-quest" element={user ? <CreateQuest /> : <Navigate to="/auth" replace />} />
                <Route path="/quest/:id" element={user ? <QuestDetails /> : <Navigate to="/auth" replace />} />
                <Route path="/settings" element={user ? <Settings /> : <Navigate to="/auth" replace />} />
                <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth" replace />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
