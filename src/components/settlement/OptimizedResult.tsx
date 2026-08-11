import { useLang } from "../../context/LangContext";
import type { Transfer } from "../../types";

interface Props {
  transfers: Transfer[];
  originalCount: number;
}

export default function OptimizedResult({ transfers, originalCount }: Props) {
  const { t } = useLang();

  const stats =
    originalCount > 0
      ? t("statsText")
          .replace("{0}", String(originalCount))
          .replace("{1}", String(transfers.length))
      : "";

  return (
    <div className="card">
      <div className="card-title">
        <span>{t("optSection")}</span>
        <span
          className="badge"
          style={{ background: "#dcfce7", color: "#15803d" }}
        >
          {stats}
        </span>
      </div>
      <div>
        {transfers.length === 0 ? (
          <div className="empty-state">{t("emptyOpt")}</div>
        ) : (
          transfers.map((tx, idx) => (
            <div className="settlement-item" key={idx}>
              <div>
                <span style={{ fontWeight: "bold", color: "#dc2626" }}>
                  [{tx.from}]
                </span>
                <span className="arrow">{t("arrowTxt")}</span>
                <span style={{ fontWeight: "bold", color: "#16a34a" }}>
                  [{tx.to}]
                </span>
              </div>
              <div
                className="amount"
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "#1e293b",
                }}
              >
                ${tx.amount.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
