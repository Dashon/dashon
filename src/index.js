import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css/animate.min.css";
import App from "./App";
import ReactGA from 'react-ga4';
import { PostHogProvider } from '@posthog/react';

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
};

ReactGA.initialize(import.meta.env.VITE_PUBLIC_GA_MEASUREMENT_ID);
ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
      <App />
    </PostHogProvider>
  </React.StrictMode>
);
