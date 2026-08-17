import type { Chapter, Deadline, Subject, SubjectId } from "./types";

function q(
  id: string,
  prompt: string,
  choices: string[],
  answer: number,
  explain: string,
  tags: string[],
): Chapter["quiz"][number] {
  return { id, prompt, choices, answer, explain, tags };
}

function p(
  id: string,
  prompt: string,
  hint: string,
  solution: string,
): Chapter["practice"][number] {
  return { id, prompt, hint, solution };
}

const accounting: Chapter[] = [
  {
    id: "acct-01",
    title: "Accounting as a language",
    minutes: 35,
    objective:
      "See why every later chapter is just a more precise way of telling the same story: what a business owns, owes, and earned.",
    simple:
      "Accounting is a scoring system. It records what came in, what went out, and what is left. If you can follow a scoreboard, you can learn this.",
    notes: [
      "Users of accounting: owners, managers, lenders, tax authorities, and later PE investors.",
      "Financial accounting reports to outsiders. Managerial accounting reports to insiders.",
      "The three questions: What do we own? What do we owe? Did we make money this period?",
      "GAAP / IFRS are the rulebooks so two companies can be compared.",
      "For PE and IB later: you will live inside financial statements. This class is the grammar.",
    ],
    pitfalls: [
      "Mixing cash and profit. A company can be profitable and still run out of cash.",
      "Thinking accounting is only bookkeeping. It is a decision system.",
    ],
    formulas: [
      "Assets = Liabilities + Equity",
      "Profit ≠ cash",
    ],
    practice: [
      p(
        "acct-01-p1",
        "A bakery buys a mixer for $4,000 cash. Did profit change today?",
        "Did the bakery consume the mixer today, or just swap one asset for another?",
        "No. Cash down $4,000, equipment up $4,000. Assets stay the same. Profit is not hit until the mixer is used up (depreciation) later.",
      ),
      p(
        "acct-01-p2",
        "Name the three primary financial statements and the question each answers.",
        "One is a snapshot. Two are movies of a period.",
        "Balance sheet: what we own/owe right now. Income statement: did we earn this period. Cash flow statement: where cash moved.",
      ),
    ],
    quiz: [
      q(
        "acct-01-q1",
        "Which statement is a snapshot at a point in time?",
        ["Income statement", "Balance sheet", "Statement of cash flows", "Trial balance"],
        1,
        "The balance sheet is a photograph of assets, liabilities, and equity on one date.",
        ["statements", "foundations"],
      ),
      q(
        "acct-01-q2",
        "A company can report a profit and still go bankrupt because:",
        [
          "Profit is illegal",
          "Profit is not the same as cash",
          "Equity cannot be negative",
          "Assets always equal cash",
        ],
        1,
        "Profit is accrual. Cash can be trapped in receivables or inventory.",
        ["cash", "foundations"],
      ),
      q(
        "acct-01-q3",
        "Who is the primary audience of financial accounting?",
        ["Only the CEO", "External users", "The tax auditor only", "Customers"],
        1,
        "Financial accounting is built for outsiders: lenders, investors, regulators.",
        ["foundations"],
      ),
    ],
  },
  {
    id: "acct-02",
    title: "The accounting equation",
    minutes: 40,
    objective: "Track every event as a balanced change to Assets = Liabilities + Equity.",
    simple:
      "Think of a scale. Left side is stuff you have. Right side is who funded it — lenders or owners. Both sides must always match.",
    notes: [
      "Assets: resources you control (cash, inventory, equipment, receivables).",
      "Liabilities: claims of outsiders (payables, loans, unearned revenue).",
      "Equity: owner residual (capital + retained earnings − drawings/dividends).",
      "Every transaction hits at least two places. That is why it is called double-entry.",
      "Expanded: Assets = Liabilities + Capital + Revenue − Expenses − Drawings.",
    ],
    pitfalls: [
      "Forgetting that revenue increases equity and expenses decrease equity.",
      "Treating a loan as income.",
    ],
    formulas: [
      "A = L + E",
      "E = Capital + RE + Rev − Exp − Drawings",
    ],
    practice: [
      p(
        "acct-02-p1",
        "Owner invests $10,000 cash. Show the equation change.",
        "What asset rose? What claim rose?",
        "Cash +10,000 (asset). Equity +10,000. Both sides +10,000.",
      ),
      p(
        "acct-02-p2",
        "Buy $2,000 inventory on account. Equation?",
        "Did you pay cash?",
        "Inventory +2,000. Accounts payable +2,000. Assets and liabilities both rise.",
      ),
    ],
    quiz: [
      q(
        "acct-02-q1",
        "Paying a supplier $500 cash for an old bill does what?",
        [
          "Assets −500, Equity −500",
          "Assets −500, Liabilities −500",
          "Liabilities +500, Equity −500",
          "No effect",
        ],
        1,
        "Cash (asset) down, payable (liability) down. Paying a debt is not an expense if it was already recorded.",
        ["equation", "liabilities"],
      ),
      q(
        "acct-02-q2",
        "Revenue increases:",
        ["Assets only", "Liabilities", "Equity", "Drawings"],
        2,
        "Revenue flows into equity via retained earnings.",
        ["equation", "equity"],
      ),
      q(
        "acct-02-q3",
        "If assets are $80 and liabilities are $30, equity is:",
        ["$110", "$50", "$30", "$80"],
        1,
        "80 − 30 = 50. Residual claim.",
        ["equation"],
      ),
    ],
  },
  {
    id: "acct-03",
    title: "Debits and credits",
    minutes: 45,
    objective: "Use debit/credit as the grammar of the equation, not as 'good' and 'bad'.",
    simple:
      "Debit just means left. Credit means right. Assets grow on the left. Liabilities and equity grow on the right. That is the whole trick.",
    notes: [
      "DEAD: Debits increase Expenses, Assets, Drawings/Dividends.",
      "CLER: Credits increase Liabilities, Equity, Revenue.",
      "Normal balance = the side that increases the account.",
      "Every journal entry: total debits = total credits.",
      "T-account: left debit, right credit. Ending balance sits on the normal side.",
    ],
    pitfalls: [
      "Thinking debit means decrease. It depends on the account type.",
      "Crediting cash when you receive cash (wrong — cash is an asset, receipt is a debit).",
    ],
    formulas: [
      "Debits = Credits in every entry",
      "Asset↑ = Debit   Liability↑ = Credit   Equity↑ = Credit",
    ],
    practice: [
      p(
        "acct-03-p1",
        "Receive $1,200 cash from a customer for work already billed. Debit? Credit?",
        "Cash is an asset. The customer owed you — that asset is leaving.",
        "Debit Cash 1,200. Credit Accounts Receivable 1,200.",
      ),
      p(
        "acct-03-p2",
        "Pay $400 rent. Debit? Credit?",
        "Rent is an expense. Cash is leaving.",
        "Debit Rent Expense 400. Credit Cash 400.",
      ),
    ],
    quiz: [
      q(
        "acct-03-q1",
        "To increase Cash you:",
        ["Credit it", "Debit it", "Ignore it", "Close it"],
        1,
        "Cash is an asset. Assets increase with debits.",
        ["debits", "assets"],
      ),
      q(
        "acct-03-q2",
        "Which account increases with a credit?",
        ["Equipment", "Rent expense", "Service revenue", "Prepaid insurance"],
        2,
        "Revenue has a credit normal balance.",
        ["debits", "revenue"],
      ),
      q(
        "acct-03-q3",
        "Owner withdrawal of cash is recorded as:",
        [
          "Debit Cash, Credit Drawings",
          "Debit Drawings, Credit Cash",
          "Debit Expense, Credit Equity",
          "Debit Revenue, Credit Cash",
        ],
        1,
        "Drawings increase with debits. Cash decreases with a credit.",
        ["debits", "equity"],
      ),
    ],
  },
  {
    id: "acct-04",
    title: "Journals, ledgers, trial balance",
    minutes: 50,
    objective: "Walk a transaction from source document → journal → ledger → trial balance.",
    simple:
      "The journal is the diary (in order). The ledger is the file cabinet (by account). The trial balance is the proof that the file cabinet still balances.",
    notes: [
      "General journal: date, accounts, debit, credit, memo.",
      "Posting: copy each line into the matching ledger account.",
      "Trial balance lists every account with its ending debit or credit balance.",
      "A balanced trial balance does not prove you posted to the correct accounts — only that debits still equal credits.",
      "Chart of accounts is the numbered list of every account you are allowed to use.",
    ],
    pitfalls: [
      "Skipping the memo. Future-you will not remember why the entry exists.",
      "Assuming a balanced trial balance means the books are correct.",
    ],
    formulas: [
      "Sum of debit balances = sum of credit balances",
    ],
    practice: [
      p(
        "acct-04-p1",
        "List the four-step cycle after a source document arrives.",
        "Diary → file cabinet → proof list.",
        "Analyze → journalize → post to ledger → prepare trial balance.",
      ),
      p(
        "acct-04-p2",
        "You debit Rent Expense but meant Supplies Expense. Does the trial balance still balance?",
        "Did you still debit something and credit cash?",
        "Yes. Wrong account, equal amounts. Trial balance will not catch this.",
      ),
    ],
    quiz: [
      q(
        "acct-04-q1",
        "The book of original entry is the:",
        ["Ledger", "Journal", "Balance sheet", "Worksheet"],
        1,
        "Transactions are first written in the journal, then posted.",
        ["cycle"],
      ),
      q(
        "acct-04-q2",
        "A trial balance that balances proves:",
        [
          "Every account is correct",
          "Debits equal credits",
          "Cash is correct",
          "Revenue is complete",
        ],
        1,
        "It only tests equality, not classification or completeness.",
        ["cycle", "internal-control"],
      ),
    ],
  },
  {
    id: "acct-05",
    title: "Adjusting entries",
    minutes: 55,
    objective: "Move books from cash-ish records to accrual truth at period end.",
    simple:
      "Adjustments are the end-of-month cleanup: record what you used, what you earned, and what you still owe — even if no cash moved today.",
    notes: [
      "Accrual: recognize revenue when earned, expenses when incurred.",
      "Deferrals: cash happened first (prepaid, unearned).",
      "Accruals: cash happens later (accrued revenue, accrued expense).",
      "Never adjust cash in a typical adjusting entry.",
      "Matching principle: expenses follow the revenue they helped produce.",
    ],
    pitfalls: [
      "Forgetting to adjust prepaid rent / supplies / depreciation.",
      "Crediting cash in an adjusting entry.",
    ],
    formulas: [
      "Depreciation = (Cost − Salvage) / Useful life",
      "Supplies used = Beginning + Purchases − Ending count",
    ],
    practice: [
      p(
        "acct-05-p1",
        "Prepaid rent $6,000 for 6 months, paid Jan 1. Adjust on Jan 31.",
        "How much rent was used this month?",
        "Debit Rent Expense 1,000. Credit Prepaid Rent 1,000.",
      ),
      p(
        "acct-05-p2",
        "Employees earned $900 wages not yet paid. Adjust.",
        "Expense now, pay later.",
        "Debit Wages Expense 900. Credit Wages Payable 900.",
      ),
    ],
    quiz: [
      q(
        "acct-05-q1",
        "Unearned revenue is a:",
        ["Revenue", "Asset", "Liability", "Equity"],
        2,
        "You were paid before you earned it. You owe the work or a refund.",
        ["accrual", "liabilities"],
      ),
      q(
        "acct-05-q2",
        "Which is typically NOT touched by adjusting entries?",
        ["Prepaid insurance", "Accumulated depreciation", "Cash", "Supplies"],
        2,
        "Adjustments allocate existing balances. Cash already moved (or will move later).",
        ["accrual"],
      ),
      q(
        "acct-05-q3",
        "Accrued revenue means:",
        [
          "Cash received, not earned",
          "Earned, cash not yet received",
          "An expense paid early",
          "A dividend",
        ],
        1,
        "You did the work. Invoice or collect later.",
        ["accrual", "revenue"],
      ),
    ],
  },
  {
    id: "acct-06",
    title: "Financial statements",
    minutes: 50,
    objective: "Build the income statement, statement of equity, and balance sheet in the correct order.",
    simple:
      "Movie first (income), then update the owner score (equity), then the photograph (balance sheet). Cash flow is a separate movie of cash only.",
    notes: [
      "Order: Income statement → Statement of retained earnings / equity → Balance sheet.",
      "Net income flows into equity. That is the glue.",
      "Current vs long-term: 12-month line (operating cycle if longer).",
      "Classified balance sheet: current assets, PPE, current liabilities, long-term debt, equity.",
      "Multi-step income: Sales − COGS = Gross profit − operating expenses = operating income.",
    ],
    pitfalls: [
      "Putting drawings on the income statement.",
      "Listing accumulated depreciation as a liability. It is a contra-asset.",
    ],
    formulas: [
      "Net income = Revenues − Expenses",
      "Ending RE = Beg RE + NI − Dividends",
      "Gross profit = Sales − COGS",
    ],
    practice: [
      p(
        "acct-06-p1",
        "Rev $20k, Exp $14k, Beg RE $8k, Dividends $1k. Ending RE?",
        "Add profit, subtract dividends.",
        "8,000 + (20,000 − 14,000) − 1,000 = 13,000.",
      ),
      p(
        "acct-06-p2",
        "Equipment $50k, Accum. dep. $12k. Book value?",
        "Contra-asset.",
        "38,000. That is what sits on the balance sheet net of the contra.",
      ),
    ],
    quiz: [
      q(
        "acct-06-q1",
        "Which is prepared first?",
        ["Balance sheet", "Income statement", "Statement of cash flows", "Post-closing trial balance"],
        1,
        "You need net income before you can finish equity and the balance sheet.",
        ["statements"],
      ),
      q(
        "acct-06-q2",
        "Accumulated depreciation is reported as:",
        ["A liability", "An expense", "A contra-asset", "Equity"],
        2,
        "It reduces the related asset’s book value.",
        ["statements", "ppe"],
      ),
    ],
  },
  {
    id: "acct-07",
    title: "Closing the books",
    minutes: 40,
    objective: "Zero temporary accounts and lock net income into retained earnings.",
    simple:
      "Revenue and expense accounts are monthly scorecards. At month-end you empty them into retained earnings so next month starts at zero.",
    notes: [
      "Temporary: revenues, expenses, dividends/drawings, income summary.",
      "Permanent: assets, liabilities, equity (including RE).",
      "Close revenues to Income Summary, expenses to Income Summary, Income Summary to RE, dividends to RE.",
      "Post-closing trial balance contains only permanent accounts.",
      "This is why January revenue is not mixed with last year’s revenue.",
    ],
    pitfalls: [
      "Closing Cash. Never.",
      "Forgetting to close dividends.",
    ],
    formulas: [
      "Income Summary = Revenues − Expenses = Net income",
    ],
    practice: [
      p(
        "acct-07-p1",
        "Service revenue $9,000, expenses $6,200. Closing entry to RE?",
        "What is leftover in Income Summary?",
        "After closing rev and exp, Income Summary has a $2,800 credit. Debit Income Summary 2,800, Credit Retained Earnings 2,800.",
      ),
    ],
    quiz: [
      q(
        "acct-07-q1",
        "Which account is temporary?",
        ["Accounts payable", "Common stock", "Rent expense", "Land"],
        2,
        "Expenses reset each period.",
        ["closing"],
      ),
      q(
        "acct-07-q2",
        "After closing, the income statement accounts have balances of:",
        ["Last year’s totals", "Zero", "Budget amounts", "Cash totals"],
        1,
        "That is the point of closing.",
        ["closing"],
      ),
    ],
  },
  {
    id: "acct-08",
    title: "Merchandising and inventory",
    minutes: 55,
    objective: "Record inventory, COGS, and the difference between perpetual and periodic systems.",
    simple:
      "A store has two big extra accounts: Inventory (what is still on the shelf) and Cost of Goods Sold (what left the shelf).",
    notes: [
      "Perpetual: update inventory and COGS at every sale.",
      "Periodic: wait until a count, then compute COGS.",
      "COGS = Beg inventory + Purchases − Ending inventory.",
      "Gross profit margin = Gross profit / Sales. PE lives on this number.",
      "FOB shipping vs destination decides when title (and inventory) transfers.",
    ],
    pitfalls: [
      "Recording a sale without COGS in a perpetual system.",
      "Confusing purchase discounts with sales discounts.",
    ],
    formulas: [
      "COGS = BI + Purchases − EI",
      "Gross profit = Net sales − COGS",
    ],
    practice: [
      p(
        "acct-08-p1",
        "BI $8k, purchases $22k, EI $9k. COGS?",
        "What left the shelf?",
        "8 + 22 − 9 = 21k.",
      ),
      p(
        "acct-08-p2",
        "Sell inventory that cost $300 for $500 cash, perpetual. Two entries?",
        "One for the sale, one for the cost.",
        "Debit Cash 500 / Credit Sales 500. Debit COGS 300 / Credit Inventory 300.",
      ),
    ],
    quiz: [
      q(
        "acct-08-q1",
        "In a perpetual system, a sale typically requires:",
        ["One entry", "Two entries", "No entries", "Only a memo"],
        1,
        "Revenue entry plus the COGS / inventory entry.",
        ["inventory"],
      ),
      q(
        "acct-08-q2",
        "If ending inventory is overstated, COGS is:",
        ["Overstated", "Understated", "Unchanged", "Equal to sales"],
        1,
        "COGS = BI + P − EI. Bigger EI → smaller COGS → inflated profit.",
        ["inventory", "statements"],
      ),
    ],
  },
  {
    id: "acct-09",
    title: "Cash, internal control, receivables",
    minutes: 50,
    objective: "Protect cash, reconcile the bank, and measure what customers still owe.",
    simple:
      "Cash is the easiest thing to steal and the easiest thing to mess up. Controls slow the thief. Bank recs catch the mess. Receivables are promises — some will break.",
    notes: [
      "Separation of duties: the person who records cash should not also handle cash.",
      "Bank reconciliation: book side vs bank side. Outstanding checks, deposits in transit, fees, NSF.",
      "Allowance method: estimate bad debts so receivables are not overstated.",
      "Net realizable value = AR − Allowance for doubtful accounts.",
      "Aging of receivables is usually more accurate than a flat % of sales.",
    ],
    pitfalls: [
      "Adding outstanding checks to the bank balance.",
      "Writing off a specific account as an expense again if you already used the allowance.",
    ],
    formulas: [
      "Adjusted bank = Bank + deposits in transit − outstanding checks",
      "NRV = AR − Allowance",
    ],
    practice: [
      p(
        "acct-09-p1",
        "Bank $12,400. Deposits in transit $800. Outstanding checks $1,100. True cash?",
        "Bank + in transit − checks.",
        "12,400 + 800 − 1,100 = 12,100.",
      ),
    ],
    quiz: [
      q(
        "acct-09-q1",
        "Outstanding checks are deducted from the:",
        ["Book balance", "Bank balance", "AR", "Revenue"],
        1,
        "The bank has not seen them yet.",
        ["cash", "internal-control"],
      ),
      q(
        "acct-09-q2",
        "Under the allowance method, writing off a specific account:",
        [
          "Increases expense",
          "Debits allowance, credits AR",
          "Debits bad debt expense",
          "Increases cash",
        ],
        1,
        "The expense was already estimated. Write-off just cleans AR and the allowance.",
        ["receivables"],
      ),
    ],
  },
  {
    id: "acct-10",
    title: "Long-term assets and depreciation",
    minutes: 50,
    objective: "Capitalize the right costs and spread them across useful life.",
    simple:
      "If it will help you earn for years, put it on the balance sheet and nibble the cost each year. That nibble is depreciation.",
    notes: [
      "Capitalize: purchase price + freight + installation + taxes to get ready.",
      "Expense immediately: ordinary repairs, training that does not extend life.",
      "Straight-line is the default in intro accounting.",
      "Units-of-production follows actual use. Double-declining is accelerated.",
      "Land is not depreciated. Land improvements are.",
    ],
    pitfalls: [
      "Depreciating land.",
      "Crediting the asset directly instead of Accumulated Depreciation (unless disposal).",
    ],
    formulas: [
      "SL = (Cost − Salvage) / Years",
      "Book value = Cost − Accumulated depreciation",
    ],
    practice: [
      p(
        "acct-10-p1",
        "Machine $25,000, salvage $1,000, 8 years, SL. Annual dep?",
        "Depreciable base over years.",
        "(25,000 − 1,000) / 8 = 3,000.",
      ),
    ],
    quiz: [
      q(
        "acct-10-q1",
        "Which is capitalized with a new delivery van?",
        ["First year insurance", "Sales tax on the van", "Gasoline", "Driver wages"],
        1,
        "Costs to acquire and ready the asset are capitalized.",
        ["ppe"],
      ),
      q(
        "acct-10-q2",
        "Land is depreciated:",
        ["Over 40 years", "Never (usually)", "Using units of production", "Only if bought with a building"],
        1,
        "Land has indefinite life.",
        ["ppe"],
      ),
    ],
  },
  {
    id: "acct-11",
    title: "Liabilities and payroll",
    minutes: 45,
    objective: "Split current vs long-term claims and record the employer’s true payroll cost.",
    simple:
      "A liability is a promise. Some are due this year (current). Payroll is never just the paycheck — the employer owes extra tax on top.",
    notes: [
      "Notes payable: interest accrues with time, even if unpaid.",
      "Current portion of long-term debt is reclassified each year.",
      "Employee withholdings (federal income tax, employee FICA) are liabilities, not expenses of the employer.",
      "Employer payroll taxes (employer FICA, FUTA, SUTA) are extra expenses.",
      "Unearned revenue is a liability until performance happens.",
    ],
    pitfalls: [
      "Treating employee income tax withheld as an expense.",
      "Forgetting to accrue interest on a note.",
    ],
    formulas: [
      "Interest = Principal × Rate × Time",
      "Current portion = principal due within 12 months",
    ],
    practice: [
      p(
        "acct-11-p1",
        "$10,000 note, 6% annual, outstanding 2 months. Accrued interest?",
        "Time is 2/12.",
        "10,000 × 0.06 × 2/12 = 100.",
      ),
    ],
    quiz: [
      q(
        "acct-11-q1",
        "Employee federal income tax withheld is recorded as:",
        ["Wage expense", "A liability", "An asset", "Equity"],
        1,
        "You collected it for the government. You owe it.",
        ["liabilities", "payroll"],
      ),
      q(
        "acct-11-q2",
        "Interest on a note is recognized:",
        ["Only when paid", "As time passes", "When the note is signed", "Never"],
        1,
        "Accrual: incur as time elapses.",
        ["liabilities", "accrual"],
      ),
    ],
  },
  {
    id: "acct-12",
    title: "Equity, ratios, and the PE lens",
    minutes: 50,
    objective: "Read owner claims and the first ratios an investor actually uses.",
    simple:
      "Equity is the leftover claim. Ratios turn the statements into a story: can they pay, do they earn, how much debt is in the mix.",
    notes: [
      "Sole prop: capital + net income − drawings.",
      "Corporation: common stock + APIC + retained earnings − treasury stock.",
      "Current ratio = CA / CL. Liquidity.",
      "Debt-to-equity = Total liabilities / Equity. Leverage — PE cares a lot.",
      "ROE = NI / Equity. Profitability of the residual claim.",
      "This is the bridge from Northland accounting into later Finance / LBO work.",
    ],
    pitfalls: [
      "Using net income in the current ratio.",
      "Comparing ratios without knowing the industry.",
    ],
    formulas: [
      "Current ratio = Current assets / Current liabilities",
      "D/E = Total liabilities / Equity",
      "ROE = Net income / Average equity",
      "Profit margin = NI / Sales",
    ],
    practice: [
      p(
        "acct-12-p1",
        "CA 40, CL 25, NI 8, Equity 50, Sales 80. Current ratio, margin, ROE?",
        "Three simple divisions.",
        "Current 1.60. Margin 10%. ROE 16%.",
      ),
    ],
    quiz: [
      q(
        "acct-12-q1",
        "A current ratio of 0.80 means:",
        [
          "Very strong liquidity",
          "Current liabilities exceed current assets",
          "The firm has no debt",
          "ROE is 80%",
        ],
        1,
        "Below 1.0: short-term claims exceed short-term resources.",
        ["ratios", "liquidity"],
      ),
      q(
        "acct-12-q2",
        "PE investors watch debt-to-equity because it measures:",
        ["Inventory speed", "Leverage", "Tax rate", "Share count"],
        1,
        "How much of the capital structure is borrowed vs owned.",
        ["ratios", "leverage"],
      ),
    ],
  },
];

