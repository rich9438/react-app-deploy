import type { Lang } from "./types";

/**
 * A full set of translated strings for one language.
 * Most values are plain strings; a handful are string arrays used to seed
 * defaults (accounts, members, purposes...).
 */
export interface LangPack {
  langBtn: string;
  navTitle: string;
  navSettlement: string;
  navFamily: string;
  title: string;
  subtitle: string;
  accSection: string;
  resetBtn: string;
  accPlaceholder: string;
  addAccBtn: string;
  txSection: string;
  clearAllTx: string;
  fromLabel: string;
  toLabel: string;
  amountLabel: string;
  addTxBtn: string;
  thFrom: string;
  thTo: string;
  thAmount: string;
  thAction: string;
  emptyTx: string;
  netSection: string;
  thAccName: string;
  thIn: string;
  thOut: string;
  thNet: string;
  thStatus: string;
  optSection: string;
  statsText: string;
  emptyOpt: string;
  statusBal: string;
  statusRec: string;
  statusPay: string;
  delBtn: string;
  arrowTxt: string;
  alertNoName: string;
  alertExist: string;
  alertMin: string;
  alertInUse: string;
  alertSame: string;
  alertAmt: string;
  defaultAccs: string[];
  /* ---- Family view ---- */
  famTitle: string;
  famSubtitle: string;
  setupSection: string;
  resetFamilyBtn: string;
  memberLabel: string;
  addMemberPh: string;
  addMemberBtn: string;
  expAccLabel: string;
  addExpAccPh: string;
  addExpAccBtn: string;
  entryTitle: string;
  selMembersLabel: string;
  selAccountLabel: string;
  expAmountLabel: string;
  roundLabel: string;
  roundZero: string;
  roundTen: string;
  roundHundred: string;
  roundZeroShort: string;
  roundHundredShort: string;
  roundTenShort: string;
  splitLabel: string;
  splitAverage: string;
  splitManual: string;
  purposeLabel: string;
  noteLabel: string;
  notePh: string;
  manualLabel: string;
  previewLabel: string;
  addExpenseBtn: string;
  famSection2: string;
  famSection3: string;
  exportCsvBtn: string;
  thPurpose: string;
  thNote: string;
  thCalcMethod: string;
  thRealCost: string;
  thMemberCost: string;
  thRealTotal: string;
  thMemberTotal: string;
  emptyExpense: string;
  purposes: string[];
  defaultMembers: string[];
  defaultExpAccounts: string[];
  alertMemberName: string;
  alertMemberExist: string;
  alertMinMember: string;
  alertExpAccName: string;
  alertExpAccExist: string;
  alertMinExpAcc: string;
  alertNoMemberSel: string;
  alertNoAccountSel: string;
  alertBadAmount: string;
  alertBadManual: string;
  confirmDelExpense: string;
  totalRow: string;
}

/** Keys whose value is a plain string — the ones `t()` can return. */
export type StringKey = {
  [K in keyof LangPack]: LangPack[K] extends string ? K : never;
}[keyof LangPack];

