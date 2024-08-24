import { initInitData } from "@telegram-apps/sdk";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@hooks";
import { Balance } from "@/components";
import { referralActivate } from "@/core/store/slices/user";
import { setNotice } from "@/core/store/slices/notice";

import styles from "./Referal.module.scss";

export const Referal = () => {
  const referal = useAppSelector((state) => state.user.referal);
  const initData = initInitData();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!referal) {
      navigate("/onboarding", { replace: true });
    }
  }, []);

  const takeGift = async () => {
    dispatch(
      setNotice({ status: "loading", message: "Request Processing..." })
    );

    try {
      await dispatch(referralActivate());
      dispatch(setNotice({ status: "success", message: "Success!" }));
    } catch (err) {
      console.log(err);
      dispatch(setNotice({ status: "error", message: "Error!" }));
    } finally {
      navigate("/onboarding", { replace: true });
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.name}>
        {`${initData?.user?.firstName} ${initData?.user?.lastName}`}
      </h1>
      <Balance />
      <h2 className={styles.title}>Take a gift from</h2>
      <p className={styles.inviter_id}>{referal?.inviter_id}</p>
      <div
        className={styles.gift}
        onClick={(evt) => {
          (evt.target as HTMLElement).classList.toggle(styles.clicked);
          takeGift();
        }}
        role="button"
        tabIndex={0}
      >
        <svg
          width={44}
          height={38}
          viewBox="0 0 44 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.9998 35.9649C21.0646 37.7732 21.0634 37.7724 21.0634 37.7724L21.0571 37.7691L21.0425 37.7615L20.9923 37.7352C20.9497 37.7127 20.889 37.6804 20.8112 37.6383C20.6558 37.5544 20.4324 37.4318 20.1508 37.2724C19.5879 36.9535 18.7907 36.4861 17.8372 35.8832C15.9343 34.6802 13.3877 32.9249 10.8312 30.7211C5.83486 26.4137 0.285156 19.9512 0.285156 12.2145C0.285156 4.98295 5.94669 0 11.8211 0C16.0211 0 19.7005 2.17557 21.9998 5.48282C24.2992 2.17557 27.9784 0 32.1786 0C38.0529 0 43.7145 4.98295 43.7145 12.2145C43.7145 19.9512 38.1648 26.4137 33.1685 30.7211C30.6119 32.9249 28.0653 34.6802 26.1625 35.8832C25.209 36.4861 24.4118 36.9535 23.8488 37.2724C23.5672 37.4318 23.3439 37.5544 23.1884 37.6383C23.1107 37.6804 23.0499 37.7127 23.0073 37.7352L22.9571 37.7615L22.9425 37.7691L22.9363 37.7724C22.9363 37.7724 22.9351 37.7732 21.9998 35.9649ZM21.9998 35.9649L22.9363 37.7724C22.3497 38.0759 21.65 38.0759 21.0634 37.7724L21.9998 35.9649Z"
            fill="white"
          />
        </svg>
        <p className={styles.amount}>
          {`${new Intl.NumberFormat("ru-RU", {
            maximumFractionDigits: 0,
          }).format(referal?.gift_amount || 0)} ${referal?.gift_currency}`}
        </p>
        <p className={styles.description}>Take the gift</p>
      </div>
    </div>
  );
};