function starterChapters(
  prefix: string,
  items: Array<{
    title: string;
    objective: string;
    simple: string;
    notes: string[];
    pitfalls: string[];
    formulas: string[];
    practice: [string, string, string];
    quiz: [string, string[], number, string, string[]];
  }>,
): Chapter[] {
  return items.map((item, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `${prefix}-${n}`,
      title: item.title,
      minutes: 40,
      objective: item.objective,
      simple: item.simple,
      notes: item.notes,
      pitfalls: item.pitfalls,
      formulas: item.formulas,
      practice: [
        p(`${prefix}-${n}-p1`, item.practice[0], item.practice[1], item.practice[2]),
      ],
      quiz: [
        q(
          `${prefix}-${n}-q1`,
          item.quiz[0],
          item.quiz[1],
          item.quiz[2],
          item.quiz[3],
          item.quiz[4],
        ),
      ],
    };
  });
}

const business = starterChapters("bus", [
  {
    title: "What a business actually is",
    objective: "Define value creation as a system, not a vibe.",
    simple:
      "A business is a machine that takes inputs, makes something people pay for, and keeps a slice. Strategy is choosing which machine to build.",
    notes: [
      "Customers, offer, operations, unit economics, and cash cycle.",
      "Your live apps already are businesses. This subject names the parts.",
    ],
    pitfalls: ["Confusing activity with a business model."],
    formulas: ["Profit = Revenue − Cost", "Unit contribution = Price − Variable cost"],
    practice: [
      "Name the customer, the paid offer, and the core cost of one of your apps.",
      "If you cannot name who pays, it is a project, not a business yet.",
      "Write: customer → problem → paid offer → delivery → cost to serve.",
    ],
    quiz: [
      "Unit economics start with:",
      ["Brand colors", "Price vs cost to serve one customer", "Office leases", "Mission statements"],
      1,
      "If one customer is unprofitable, scale makes it worse.",
      ["operations", "unit-economics"],
    ],
  },
  {
    title: "Operations and the cash cycle",
    objective: "See how work, inventory, and receivables trap or free cash.",
    simple:
      "You can be 'busy and growing' and still die if cash is stuck in work you already did.",
    notes: [
      "Cash conversion cycle: inventory days + receivable days − payable days.",
      "Founders who also want PE later: this is how you create enterprise value operationally.",
    ],
    pitfalls: ["Scaling before the cycle is understood."],
    formulas: ["CCC = DIO + DSO − DPO"],
    practice: [
      "If customers pay in 45 days and you pay vendors in 15, what is the gap?",
      "Who finances the 30 days?",
      "You do. That is working capital.",
    ],
    quiz: [
      "A longer cash conversion cycle usually means:",
      ["More free cash", "More cash trapped in the business", "Higher prices", "Lower taxes"],
      1,
      "Cash sits in inventory or receivables longer.",
      ["operations", "cash"],
    ],
  },
  {
    title: "Management and people systems",
    objective: "Turn yourself from doer into designer of work.",
    simple:
      "Management is making other people’s good decisions cheap and frequent.",
    notes: [
      "Goals, scorecards, cadence, hiring, and feedback loops.",
      "You will need this when you sit across from a portfolio CEO later.",
    ],
    pitfalls: ["Managing only by motivation speeches."],
    formulas: ["Output = Rate × Time × Quality"],
    practice: [
      "Write one weekly scorecard metric for an app you already run.",
      "Pick something you can count every Sunday.",
      "Example: weekly active users, crash rate, or paid conversions.",
    ],
    quiz: [
      "A scorecard exists to:",
      ["Decorate slides", "Make performance visible every week", "Replace customers", "Avoid accounting"],
      1,
      "What gets seen weekly gets managed.",
      ["management"],
    ],
  },
  {
    title: "Go-to-market without theater",
    objective: "Separate real demand from hope.",
    simple:
      "Marketing is paid attention. Sales is a conversation that ends in a yes or a no. Both must be measured.",
    notes: ["Acquisition, activation, retention, revenue, referral (AARRR)."],
    pitfalls: ["Spending on ads before retention exists."],
    formulas: ["LTV > 3 × CAC is a common healthy bar"],
    practice: [
      "Estimate CAC for one channel you actually use.",
      "Spend / new paying users.",
      "If you cannot compute it, that channel is not managed yet.",
    ],
    quiz: [
      "CAC is:",
      ["Customer annual credit", "Cost to acquire one customer", "Cash after costs", "Current asset coverage"],
      1,
      "Acquisition cost. Compare it to lifetime value.",
      ["gtm"],
    ],
  },
]);

