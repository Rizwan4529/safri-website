import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import heroBg from "./assets/images/hero/Hero-bg.png";
import heroRight from "./assets/images/hero/Hero-right.png";
import logo from "./assets/images/logo.svg";
import "./index.css";
import App from "./App.tsx";

const preloadImage = (href: string) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = href;
  document.head.appendChild(link);
};

preloadImage(logo);
preloadImage(heroBg);
preloadImage(heroRight);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
