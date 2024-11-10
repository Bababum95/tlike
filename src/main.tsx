import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";

import { EnvUnsupported, Root } from "@/components";
import { init } from "@/init";
import { routes } from "@/core/routes";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./assets/styles/global.scss";

import "./mockEnv.ts";
import "./core/i18next";

const debug = import.meta.env.VITE_APP_DEBUG === "true";
const root = ReactDOM.createRoot(document.getElementById("root")!);

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      ...routes.map(({ path, Component }) => ({
        path: path,
        element: <Component />,
      })),
    ],
  },
]);

try {
  // Configure all application dependencies.
  init(debug);

  root.render(<RouterProvider router={router} />);
} catch (e) {
  root.render(<EnvUnsupported />);
}
