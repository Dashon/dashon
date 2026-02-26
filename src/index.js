import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css/animate.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ReactGA from 'react-ga4';
import { PostHogProvider } from '@posthog/react';

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
};

ReactGA.initialize(process.env.REACT_APP_PUBLIC_GA_MEASUREMENT_ID); // New GA4 Measurement ID
ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });

ReactDOM.render(
  <React.StrictMode>
    <PostHogProvider apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY} options={options}>
      <App />
    </PostHogProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
