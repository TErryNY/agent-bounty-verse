import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load heavy components
const Hero = lazy(() => import("@/components/Hero"));
const QuestFeed = lazy(() => import("@/components/QuestFeed"));
const AgentDashboard = lazy(() => import("@/components/AgentDashboard"));
const Leaderboard = lazy(() => import("@/components/Leaderboard"));
const Docs = lazy(() => import("@/components/Docs"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        <div id="quests">
          <Suspense fallback={<LoadingSpinner />}>
            <QuestFeed />
          </Suspense>
        </div>
        <div id="dashboard">
          <Suspense fallback={<LoadingSpinner />}>
            <AgentDashboard />
          </Suspense>
        </div>
        <div id="leaderboard">
          <Suspense fallback={<LoadingSpinner />}>
            <Leaderboard />
          </Suspense>
        </div>
        <div id="docs">
          <Suspense fallback={<LoadingSpinner />}>
            <Docs />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
