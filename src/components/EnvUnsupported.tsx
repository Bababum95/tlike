import { Placeholder, AppRoot } from "@telegram-apps/telegram-ui";
import {
  retrieveLaunchParams,
  isColorDark,
  isRGB,
} from "@telegram-apps/sdk-react";
import { useMemo } from "react";

import { emptyImage } from "@images";

export const EnvUnsupported = () => {
  const [platform, isDark] = useMemo(() => {
    let platform = "base";
    let isDark = false;
    try {
      const lp = retrieveLaunchParams();
      const { bgColor } = lp.themeParams;
      platform = lp.platform;
      isDark = bgColor && isRGB(bgColor) ? isColorDark(bgColor) : false;
    } catch (error) {
      console.log(error);
    }

    return [platform, isDark];
  }, []);

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(platform) ? "ios" : "base"}
    >
      <Placeholder
        header="Oops"
        description="You are using too old Telegram client to run this application"
      >
        <img
          alt="Telegram sticker"
          src={emptyImage}
          style={{ display: "block", width: "144px", height: "144px" }}
        />
      </Placeholder>
    </AppRoot>
  );
};
