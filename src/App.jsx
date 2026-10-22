import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

const PortfolioLanding = lazy(() => import('./PortfolioLanding'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));

/**
 * ScrollToTop ensures each route change starts at the top of the window
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if not an anchor jump
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function RouteLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#EDF2F7] flex items-center justify-center">
      <div className="w-7 h-7 border-2 border-[#2563EB]/25 border-t-[#2563EB] rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<PortfolioLanding />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
