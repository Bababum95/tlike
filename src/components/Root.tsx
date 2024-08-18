import { type FC, useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import { SDKProvider } from "@telegram-apps/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import { store } from "@/core/store";
import { App, ErrorBoundary } from "@/components";

const debug = import.meta.env.VITE_APP_DEBUG === "true";
const twaReturnUrl = import.meta.env.VITE_WEB_APP_URL;

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
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

const Inner: FC = () => {
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{ twaReturnUrl }}
    >
      <SDKProvider acceptCustomStyles debug={debug}>
        <Provider store={store}>
          <App />
        </Provider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);
