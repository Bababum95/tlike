import { stateStatus } from "./abstract";

type TransferType = {
  amount: number;
  currency: string;
  date: string;
  description: string;
  id: number;
  transaction_info: {
    receiver: { user_id: string; received_amount: number };
    sender: { user_id: string; sent_amount: string };
    type: "transfer";
    transaction_id: number;
  };
  type: "Transfer";
  user_id: string;
};

type TasksType = {
  amount: number;
  currency: string;
  date: string;
  description: string;
  id: number;
  transaction_info: null;
  type: "Tasks";
  user_id: string;
};

type FortuneType = {
  amount: number;
  currency: string;
  date: string;
  description: string;
  id: number;
  transaction_info: null;
  type: "Fortune";
  user_id: string;
};

type HistoryItem = TransferType | TasksType | FortuneType;

export type HistoryStateType = {
  status: stateStatus;
  data: HistoryItem[];
};