const finance = starterChapters("fin", [
  {
    title: "Time value of money",
    objective: "Make 'later money' comparable to 'money now'.",
    simple:
      "A dollar today can be put to work. So a dollar next year is worth less. Discounting is just undoing interest.",
    notes: [
      "PV, FV, discount rate, compounding.",
      "This is the core of every LBO and every investment memo.",
    ],
    pitfalls: ["Mixing annual rates with monthly periods."],
    formulas: ["FV = PV × (1+r)^n", "PV = FV / (1+r)^n"],
    practice: [
      "What is $1,000 in 3 years at 8% compounded annually?",
      "One plus rate, to the power of years.",
      "1,000 × 1.08^3 = 1,259.71.",
    ],
    quiz: [
      "Present value falls when the discount rate:",
      ["Falls", "Rises", "Equals zero forever", "Is ignored"],
      1,
      "A higher required return makes future cash less valuable today.",
      ["tvm"],
    ],
  },
  {
    title: "Capital structure",
    objective: "See debt and equity as two claims on the same cash.",
    simple:
      "Lenders get paid first and want safety. Owners get the leftover and want upside. PE uses a lot of the first to juice the second.",
    notes: [
      "Senior debt, mezz, equity. Covenants. Interest tax shield.",
      "Connects directly to your Accounting liability and equity chapters.",
    ],
    pitfalls: ["Treating cheap debt as free."],
    formulas: ["WACC ≈ wd×rd×(1−t) + we×re"],
    practice: [
      "Why does PE like leverage if debt is risky?",
      "Who gets the extra return if the plan works?",
      "Equity holders. Leverage amplifies ROE — and losses.",
    ],
    quiz: [
      "In a simple LBO, more debt usually:",
      ["Removes all risk", "Amplifies equity returns and risk", "Increases WACC always", "Eliminates interest"],
      1,
      "Same operational outcome, thinner equity slice.",
      ["leverage", "lbo"],
    ],
  },
  {
    title: "Returns: IRR and MOIC",
    objective: "Speak the two numbers every PE meeting uses.",
    simple:
      "MOIC is 'how many times your money'. IRR is 'how fast'. Both matter. Fast mediocre and slow huge tell different stories.",
    notes: ["J-curve, DPI / TVPI later. For now: multiple and rate."],
    pitfalls: ["Chasing IRR by exiting too early on a great asset."],
    formulas: ["MOIC = Total value / Invested capital"],
    practice: [
      "Invest 10, exit 25 in 5 years. MOIC?",
      "Out / in.",
      "2.5x.",
    ],
    quiz: [
      "IRR cares more than MOIC about:",
      ["Industry", "Time", "Logo design", "Share count"],
      1,
      "Timing of cash flows is the point of IRR.",
      ["returns"],
    ],
  },
  {
    title: "Reading a company like an investor",
    objective: "Connect statements to value drivers: growth, margin, cash, multiple.",
    simple:
      "Price is what you pay. Value is cash the business can give you, risk-adjusted. Everything else is decoration.",
    notes: [
      "EBITDA as a rough cash-earnings proxy — and its lies.",
      "Working capital, capex, and one-time items.",
    ],
    pitfalls: ["Worshipping EBITDA while cash is dying."],
    formulas: ["EV ≈ Equity + Net debt", "FCF ≈ EBIT(1−t) + D&A − capex − ΔNWC"],
    practice: [
      "Name one reason EBITDA can look fine while cash is not.",
      "Think inventory or capex.",
      "Rising inventory or heavy maintenance capex both steal cash.",
    ],
    quiz: [
      "Enterprise value is closest to:",
      ["Just cash", "Equity value plus net debt", "Only revenue", "Book equity"],
      1,
      "EV is the whole-firm claim, not just the equity slice.",
      ["valuation"],
    ],
  },
]);

