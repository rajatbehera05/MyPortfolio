import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PortfolioLanding from './PortfolioLanding';
import ProjectsPage from './pages/ProjectsPage';

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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PortfolioLanding />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
