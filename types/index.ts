export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export type RootStackParamList = {
  ManageExpense: { expenseId: string };
};
