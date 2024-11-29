import { FC } from "react";

import { BalanceItem, Link } from "@/components";
import { useAppSelector } from "@hooks";

import styles from "./Balance.module.scss";

export const Balance: FC = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <Link to="/wallet" className={styles.wrapper}>
      <BalanceItem
        name="like"
        direction="column"
        mining={user.mining_speed.like * 3600}
        maximumFractionDigits={0}
      />
      <BalanceItem
        name="love"
        direction="column"
        mining={
          (user.mining_speed.love_nft + user.mining_speed.love_upgrades) * 3600
        }
        maximumFractionDigits={0}
      />
    </Link>
  );
};
