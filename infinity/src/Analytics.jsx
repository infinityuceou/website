import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    window.gtag("config", import.meta.env.VITE_GA_ID, {
      page_path: location.pathname,
    });
  }, [location]);

  return null;
};

export default Analytics;