const economics = starterChapters("econ", [
  {
    title: "Incentives and trade-offs",
    objective: "See every choice as opportunity cost.",
    simple:
      "You cannot do everything. The real cost of a choice is the best thing you gave up.",
    notes: ["Scarcity, margins, incentives, unintended consequences."],
    pitfalls: ["Ignoring opportunity cost because no cash left the account."],
    formulas: ["Opportunity cost = value of next-best alternative"],
    practice: [
      "You spend Saturday building an app instead of a $200 freelance job. Cost?",
      "What did you not earn?",
      "At least $200, plus rest, plus any compounding skill from the freelance work.",
    ],
    quiz: [
      "Opportunity cost is:",
      ["Only cash spent", "The next-best alternative given up", "Sunk cost", "Tax"],
      1,
      "Economics prices the path not taken.",
      ["micro"],
    ],
  },
  {
    title: "Demand, supply, and price",
    objective: "Use the simplest market model without superstition.",
    simple:
      "When something gets more expensive, people buy less and sellers offer more. Price is the peace treaty.",
    notes: ["Shifts vs movements. Elasticity as sensitivity."],
    pitfalls: ["Calling every price change a 'shift in demand'."],
    formulas: ["Elasticity ≈ %ΔQ / %ΔP"],
    practice: [
      "If your app doubles price and only 10% of users leave, demand is:",
      "Sensitive or not?",
      "Inelastic. Quantity fell less than price rose.",
    ],
    quiz: [
      "A movement along the demand curve is caused by:",
      ["A change in income", "A change in the good’s own price", "A new substitute", "Advertising"],
      1,
      "Own-price changes quantity demanded, not the demand curve itself.",
      ["micro"],
    ],
  },
  {
    title: "Macro in one sitting",
    objective: "Know GDP, inflation, rates — enough to read a deal environment.",
    simple:
      "When rates rise, money gets expensive. Asset prices usually sag. PE entry multiples and debt costs move.",
    notes: ["GDP, CPI, unemployment, Fed funds, yield curve."],
    pitfalls: ["Treating macro as a stock-picking crystal ball."],
    formulas: ["Real ≈ Nominal − Inflation"],
    practice: [
      "Why do higher rates hurt leveraged buyouts?",
      "What does PE borrow?",
      "Interest expense rises and exit multiples often compress.",
    ],
    quiz: [
      "Higher policy rates typically:",
      ["Cheapen debt for LBOs", "Raise the cost of leverage", "Erase inflation instantly", "Increase all multiples"],
      1,
      "Debt service costs more. Discount rates rise.",
      ["macro", "rates"],
    ],
  },
]);

