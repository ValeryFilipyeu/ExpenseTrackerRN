import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import ExpenseItem from "./ExpenseItem";
import { Expense } from "../../types";

const renderExpenseItem = (itemData: ListRenderItemInfo<Expense>) => {
  return <ExpenseItem {...itemData.item} />;
};

type ExpensesListProps = {
  expenses: Expense[];
};

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
