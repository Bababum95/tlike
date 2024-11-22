import { type FC, useMemo } from "react";
import { Provider } from "react-redux";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";

import { store } from "@/core/store";
import { App, ErrorBoundary } from "@/components";

const twaReturnUrl = import.meta.env.VITE_WEB_APP_URL;
const time = import.meta.env.VITE_APP_BUILD_TIME;


const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div style={{ color: "#FFF" }}>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

export const Root: FC = () => {
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);
  console.info(time);

  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <TonConnectUIProvider
        manifestUrl={manifestUrl}
        actionsConfiguration={{ twaReturnUrl }}
        uiPreferences={{
          theme: THEME.DARK,
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
};