const quant = starterChapters("qnt", [
  {
    title: "Algebra that actually shows up",
    objective: "Be fluent with linear equations, percents, and rearranging formulas.",
    simple:
      "Finance is algebra with dollar signs. If you can isolate a variable, you can survive every later model.",
    notes: ["Percent change, weighted averages, solving for r or n."],
    pitfalls: ["Percent of vs percent change."],
    formulas: ["% change = (New − Old) / Old"],
    practice: [
      "Sales go from 80 to 100. Percent change?",
      "Change over start.",
      "25%.",
    ],
    quiz: [
      "A rise from 50 to 60 is:",
      ["10%", "20%", "16.7%", "120%"],
      1,
      "10 / 50 = 20%.",
      ["algebra"],
    ],
  },
  {
    title: "Spreadsheets as a thinking tool",
    objective: "Build clean, auditable sheets — the language of banking.",
    simple:
      "One idea per cell. Inputs in one place. No hardcodes inside formulas. Your future associate self will thank you.",
    notes: ["SUM, IF, absolute refs, xlookup/index, error checks."],
    pitfalls: ["Hardcoding a number inside a long formula."],
    formulas: ["=C5*(1+$B$1)  — mix relative and absolute"],
    practice: [
      "Why lock the tax rate cell with $?",
      "What happens when you copy the formula down?",
      "The reference stays on the input instead of sliding.",
    ],
    quiz: [
      "In Excel, $B$1 is:",
      ["A relative ref", "An absolute ref", "A circular ref", "A pivot"],
      1,
      "Dollar signs freeze the address when filled.",
      ["spreadsheets"],
    ],
  },
  {
    title: "Stats for judgment, not decoration",
    objective: "Use mean, median, variance, and base rates to not fool yourself.",
    simple:
      "Averages hide tails. Median is the middle person. Variance is 'how wild'. PE diligence is mostly not getting fooled.",
    notes: ["Distributions, sample vs population, correlation ≠ causation."],
    pitfalls: ["Managing to the average in a skewed business."],
    formulas: ["Mean = Σx / n"],
    practice: [
      "Why might median customer spend beat the mean?",
      "Think one huge whale.",
      "A single large account pulls the mean up. Median shows the typical customer.",
    ],
    quiz: [
      "Correlation implies causation:",
      ["Always", "Never automatically", "If r > 0.5", "If n is large"],
      1,
      "You still need a mechanism and a design.",
      ["stats"],
    ],
  },
]);

