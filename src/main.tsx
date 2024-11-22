import ReactDOM from "react-dom/client";

import { EnvUnsupported, Root } from "@/components";
import { init } from "@/init";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./assets/styles/global.scss";

import "./mockEnv.ts";
import "./core/i18next";

const debug = import.meta.env.VITE_APP_DEBUG === "true";
const root = ReactDOM.createRoot(document.getElementById("root")!);

try {
  // Configure all application dependencies.
  init(debug);

  root.render(<Root />);
} catch (e) {
  root.render(<EnvUnsupported />);
}
