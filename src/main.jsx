import { createRoot } from "react-dom/client";
import { AppProviders } from "./context/AppProviders.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
