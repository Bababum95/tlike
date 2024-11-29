import { FC } from "react";

type Props = {
  type?: "silver" | "gold" | "platinum";
};

export const Card: FC<Props> = ({ type = "silver" }) => {

  return <div>{type}</div>;
};
