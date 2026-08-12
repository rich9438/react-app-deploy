import { useLang } from "../../context/LangContext";
import type { Expense } from "../../types";
import { calcMethodLabel } from "../../lib/split";
import { downloadCsv } from "../../lib/csv";

interface Props {
  expenses: Expense[];
  familyMembers: string[];
  onDeleteExpense: (id: number) => void;
}

export default function ExpenseTable({
  expenses,
  familyMembers,
  onDeleteExpense,
}: Props) {
  const { t, pack } = useLang();

  const purposeText = (idx: number) => pack.purposes[idx] ?? "";
  const sorted = [...expenses].sort((a, b) => a.account.localeCompare(b.account));
  const colspan = 7 + familyMembers.length;

  const membersTotal = (e: Expense) =>
    Object.values(e.shares).reduce((sum, v) => sum + v, 0);

  function exportCsv() {
    const header = [
      t("thAccName"),
      t("thPurpose"),
      t("thNote"),
      t("thCalcMethod"),
      t("thRealCost"),
      ...familyMembers,
      t("thMemberCost"),
    ];
    const rows: (string | number)[][] = [header];
    sorted.forEach((e) => {
      rows.push([
        e.account,
        purposeText(e.purposeIdx),
        e.note || "",
        calcMethodLabel(e.roundMode, e.splitMode, pack),
        e.amount,
        ...familyMembers.map((m) =>
          e.shares[m] !== undefined ? e.shares[m] : "",
        ),
        membersTotal(e),
      ]);
    });
    downloadCsv("expense_details.csv", rows);
  }

  return (
    <div className="card">
      <div className="card-title">
        <span>{t("famSection2")}</span>
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
              <th>{t("thPurpose")}</th>
              <th>{t("thNote")}</th>
              <th>{t("thCalcMethod")}</th>
              <th>{t("thRealCost")}</th>
              {familyMembers.map((m) => (
                <th key={m}>{m}</th>
              ))}
              <th>{t("thMemberCost")}</th>
              <th>{t("thAction")}</th>
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
              sorted.map((e) => (
                <tr key={e.id}>
                  <td>
                    <strong>{e.account}</strong>
                  </td>
                  <td>{purposeText(e.purposeIdx)}</td>
                  <td
                    style={{
                      whiteSpace: "normal",
                      maxWidth: 180,
                      color: "var(--text-muted)",
                    }}
                  >
                    {e.note ? e.note : "–"}
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{ background: "#f1f5f9", color: "#475569" }}
                    >
                      {calcMethodLabel(e.roundMode, e.splitMode, pack)}
                    </span>
                  </td>
                  <td className="amount">${e.amount.toLocaleString()}</td>
                  {familyMembers.map((m) =>
                    e.shares[m] !== undefined ? (
                      <td key={m} className="amount amount-pos">
                        ${e.shares[m].toLocaleString()}
                      </td>
                    ) : (
                      <td
                        key={m}
                        className="amount-zero"
                        style={{ textAlign: "center" }}
                      >
                        –
                      </td>
                    ),
                  )}
                  <td className="amount" style={{ fontWeight: "bold" }}>
                    ${membersTotal(e).toLocaleString()}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      style={{ padding: "2px 8px", fontSize: "0.8rem" }}
                      onClick={() => onDeleteExpense(e.id)}
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
    </div>
  );
}
