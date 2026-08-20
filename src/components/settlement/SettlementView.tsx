import { useMemo, useRef, useState } from "react";
import { useLang } from "../../context/LangContext";
import { i18n } from "../../i18n";
import type { Transaction } from "../../types";
import { computeNetBalances, optimizeSettlement } from "../../lib/settlement";
import AccountManager from "./AccountManager";
import TransactionForm from "./TransactionForm";
import NetBalanceTable from "./NetBalanceTable";
import OptimizedResult from "./OptimizedResult";

function defaultTransactions(accs: string[]): Transaction[] {
  return [
    { id: 1, from: accs[1], to: accs[0], amount: 3000 },
    { id: 2, from: accs[2], to: accs[1], amount: 2000 },
    { id: 3, from: accs[0], to: accs[2], amount: 1000 },
    { id: 4, from: accs[3], to: accs[0], amount: 2000 },
  ];
}

export default function SettlementView() {
  const { t, pack } = useLang();

  const [accounts, setAccounts] = useState<string[]>([...i18n.en.defaultAccs]);
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    defaultTransactions(i18n.en.defaultAccs),
  );
  const nextTxId = useRef(5);

  const netRows = useMemo(
    () => computeNetBalances(accounts, transactions),
    [accounts, transactions],
  );
  const transfers = useMemo(() => optimizeSettlement(netRows), [netRows]);

  function resetDefaultExample() {
    const accs = [...pack.defaultAccs];
    setAccounts(accs);
    setTransactions(defaultTransactions(accs));
    nextTxId.current = 5;
  }

  function addAccount(name: string) {
    if (!name) return alert(t("alertNoName"));
    if (accounts.includes(name)) return alert(t("alertExist"));
    setAccounts((prev) => [...prev, name]);
  }

  function removeAccount(accName: string) {
    if (accounts.length <= 2) return alert(t("alertMin"));
    const hasTx = transactions.some(
      (tx) => tx.from === accName || tx.to === accName,
    );
    if (hasTx) {
      const msg = t("alertInUse").replace("{0}", accName);
      if (!confirm(msg)) return;
      setTransactions((prev) =>
        prev.filter((tx) => tx.from !== accName && tx.to !== accName),
      );
    }
    setAccounts((prev) => prev.filter((a) => a !== accName));
  }

  function addTransaction(from: string, to: string, amount: number) {
    if (from === to) return alert(t("alertSame"));
    if (!amount || amount <= 0) return alert(t("alertAmt"));
    setTransactions((prev) => [
      ...prev,
      { id: nextTxId.current++, from, to, amount },
    ]);
  }

  function deleteTransaction(id: number) {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }

  function clearAllTx() {
    setTransactions([]);
  }

  return (
    <>
      <header>
        <h1>{t("title")}</h1>
        <p>{t("subtitle")}</p>
      </header>
      <div className="top-bar">
        <button
          className="btn btn-outline"
          style={{ fontSize: "0.85rem" }}
          onClick={resetDefaultExample}
        >
          {t("resetBtn")}
        </button>
      </div>

      <div className="grid-layout">
        <AccountManager
          accounts={accounts}
          onAddAccount={addAccount}
          onRemoveAccount={removeAccount}
        />
        <TransactionForm
          accounts={accounts}
          transactions={transactions}
          onAddTransaction={addTransaction}
          onDeleteTransaction={deleteTransaction}
          onClearAll={clearAllTx}
        />
        <NetBalanceTable rows={netRows} />
        <OptimizedResult
          transfers={transfers}
          originalCount={transactions.length}
        />
      </div>
    </>
  );
}
