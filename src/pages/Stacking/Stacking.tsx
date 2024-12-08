import { AnimatePresence } from "motion/react";

import { useAppSelector } from "@hooks";
import { Navigation, Page } from "@/components";

import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import styles from "./Stacking.module.scss";

export const Stacking = () => {
  const stackingStore = useAppSelector((state) => state.stacking);

  return (
    <Page back={false}>
      <AnimatePresence>
        <div className={styles.page}>
          {stackingStore.preview ? (
            <StepOne />
          ) : (
            <StepTwo settings={stackingStore.settings} />
          )}
        </div>
      </AnimatePresence>
      <Navigation />
    </Page>
  );
};
