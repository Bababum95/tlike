import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { initData } from "@telegram-apps/sdk-react";
import { QRCodeCanvas } from "qrcode.react";

import { User, Link, Toast } from "@/components";
import { useAppDispatch } from "@hooks";
import { setNotice } from "@/core/store/slices/notice";

import { SettingIcon, WalletIcon, QRCodeIcon, CopyIcon } from "@images";

import styles from "./Header.module.scss";

export const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const user = initData.user();

  const copy = () => {
    navigator.clipboard.writeText(String(user?.id));
    dispatch(setNotice({ status: "success", message: "Copied to clipboard" }));
  };

  return (
    <header className={styles.header}>
      <User showIcon />
      <Link className={styles.wallet} to="/wallet">
        <WalletIcon />
        <span>{t("wallet")}</span>
      </Link>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        <QRCodeIcon />
      </button>
      <Link className={styles.button} to="/settings">
        <SettingIcon />
      </Link>

      {user && (
        <Toast isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className={styles.toast}>
            <h2 className={styles.title}>{t("qr-title")}</h2>
            <div className={styles.canvas}>
              <QRCodeCanvas
                value={user.id.toString()}
                size={200}
                level="M"
                includeMargin
                marginSize={1}
                imageSettings={{
                  src: "https://tonlike.com/logo.png",
                  height: 54,
                  width: 54,
                  opacity: 1,
                  excavate: true,
                }}
              />
            </div>
            <button onClick={copy} className={styles.id}>
              <span>ID: {user.id}</span>
              <CopyIcon />
            </button>
            <button
              className={styles["toast-button"]}
              onClick={() => setIsOpen(false)}
            >
              Продолжить
            </button>
          </div>
        </Toast>
      )}
    </header>
  );
};
