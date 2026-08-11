import { useState } from "react";
import { useLang } from "../../context/LangContext";
import type { Transaction } from "../../types";

interface Props {
  accounts: string[];
  transactions: Transaction[];
  onAddTransaction: (from: string, to: string, amount: number) => void;
  onDeleteTransaction: (id: number) => void;
  onClearAll: () => void;
}

export default function TransactionForm({
  accounts,
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  onClearAll,
}: Props) {
  const { t } = useLang();
  const [from, setFrom] = useState(accounts[0]);
  const [to, setTo] = useState(accounts[1] ?? accounts[0]);
  const [amount, setAmount] = useState("");

  // Selection may point at a since-deleted account; fall back to a valid one.
  const fromVal = accounts.includes(from) ? from : accounts[0];
  const toVal = accounts.includes(to) ? to : (accounts[1] ?? accounts[0]);

  function handleAdd() {
    onAddTransaction(fromVal, toVal, parseFloat(amount));
    setAmount("");
  }

  return (
    <div className="card">
      <div className="card-title">{t("txSection")}</div>
      <div className="action-bar">
        <button className="btn btn-danger" onClick={onClearAll}>
          {t("clearAllTx")}
        </button>
      </div>
      <div className="form-row">
        <div>
          <label className="field-label">{t("fromLabel")}</label>
          <select
            style={{ width: "100%" }}
            value={fromVal}
            onChange={(e) => setFrom(e.target.value)}
          >
            {accounts.map((acc) => (
              <option key={acc} value={acc}>
                {acc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label">{t("toLabel")}</label>
          <select
            style={{ width: "100%" }}
            value={toVal}
            onChange={(e) => setTo(e.target.value)}
          >
            {accounts.map((acc) => (
              <option key={acc} value={acc}>
                {acc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label">{t("amountLabel")}</label>
          <input
            type="number"
            placeholder="e.g. 1000"
            min={1}
            style={{ width: "100%" }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div style={{ alignSelf: "flex-end" }}>
          <button className="btn" style={{ width: "100%" }} onClick={handleAdd}>
            {t("addTxBtn")}
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>{t("thFrom")}</th>
            <th>{t("thTo")}</th>
            <th>{t("thAmount")}</th>
            <th style={{ width: 80 }}>{t("thAction")}</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={4} className="empty-state">
                {t("emptyTx")}
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.id}>
                <td>
                  <strong>{tx.from}</strong>
                </td>
                <td>
                  <strong>{tx.to}</strong>
                </td>
                <td className="amount">${tx.amount.toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    style={{ padding: "2px 8px", fontSize: "0.8rem" }}
                    onClick={() => onDeleteTransaction(tx.id)}
                  >
                    {t("delBtn")}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