export const SUBJECTS: Subject[] = [
  {
    id: "accounting",
    name: "Accounting",
    short: "Books",
    professor: "Professor Hale",
    title: "Chair of the Ledger",
    voice: "Precise, calm, allergic to sloppy language. Makes the books feel like a craft.",
    priority: 1,
    blurb:
      "Northland Accounting Transfer Pathway — the technical spine for Mankato Finance and later PE.",
    chapters: accounting,
  },
  {
    id: "business",
    name: "Business",
    short: "Ops",
    professor: "Professor Voss",
    title: "Chair of the Enterprise",
    voice: "Operational, impatient with theater, obsessed with unit economics and cadence.",
    priority: 2,
    blurb: "Systems for the companies you are already building.",
    chapters: business,
  },
  {
    id: "finance",
    name: "Finance",
    short: "Capital",
    professor: "Professor Quinn",
    title: "Chair of Capital",
    voice: "Investor-minded. Always asks what the cash is worth and who gets it.",
    priority: 3,
    blurb: "Time value, structure, returns — the PE dialect. Full major later at Mankato.",
    chapters: finance,
  },
  {
    id: "economics",
    name: "Economics",
    short: "Markets",
    professor: "Professor Adeyemi",
    title: "Chair of Markets",
    voice: "Trade-offs first. Explains the world without slogans.",
    priority: 4,
    blurb: "Incentives, prices, and the rate environment that prices every deal.",
    chapters: economics,
  },
  {
    id: "quant",
    name: "Quantitative",
    short: "Tools",
    professor: "Professor Sato",
    title: "Chair of Measure",
    voice: "First principles. Short sentences. Numbers before adjectives.",
    priority: 5,
    blurb: "Algebra, spreadsheets, and stats so modeling never feels like magic.",
    chapters: quant,
  },
];

export const SUBJECT_MAP: Record<SubjectId, Subject> = Object.fromEntries(
  SUBJECTS.map((s) => [s.id, s]),
) as Record<SubjectId, Subject>;

export function getSubject(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function getChapter(subjectId: string, chapterId: string) {
  const subject = getSubject(subjectId);
  return subject?.chapters.find((c) => c.id === chapterId);
}

export const DEFAULT_DEADLINES: Deadline[] = [
  {
    id: "d1",
    subjectId: "accounting",
    title: "Accounting I — Exam 1 window",
    date: "2026-10-08",
  },
  {
    id: "d2",
    subjectId: "accounting",
    title: "Finish pathway midterm block",
    date: "2026-11-19",
  },
  {
    id: "d3",
    subjectId: "quant",
    title: "Spreadsheet fluency check",
    date: "2026-09-30",
  },
];
