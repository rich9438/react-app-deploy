import { useRef, useState } from "react";
import { useLang } from "../../context/LangContext";
import { i18n } from "../../i18n";
import type { Expense } from "../../types";
import SetupCard from "./SetupCard";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import AccountSummary from "./AccountSummary";

export default function FamilyView() {
  const { t, pack } = useLang();

  const [familyMembers, setFamilyMembers] = useState<string[]>([
    ...i18n.en.defaultMembers,
  ]);
  const [expenseAccounts, setExpenseAccounts] = useState<string[]>([
    ...i18n.en.defaultExpAccounts,
  ]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
    () => new Set(i18n.en.defaultMembers),
  );
  const nextExpenseId = useRef(1);

  function resetFamilyDefaults() {
    const members = [...pack.defaultMembers];
    setFamilyMembers(members);
    setExpenseAccounts([...pack.defaultExpAccounts]);
    setExpenses([]);
    setSelectedMembers(new Set(members));
    nextExpenseId.current = 1;
  }

  /* ---- Members ---- */
  function addMember(name: string) {
    if (!name) return alert(t("alertMemberName"));
    if (familyMembers.includes(name)) return alert(t("alertMemberExist"));
    setFamilyMembers((prev) => [...prev, name]);
    setSelectedMembers((prev) => new Set(prev).add(name));
  }

  function removeMember(name: string) {
    if (familyMembers.length <= 1) return alert(t("alertMinMember"));
    setFamilyMembers((prev) => prev.filter((m) => m !== name));
    setSelectedMembers((prev) => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  }

  function toggleMember(name: string, checked: boolean) {
    setSelectedMembers((prev) => {
      const next = new Set(prev);
      if (checked) next.add(name);
      else next.delete(name);
      return next;
    });
  }

  /* ---- Expense accounts ---- */
  function addExpAccount(name: string) {
    if (!name) return alert(t("alertExpAccName"));
    if (expenseAccounts.includes(name)) return alert(t("alertExpAccExist"));
    setExpenseAccounts((prev) => [...prev, name]);
  }

  function removeExpAccount(name: string) {
    if (expenseAccounts.length <= 1) return alert(t("alertMinExpAcc"));
    setExpenseAccounts((prev) => prev.filter((a) => a !== name));
  }

  /* ---- Expenses ---- */
  function addExpense(expense: Omit<Expense, "id">) {
    setExpenses((prev) => [...prev, { ...expense, id: nextExpenseId.current++ }]);
  }

  function deleteExpense(id: number) {
    if (!confirm(t("confirmDelExpense"))) return;
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <>
      <header>
        <h1>{t("famTitle")}</h1>
        <p>{t("famSubtitle")}</p>
      </header>
      <div className="top-bar">
        <button
          className="btn btn-outline"
          style={{ fontSize: "0.8rem" }}
          onClick={resetFamilyDefaults}
        >
          {t("resetFamilyBtn")}
        </button>
      </div>

      <div className="grid-layout">
        <SetupCard
          familyMembers={familyMembers}
          expenseAccounts={expenseAccounts}
          onAddMember={addMember}
          onRemoveMember={removeMember}
          onAddExpAccount={addExpAccount}
          onRemoveExpAccount={removeExpAccount}
        />
        <ExpenseForm
          familyMembers={familyMembers}
          expenseAccounts={expenseAccounts}
          selectedMembers={selectedMembers}
          onToggleMember={toggleMember}
          onAddExpense={addExpense}
        />
        <ExpenseTable
          expenses={expenses}
          familyMembers={familyMembers}
          onDeleteExpense={deleteExpense}
        />
        <AccountSummary
          expenses={expenses}
          familyMembers={familyMembers}
          expenseAccounts={expenseAccounts}
        />
      </div>
    </>
  );
}
