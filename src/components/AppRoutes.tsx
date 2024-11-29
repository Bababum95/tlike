import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { routes, type Route as RouteType } from "@/core/routes";

/**
 * Function to render routes recursively.
 *
 * @param {RouteType[]} routes - List of route definitions to render. Each route contains:
 *   - `path` (string): The URL path for the route.
 *   - `Component` (ComponentType): The component to render for this route.
 *   - `children` ({ path?: string; Component: ComponentType; index?: boolean }[] | undefined):
 *     An array of nested route objects, each with:
 *       - `path` (string | undefined): The URL path for the nested route.
 *       - `Component` (ComponentType): The component to render for the nested route.
 *       - `index` (boolean | undefined): Marks the nested route as an index route if true.
 *
 * @returns {JSX.Element[]} Array of <Route> elements, recursively rendered for each route and its children.
 */
const renderRoutes = (routes: RouteType[]): JSX.Element[] => {
  return routes.map(({ path, Component, children }) => (
    <Route key={path} element={<Component />} path={path}>
      {children &&
        children.map(({ path, Component, index }, i) => (
          <Route key={i} element={<Component />} path={path} index={index} />
        ))}
    </Route>
  ));
};

/**
 * Main App Routes Component.
 *
 * This component renders all application routes using React Router's `<Routes>` and `<Route>` components.
 * It includes:
 *   - Recursive rendering of nested routes using `renderRoutes`.
 *   - A fallback route (`*`) that redirects to the home page ("/") if no match is found.
 *
 * @returns {JSX.Element} The main application routes wrapped in `<Routes>`.
 */
export const AppRoutes: FC = (): JSX.Element => {
  return (
    <Routes>
      {renderRoutes(routes)}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
