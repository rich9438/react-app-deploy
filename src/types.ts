export type Lang = "en" | "zh";

export type RoundMode = "zero" | "ten" | "hundred";
export type SplitMode = "average" | "manual";

/** A raw cross-account transfer in the settlement simulator. */
export interface Transaction {
  id: number;
  from: string;
  to: string;
  amount: number;
}

/** One row of the net-balance table (derived from transactions). */
export interface NetRow {
  acc: string;
  totalIn: number;
  totalOut: number;
  net: number;
}

/** A single minimized settlement transfer. */
export interface Transfer {
  from: string;
  to: string;
  amount: number;
}

/** A recorded family expense, already split into per-member shares. */
export interface Expense {
  id: number;
  members: string[];
  account: string;
  amount: number;
  roundMode: RoundMode;
  splitMode: SplitMode;
  purposeIdx: number;
  note: string;
  shares: Record<string, number>;
}
