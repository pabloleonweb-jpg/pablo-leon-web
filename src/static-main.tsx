import { createRoot } from "react-dom/client";
import { Home } from "./routes/index";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <Home />,
);
