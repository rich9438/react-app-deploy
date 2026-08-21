import { useMemo, useState } from "react";
import { useLang } from "../../context/LangContext";
import type { Expense, RoundMode, SplitMode } from "../../types";
import { computeShares, roundUp } from "../../lib/split";

interface Props {
  familyMembers: string[];
  expenseAccounts: string[];
  selectedMembers: Set<string>;
  onToggleMember: (name: string, checked: boolean) => void;
  onAddExpense: (expense: Omit<Expense, "id">) => void;
}

export default function ExpenseForm({
  familyMembers,
  expenseAccounts,
  selectedMembers,
  onToggleMember,
  onAddExpense,
}: Props) {
  const { t, pack } = useLang();

  const [purposeIdx, setPurposeIdx] = useState(0);
  const [note, setNote] = useState("");
  const [account, setAccount] = useState(expenseAccounts[0]);
  const [amount, setAmount] = useState("");
  const [roundMode, setRoundMode] = useState<RoundMode>("zero");
  const [splitMode, setSplitMode] = useState<SplitMode>("average");
  // Raw string values keyed by member (manual split).
  const [manualMap, setManualMap] = useState<Record<string, string>>({});

  // Selection / account may reference removed entries; keep them valid.
  const members = familyMembers.filter((m) => selectedMembers.has(m));
  const accountVal = expenseAccounts.includes(account)
    ? account
    : expenseAccounts[0];

  function manualNumbers(): Record<string, number> {
    const map: Record<string, number> = {};
    for (const m of members) map[m] = parseFloat(manualMap[m]);
    return map;
  }

  // Live preview (mirrors updatePreview()).
  const preview = useMemo(() => {
    const amt = parseFloat(amount);
    if (!members.length || isNaN(amt) || amt < 0) return null;
    const { shares, ok } = computeShares(
      amt,
      members,
      roundMode,
      splitMode,
      manualNumbers(),
    );
    if (!ok || !shares) return null;
    const total = members.reduce((sum, m) => sum + shares[m], 0);
    return { shares, total };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, members.join(","), roundMode, splitMode, JSON.stringify(manualMap)]);

  // Hint for the manual inputs: what each member would pay in "average" mode.
  const avgPlaceholder = useMemo(() => {
    const amt = parseFloat(amount);
    if (!members.length || isNaN(amt) || amt < 0) return "";
    if (roundMode === "zero")
      return String(Math.round(amt / members.length));

    const unit = roundMode === "hundred" ? 100 : 10;
    return String(roundUp(amt / members.length, unit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, members.join(","), roundMode]);

  function handleAdd() {
    if (!members.length) return alert(t("alertNoMemberSel"));
    if (!accountVal) return alert(t("alertNoAccountSel"));
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt < 0) return alert(t("alertBadAmount"));

    const { shares, ok } = computeShares(
      amt,
      members,
      roundMode,
      splitMode,
      manualNumbers(),
    );
    if (!ok || !shares) return alert(t("alertBadManual"));

    onAddExpense({
      members: [...members],
      account: accountVal,
      amount: amt,
      roundMode,
      splitMode,
      purposeIdx,
      note: note.trim(),
      shares,
    });

    // Reset amount & note for the next entry (manual values are kept).
    setAmount("");
    setNote("");
  }

  return (
    <div className="card">
      <div className="card-title" style={{ fontSize: "1rem", border: "none" }}>
        <span>{t("entryTitle")}</span>
      </div>
      <div className="entry-grid" style={{ marginTop: 12 }}>
        {/* Purpose */}
        <div className="field">
          <label className="field-label">{t("purposeLabel")}</label>
          <select
            style={{ width: "100%" }}
            value={purposeIdx}
            onChange={(e) => setPurposeIdx(Number(e.target.value))}
          >
            {pack.purposes.map((p, idx) => (
              <option key={idx} value={idx}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Note */}
        <div className="field">
          <label className="field-label">{t("noteLabel")}</label>
          <input
            type="text"
            placeholder={t("notePh")}
            style={{ width: "100%" }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Account */}
        <div className="field">
          <label className="field-label">{t("selAccountLabel")}</label>
          <select
            style={{ width: "100%" }}
            value={accountVal}
            onChange={(e) => setAccount(e.target.value)}
          >
            {expenseAccounts.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="field">
          <label className="field-label">{t("expAmountLabel")}</label>
          <input
            type="number"
            min={0}
            placeholder="e.g. 1000"
            style={{ width: "100%" }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Rounding */}
        <div className="field">
          <label className="field-label">{t("roundLabel")}</label>
          <select
            style={{ width: "100%" }}
            value={roundMode}
            onChange={(e) => setRoundMode(e.target.value as RoundMode)}
          >
            <option value="zero">{t("roundZero")}</option>
            <option value="ten">{t("roundTen")}</option>
            <option value="hundred">{t("roundHundred")}</option>
          </select>
        </div>

        {/* Split */}
        <div className="field">
          <label className="field-label">{t("splitLabel")}</label>
          <select
            style={{ width: "100%" }}
            value={splitMode}
            onChange={(e) => setSplitMode(e.target.value as SplitMode)}
          >
            <option value="average">{t("splitAverage")}</option>
            <option value="manual">{t("splitManual")}</option>
          </select>
        </div>

        {/* Participating members */}
        <div className="field">
          <label className="field-label">{t("selMembersLabel")}</label>
          <div className="checkbox-grid">
            {familyMembers.map((m) => {
              const checked = selectedMembers.has(m);
              return (
                <label
                  key={m}
                  className={"checkbox-chip" + (checked ? " checked" : "")}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onToggleMember(m, e.target.checked)}
                  />{" "}
                  {m}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Manual per-member inputs */}
      {splitMode === "manual" && (
        <div className="field" style={{ marginTop: 8 }}>
          <label className="field-label">{t("manualLabel")}</label>
          <div className="manual-inputs">
            {members.map((m) => (
              <div className="m-item" key={m}>
                <span>{m}</span>
                    <input
                        type="number"
                        min={0}
                        placeholder={avgPlaceholder}
                        value={manualMap[m] ?? ""}
                        onChange={(e) =>
                          setManualMap((prev) => ({ ...prev, [m]: e.target.value }))
                        }
                  />

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="preview-box">
          <div className="pv-title">{t("previewLabel")}</div>
          <div className="pv-list">
            {members.map((m) => (
              <span key={m}>
                {m}: ${preview.shares[m].toLocaleString()}
              </span>
            ))}
            <span style={{ background: "#dbeafe" }}>
              {t("totalRow")}: ${preview.total.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <div style={{ marginTop: 16, textAlign: "right" }}>
        <button className="btn btn-success" onClick={handleAdd}>
          {t("addExpenseBtn")}
        </button>
      </div>
    </div>
  );
}
