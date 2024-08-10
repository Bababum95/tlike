import { useUtils, initHapticFeedback } from "@telegram-apps/sdk-react";
import { type FC, type MouseEventHandler, useCallback } from "react";
import { Link as RouterLink, type LinkProps } from "react-router-dom";

export const Link: FC<LinkProps> = ({ onClick: propsOnClick, to, ...rest }) => {
  const utils = useUtils();
  const haptic = initHapticFeedback();

  const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      propsOnClick?.(e);
      haptic.impactOccurred("medium");

      // Compute if target path is external. In this case we would like to open link using
      // TMA method.
      let path: string;
      if (typeof to === "string") {
        path = to;
      } else {
        const { search = "", pathname = "", hash = "" } = to;
        path = `${pathname}?${search}#${hash}`;
      }

      const targetUrl = new URL(path, window.location.toString());
      const currentUrl = new URL(window.location.toString());
      const isExternal =
        targetUrl.protocol !== currentUrl.protocol ||
        targetUrl.host !== currentUrl.host;

      if (isExternal) {
        e.preventDefault();
        utils.openLink(targetUrl.toString());
      }
    },
    [to, propsOnClick, utils]
  );

  return <RouterLink {...rest} to={to} onClick={onClick} />;
};
