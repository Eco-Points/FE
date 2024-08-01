import ReactDOM from "react-dom/client";
import React from "react";

import { Toaster } from "@/components/ui/sonner";

import { TokenProvider } from "./utils/contexts/token";
import App from "./routes";

import "../src/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TokenProvider>
      <App />
      <Toaster position="top-center" />
    </TokenProvider>
  </React.StrictMode>
);