export const i18n: Record<Lang, LangPack> = {
  en: {
    langBtn: "中文",
    navTitle: "Menu",
    navSettlement: "Multi-Account Settlement",
    navFamily: "Family Expense Tracker",
    title: "Multi-Account Settlement",
    subtitle:
      "Customize accounts, input cross-account transfers, and auto-calculate minimized settlement transfers.",
    accSection: "1. Account Management",
    resetBtn: "Reset Default",
    accPlaceholder: "Enter new account name",
    addAccBtn: "Add Account",
    txSection: "2. Add Transaction",
    clearAllTx: "Click to clear all",
    fromLabel: "From (Payer)",
    toLabel: "To (Payee)",
    amountLabel: "Amount ($)",
    addTxBtn: "Add Transaction",
    thFrom: "From",
    thTo: "To",
    thAmount: "Amount",
    thAction: "Action",
    emptyTx: "No transactions yet. Please add one above.",
    netSection: "3. Net Balance Calculation",
    thAccName: "Account Name",
    thIn: "Total In (+)",
    thOut: "Total Out (-)",
    thNet: "Net Balance",
    thStatus: "Status",
    optSection: "4. Optimized Settlement (Minimal Transfers)",
    statsText: "Reduced from {0} to {1} transfers",
    emptyOpt: "All accounts are balanced! No transfers needed.",
    statusBal: "Balanced",
    statusRec: "Receive (+)",
    statusPay: "Pay (-)",
    delBtn: "Delete",
    arrowTxt: " transfers to ➔ ",
    alertNoName: "Please enter an account name",
    alertExist: "Account already exists",
    alertMin: "Must keep at least 2 accounts",
    alertInUse:
      "Account '{0}' is in use. Deleting it will remove related transactions. Continue?",
    alertSame: "From and To accounts cannot be the same",
    alertAmt: "Please enter a valid amount",
    defaultAccs: ["Rich", "Judy", "Bruce", "現金", "台新狗卡", "第一熊卡", "遠東樂卡", "富邦好事多卡", "第一宜蘭卡", "中國信託lala卡", "富綁J卡"],
    /* ---- Family view ---- */
    famTitle: "Family Expense & Split Tracker",
    famSubtitle:
      "Record each expense, split it among family members, and view per-account totals.",
    setupSection: "1. Setup member / expense accounts",
    resetFamilyBtn: "Restore Defaults",
    memberLabel: "Family Members",
    addMemberPh: "Add a family member",
    addMemberBtn: "Add Member",
    expAccLabel: "Expense Accounts",
    addExpAccPh: "Add an expense account",
    addExpAccBtn: "Add Account",
    entryTitle: "2. Add an Expense",
    selMembersLabel: "Participating members (multi-select)",
    selAccountLabel: "Expense account (single)",
    expAmountLabel: "Amount",
    roundLabel: "Rounding",
    roundZero: "No Round up",
    roundTen: "Round up to 10",
    roundHundred: "Round up to 100",
    roundZeroShort: "No Round",
    roundHundredShort: "Round 100",
    roundTenShort: "Round 10",
    splitLabel: "Split",
    splitAverage: "Average",
    splitManual: "Manual",
    purposeLabel: "Purpose",
    noteLabel: "Note (optional)",
    notePh: "Optional note",
    manualLabel: "Each member's amount",
    previewLabel: "Preview",
    addExpenseBtn: "Add this expense",
    famSection2: "3. Expense Details",
    famSection3: "4. Account Summary",
    exportCsvBtn: "Export CSV",
    thPurpose: "Purpose",
    thNote: "Note",
    thCalcMethod: "Calc. Method",
    thRealCost: "Real Cost",
    thMemberCost: "All Member Expense",
    thRealTotal: "Real Total",
    thMemberTotal: "Member Total",
    emptyExpense: "No expenses yet. Add one on the left.",
    purposes: [
      "Dining",
      "Transport",
      "Entertainment",
      "Groceries",
      "Medical",
      "Travel",
      "Marketing - Vegetable",
      "Gasoline",
      "Children",
      "Other"
    ],
    defaultMembers: ["Rich", "Judy", "Bruce", "Family"],
    defaultExpAccounts: ["Rich", "Judy", "Bruce", "現金", "台新狗卡", "第一熊卡", "遠東樂卡", "富邦好事多卡", "第一宜蘭卡", "中國信託lala卡", "富綁J卡"],
    alertMemberName: "Please enter a member name",
    alertMemberExist: "Member already exists",
    alertMinMember: "Keep at least 1 member",
    alertExpAccName: "Please enter an account name",
    alertExpAccExist: "Account already exists",
    alertMinExpAcc: "Keep at least 1 account",
    alertNoMemberSel: "Please select at least one member",
    alertNoAccountSel: "Please select an expense account",
    alertBadAmount: "Please enter a valid amount",
    alertBadManual: "Please enter a valid amount for every member",
    confirmDelExpense: "Delete this expense?",
    totalRow: "TOTAL",
  },
  zh: {
    langBtn: "English",
    navTitle: "選單",
    navSettlement: "多帳戶對沖結算",
    navFamily: "家庭記帳統計",
    title: "家庭多帳戶對沖結算",
    subtitle:
      "自由自訂帳戶，輸入原始跨戶應補金額，自動計算最少轉帳次數對沖方案",
    accSection: "1. 帳戶管理（自訂新增/刪除）",
    resetBtn: "恢復預設",
    accPlaceholder: "輸入新帳戶名稱",
    addAccBtn: "新增帳戶",
    txSection: "2. 新增應對沖交易項目",
    clearAllTx: "一鍵清除所有交易",
    fromLabel: "轉出帳戶 (應付)",
    toLabel: "轉入帳戶 (應收)",
    amountLabel: "金額 ($)",
    addTxBtn: "加入項目",
    thFrom: "轉出帳戶（誰付）",
    thTo: "轉入帳戶（誰收）",
    thAmount: "金額",
    thAction: "操作",
    emptyTx: "尚無交易項目，請於上方新增",
    netSection: "3. 各帳戶最終「應收 / 應付」淨額試算",
    thAccName: "帳戶名稱",
    thIn: "應收總額 (+)",
    thOut: "應付總額 (-)",
    thNet: "最終淨結算額 (Net)",
    thStatus: "結算狀態",
    optSection: "4. 最佳簡化找補方案（最少轉帳次數）",
    statsText: "從原始 {0} 筆轉帳 簡化為 {1} 筆轉帳",
    emptyOpt: "目前所有帳戶收支均已完全平衡，無需進行任何轉帳！",
    statusBal: "平衡 (免動作)",
    statusRec: "應收錢 (+)",
    statusPay: "應付錢 (-)",
    delBtn: "刪除",
    arrowTxt: " 轉給 ➔ ",
    alertNoName: "請輸入帳戶名稱",
    alertExist: "該帳戶已存在",
    alertMin: "最少需保留兩個帳戶",
    alertInUse:
      "帳戶「{0}」目前有參與交易，刪除該帳戶同時會清除相關交易，確定刪除？",
    alertSame: "轉出與轉入帳戶不能相同",
    alertAmt: "請輸入有效的轉帳金額",
    defaultAccs: ["Rich", "Judy", "Bruce", "現金", "台新狗卡", "第一熊卡", "遠東樂卡", "富邦好事多卡", "第一宜蘭卡", "中國信託lala卡", "富綁J卡"],
    /* ---- Family view ---- */
    famTitle: "家庭記帳與花費統計",
    famSubtitle:
      "逐筆記錄每項支出，於家庭成員間分攤，並統計各帳號的花費與應收金額。",
    setupSection: "1. 成員 / 支出帳號設定",
    resetFamilyBtn: "恢復預設",
    memberLabel: "家庭成員",
    addMemberPh: "新增家庭成員",
    addMemberBtn: "新增成員",
    expAccLabel: "支出帳號",
    addExpAccPh: "新增支出帳號",
    addExpAccBtn: "新增帳號",
    entryTitle: "2. 新增一筆支出",
    selMembersLabel: "參與成員（可多選）",
    selAccountLabel: "支出帳號（僅單選）",
    expAmountLabel: "金額",
    roundLabel: "進位方式",
    roundZero: "不進位",
    roundTen: "進位到十位數",
    roundHundred: "進位到百位數",
    roundZeroShort: "不進位",
    roundHundredShort: "進百位",
    roundTenShort: "進十位",
    splitLabel: "分攤方式",
    splitAverage: "平均",
    splitManual: "手動輸入",
    purposeLabel: "用途",
    noteLabel: "備註（選填）",
    notePh: "選填備註",
    manualLabel: "各成員負擔金額",
    previewLabel: "試算預覽",
    addExpenseBtn: "加入這筆支出",
    famSection2: "3. 各筆支出明細",
    famSection3: "4. 各帳號統計總表",
    exportCsvBtn: "匯出 CSV",
    thPurpose: "用途",
    thNote: "備註",
    thCalcMethod: "計算方式",
    thRealCost: "真實花費",
    thMemberCost: "成員總花費",
    thRealTotal: "真實總花費",
    thMemberTotal: "成員花費總額",
    emptyExpense: "尚無支出紀錄，請於左側新增。",
    purposes: ["餐飲", "交通", "娛樂", "日常用品", "醫療", "旅遊", "買菜", "加油", "育兒", "其他"],
    defaultMembers: ["Rich", "Judy", "Bruce", "Family"],
    defaultExpAccounts: ["Rich", "Judy", "Bruce", "現金", "台新狗卡", "第一熊卡", "遠東樂卡", "富邦好事多卡", "第一宜蘭卡", "中國信託lala卡", "富綁J卡"],
    alertMemberName: "請輸入成員名稱",
    alertMemberExist: "該成員已存在",
    alertMinMember: "最少需保留一位成員",
    alertExpAccName: "請輸入帳號名稱",
    alertExpAccExist: "該帳號已存在",
    alertMinExpAcc: "最少需保留一個帳號",
    alertNoMemberSel: "請至少選擇一位參與成員",
    alertNoAccountSel: "請選擇支出帳號",
    alertBadAmount: "請輸入有效的金額",
    alertBadManual: "請為每一位成員輸入有效金額",
    confirmDelExpense: "確定刪除這筆支出？",
    totalRow: "總計",
  },
};
