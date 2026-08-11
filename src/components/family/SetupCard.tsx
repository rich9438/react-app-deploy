import { useState } from "react";
import { useLang } from "../../context/LangContext";

interface Props {
  familyMembers: string[];
  expenseAccounts: string[];
  onAddMember: (name: string) => void;
  onRemoveMember: (name: string) => void;
  onAddExpAccount: (name: string) => void;
  onRemoveExpAccount: (name: string) => void;
}

export default function SetupCard({
  familyMembers,
  expenseAccounts,
  onAddMember,
  onRemoveMember,
  onAddExpAccount,
  onRemoveExpAccount,
}: Props) {
  const { t } = useLang();
  const [memberName, setMemberName] = useState("");
  const [accountName, setAccountName] = useState("");

  function addMember() {
    onAddMember(memberName.trim());
    setMemberName("");
  }
  function addAccount() {
    onAddExpAccount(accountName.trim());
    setAccountName("");
  }

  return (
    <div className="card">
      <div className="card-title">
        <span>{t("setupSection")}</span>
      </div>

      {/* Members */}
      <label className="field-label">{t("memberLabel")}</label>
      <div className="account-tags">
        {familyMembers.map((m) => (
          <div className="tag member" key={m}>
            {m}{" "}
            <button className="remove-btn" onClick={() => onRemoveMember(m)}>
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="input-group" style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder={t("addMemberPh")}
          style={{ flex: 1 }}
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addMember()}
        />
        <button className="btn" onClick={addMember}>
          {t("addMemberBtn")}
        </button>
      </div>

      {/* Expense accounts */}
      <label className="field-label">{t("expAccLabel")}</label>
      <div className="account-tags">
        {expenseAccounts.map((a) => (
          <div className="tag" key={a}>
            {a}{" "}
            <button className="remove-btn" onClick={() => onRemoveExpAccount(a)}>
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder={t("addExpAccPh")}
          style={{ flex: 1 }}
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addAccount()}
        />
        <button className="btn" onClick={addAccount}>
          {t("addExpAccBtn")}
        </button>
      </div>
    </div>
  );
}
