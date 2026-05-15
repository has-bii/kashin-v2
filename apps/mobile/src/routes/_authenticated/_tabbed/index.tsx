import { createFileRoute } from '@tanstack/react-router'

import { BalanceCard } from '../../../components/dashboard/balance-card'
import { BudgetsCard } from '../../../components/dashboard/budgets-card'
import { CashflowCard } from '../../../components/dashboard/cashflow-card'
import { IncomeCard } from '../../../components/dashboard/income-card'
import { InsightsCard } from '../../../components/dashboard/insights-card'
import {
  mockAccounts,
  mockBudgets,
  mockCashflow,
  mockIncome,
  mockInsights,
  mockSpending,
  mockTransactions,
} from '../../../components/dashboard/mock-data'
import { RecentTransactionsCard } from '../../../components/dashboard/recent-transactions-card'
import { SpendingCard } from '../../../components/dashboard/spending-card'

export const Route = createFileRoute('/_authenticated/_tabbed/')({
  component: Home,
})

function Home() {
  const totalBalance = mockAccounts.reduce((sum, a) => sum + a.balance, 0)

  return (
    <div className="space-y-4 p-4 pb-24">
      <BalanceCard total={totalBalance} accounts={mockAccounts} month="May 2026" />
      <IncomeCard current={mockIncome.current} previous={mockIncome.previous} month="May" />
      <SpendingCard current={mockSpending.current} previous={mockSpending.previous} month="May" />
      <CashflowCard data={mockCashflow} />
      <InsightsCard insights={mockInsights} />
      <BudgetsCard budgets={mockBudgets} month="May" />
      <RecentTransactionsCard transactions={mockTransactions} />
    </div>
  )
}
