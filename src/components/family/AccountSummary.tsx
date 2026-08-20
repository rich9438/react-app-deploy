import { useMemo } from "react";
import { useLang } from "../../context/LangContext";
import type { Expense } from "../../types";
import { downloadCsv } from "../../lib/csv";

interface Props {
  expenses: Expense[];
  familyMembers: string[];
  expenseAccounts: string[];
}

function hasAnyShare(obj: Record<string, number>): boolean {
  return Object.values(obj).some((v) => v > 0);
}

export default function AccountSummary({
  expenses,
  familyMembers,
  expenseAccounts,
}: Props) {
  const { t } = useLang();

  // Aggregate real total + per-member totals for each account.
  const agg = useMemo(() => {
    const realTotal: Record<string, number> = {};
    const memberTotal: Record<string, Record<string, number>> = {};
    expenseAccounts.forEach((a) => {
      realTotal[a] = 0;
      memberTotal[a] = {};
      familyMembers.forEach((m) => (memberTotal[a][m] = 0));
    });

    expenses.forEach((e) => {
      if (realTotal[e.account] === undefined) {
        realTotal[e.account] = 0;
        memberTotal[e.account] = {};
        familyMembers.forEach((m) => (memberTotal[e.account][m] = 0));
      }
      realTotal[e.account] += e.amount;
      Object.keys(e.shares).forEach((m) => {
        if (memberTotal[e.account][m] === undefined)
          memberTotal[e.account][m] = 0;
        memberTotal[e.account][m] += e.shares[m];
      });
    });

    return { realTotal, memberTotal };
  }, [expenses, familyMembers, expenseAccounts]);

  const colspan = 2 + familyMembers.length;

  // Rows to display (accounts with any activity), plus grand totals.
  const visibleAccounts = expenseAccounts.filter(
    (a) => !(agg.realTotal[a] === 0 && !hasAnyShare(agg.memberTotal[a])),
  );
  let grandReal = 0;
  const grandMember: Record<string, number> = {};
  familyMembers.forEach((m) => (grandMember[m] = 0));
  visibleAccounts.forEach((a) => {
    grandReal += agg.realTotal[a];
    familyMembers.forEach((m) => (grandMember[m] += agg.memberTotal[a][m] || 0));
  });

  function exportCsv() {
    const header = [t("thAccName"), t("thRealTotal"), ...familyMembers];
    const rows: (string | number)[][] = [header];
    visibleAccounts.forEach((a) => {
      rows.push([
        a,
        agg.realTotal[a],
        ...familyMembers.map((m) => agg.memberTotal[a][m] || 0),
      ]);
    });
    rows.push([
      t("totalRow"),
      grandReal,
      ...familyMembers.map((m) => grandMember[m]),
    ]);
    downloadCsv("account_summary.csv", rows);
  }

  return (
    <div className="card">
      <div className="card-title">
        <span>{t("famSection3")}</span>
        <button
          className="btn btn-outline"
          style={{ fontSize: "0.8rem" }}
          onClick={exportCsv}
        >
          {t("exportCsvBtn")}
        </button>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{t("thAccName")}</th>
              <th>{t("thRealTotal")}</th>
              {familyMembers.map((m) => (
                <th key={m}>{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={colspan} className="empty-state">
                  {t("emptyExpense")}
                </td>
              </tr>
            ) : (
              <>
                {visibleAccounts.map((a) => (
                  <tr key={a}>
                    <td>
                      <strong>{a}</strong>
                    </td>
                    <td className="amount">
                      ${agg.realTotal[a].toLocaleString()}
                    </td>
                    {familyMembers.map((m) => {
                      const v = agg.memberTotal[a][m] || 0;
                      return (
                        <td
                          key={m}
                          className={
                            "amount " + (v > 0 ? "amount-pos" : "amount-zero")
                          }
                        >
                          ${v.toLocaleString()}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr style={{ background: "#f8fafc", fontWeight: "bold" }}>
                  <td>{t("totalRow")}</td>
                  <td className="amount">${grandReal.toLocaleString()}</td>
                  {familyMembers.map((m) => (
                    <td key={m} className="amount amount-pos">
                      ${grandMember[m].toLocaleString()}
                    </td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
