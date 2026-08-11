import { useState } from "react";
import { useLang } from "../../context/LangContext";

interface Props {
  accounts: string[];
  onAddAccount: (name: string) => void;
  onRemoveAccount: (name: string) => void;
}

export default function AccountManager({
  accounts,
  onAddAccount,
  onRemoveAccount,
}: Props) {
  const { t } = useLang();
  const [name, setName] = useState("");

  function handleAdd() {
    onAddAccount(name.trim());
    setName("");
  }

  return (
    <div className="card">
      <div className="card-title">
        <span>{t("accSection")}</span>
      </div>
      <div className="account-tags">
        {accounts.map((acc) => (
          <div className="tag" key={acc}>
            {acc}{" "}
            <button
              className="remove-btn"
              onClick={() => onRemoveAccount(acc)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder={t("accPlaceholder")}
          style={{ flex: 1 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button className="btn" onClick={handleAdd}>
          {t("addAccBtn")}
        </button>
      </div>
    </div>
  );
}
