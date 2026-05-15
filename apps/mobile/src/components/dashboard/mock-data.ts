export const mockAccounts = [
  { id: '1', name: 'BCA Checking', balance: 15_000_000 },
  { id: '2', name: 'GoPay Wallet', balance: 2_500_000 },
]

export const mockIncome = {
  current: 8_000_000,
  previous: 7_500_000,
}

export const mockSpending = {
  current: 5_200_000,
  previous: 5_800_000,
}

export const mockInsights = [
  {
    type: 'tip' as const,
    message:
      'Dining spending is 40% higher than last month. Consider meal prepping to save Rp200K.',
  },
  {
    type: 'warning' as const,
    message: 'Grocery budget at 92%. 3 days left in month.',
  },
]

export const mockBudgets = [
  {
    category: 'Dining',
    spent: 2_800_000,
    limit: 3_000_000,
    icon: 'IconToolsKitchen2',
  },
  {
    category: 'Transit',
    spent: 1_600_000,
    limit: 3_000_000,
    icon: 'IconBus',
  },
  {
    category: 'Groceries',
    spent: 1_200_000,
    limit: 4_000_000,
    icon: 'IconShoppingCart',
  },
]

export const mockCashflow = [
  { month: 'Jun', income: 8_000_000, spending: 4_800_000 },
  { month: 'Jul', income: 8_000_000, spending: 5_200_000 },
  { month: 'Aug', income: 8_500_000, spending: 4_500_000 },
  { month: 'Sep', income: 8_000_000, spending: 5_100_000 },
  { month: 'Oct', income: 8_200_000, spending: 5_600_000 },
  { month: 'Nov', income: 8_000_000, spending: 4_800_000 },
  { month: 'Dec', income: 9_000_000, spending: 6_000_000 },
  { month: 'Jan', income: 8_000_000, spending: 5_200_000 },
  { month: 'Feb', income: 8_000_000, spending: 4_900_000 },
  { month: 'Mar', income: 8_200_000, spending: 5_500_000 },
  { month: 'Apr', income: 7_500_000, spending: 5_800_000 },
  { month: 'May', income: 8_000_000, spending: 5_200_000 },
]

export const mockTransactions = [
  {
    id: '1',
    merchant: 'Kopi Kenangan',
    description: null as string | null,
    amount: 28_000,
    type: 'expense' as const,
    category: 'Dining',
    date: new Date('2026-05-15T12:00:00'),
  },
  {
    id: '2',
    merchant: 'GoRide',
    description: null as string | null,
    amount: 15_000,
    type: 'expense' as const,
    category: 'Transit',
    date: new Date('2026-05-15T09:00:00'),
  },
  {
    id: '3',
    merchant: 'Gaji',
    description: null as string | null,
    amount: 8_000_000,
    type: 'income' as const,
    category: 'Salary',
    date: new Date('2026-05-14T00:00:00'),
  },
  {
    id: '4',
    merchant: 'Indomaret',
    description: null as string | null,
    amount: 32_000,
    type: 'expense' as const,
    category: 'Groceries',
    date: new Date('2026-05-13T18:00:00'),
  },
  {
    id: '5',
    merchant: 'Netflix',
    description: null as string | null,
    amount: 186_000,
    type: 'expense' as const,
    category: 'Entertainment',
    date: new Date('2026-05-12T00:00:00'),
  },
]
