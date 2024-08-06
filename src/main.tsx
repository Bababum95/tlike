import ReactDOM from "react-dom/client";

import { Root } from "@/components";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./assets/styles/global.scss";

import "./mockEnv.ts";
import "./core/i18next";

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
