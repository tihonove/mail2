import { createRoot } from "react-dom/client";
import { App } from "./Containers/App.tsx";
import "./Styles/Reset.css";

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = createRoot(rootElement);

root.render(<App />);
