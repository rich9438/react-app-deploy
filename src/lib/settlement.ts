import type { NetRow, Transaction, Transfer } from "../types";

/**
 * Compute per-account totals in / out and the resulting net balance.
 * Ported verbatim from the original `calculateAndRender`, minus DOM writes.
 */
export function computeNetBalances(
  accounts: string[],
  transactions: Transaction[],
): NetRow[] {
  const net: Record<string, number> = {};
  const totalIn: Record<string, number> = {};
  const totalOut: Record<string, number> = {};

  accounts.forEach((acc) => {
    net[acc] = 0;
    totalIn[acc] = 0;
    totalOut[acc] = 0;
  });

  transactions.forEach((tx) => {
    if (net[tx.from] !== undefined) {
      net[tx.from] -= tx.amount;
      totalOut[tx.from] += tx.amount;
    }
    if (net[tx.to] !== undefined) {
      net[tx.to] += tx.amount;
      totalIn[tx.to] += tx.amount;
    }
  });

  return accounts.map((acc) => ({
    acc,
    totalIn: totalIn[acc],
    totalOut: totalOut[acc],
    net: net[acc],
  }));
}

/**
 * Greedy minimal-transfer settlement: repeatedly match the largest debtor
 * against the largest creditor. Same algorithm as the original file.
 */
export function optimizeSettlement(rows: NetRow[]): Transfer[] {
  const debtors: { acc: string; amount: number }[] = [];
  const creditors: { acc: string; amount: number }[] = [];

  rows.forEach((row) => {
    if (row.net < -0.01) debtors.push({ acc: row.acc, amount: -row.net });
    else if (row.net > 0.01) creditors.push({ acc: row.acc, amount: row.net });
  });

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const transfers: Transfer[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const settleAmount = Math.min(debtor.amount, creditor.amount);

    transfers.push({ from: debtor.acc, to: creditor.acc, amount: settleAmount });

    debtor.amount -= settleAmount;
    creditor.amount -= settleAmount;

    if (debtor.amount < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }

  return transfers;
}
