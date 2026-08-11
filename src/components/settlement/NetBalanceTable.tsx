import { useLang } from "../../context/LangContext";
import type { NetRow } from "../../types";

export default function NetBalanceTable({ rows }: { rows: NetRow[] }) {
  const { t } = useLang();

  return (
    <div className="card">
      <div className="card-title">{t("netSection")}</div>
      <table>
        <thead>
          <tr>
            <th>{t("thAccName")}</th>
            <th>{t("thIn")}</th>
            <th>{t("thOut")}</th>
            <th>{t("thNet")}</th>
            <th>{t("thStatus")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ acc, totalIn, totalOut, net }) => {
            let netClass = "amount-zero";
            let status = (
              <span style={{ color: "#64748b" }}>{t("statusBal")}</span>
            );
            if (net > 0) {
              netClass = "amount-pos";
              status = (
                <span style={{ color: "#16a34a", fontWeight: "bold" }}>
                  {t("statusRec")}
                </span>
              );
            } else if (net < 0) {
              netClass = "amount-neg";
              status = (
                <span style={{ color: "#dc2626", fontWeight: "bold" }}>
                  {t("statusPay")}
                </span>
              );
            }
            return (
              <tr key={acc}>
                <td>
                  <strong>{acc}</strong>
                </td>
                <td className="amount">${totalIn.toLocaleString()}</td>
                <td className="amount">${totalOut.toLocaleString()}</td>
                <td className={"amount " + netClass}>
                  {net > 0 ? "+" : ""}${net.toLocaleString()}
                </td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
