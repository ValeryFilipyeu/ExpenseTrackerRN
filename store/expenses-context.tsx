import React, { createContext, useReducer } from "react";
import { Expense } from "../types";

type ExpensesContext = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Expense) => void;
};

type Action =
  | {
      type: "ADD";
      payload: { description: string; amount: number; date: Date };
    }
  | {
      type: "SET";
      payload: { description: string; amount: number; date: Date }[];
    }
  | {
      type: "UPDATE";
      payload: {
        id: string;
        data: { description: string; amount: number; date: Date };
      };
    }
  | { type: "DELETE"; payload: string };

export const ExpensesContext = createContext<ExpensesContext>({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state: Expense[], action: Action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "SET":
      return action.payload.reverse();
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: { children: React.ReactNode }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData: Expense) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses: Expense[]) {
    dispatch({ type: 'SET', payload: expenses });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: string, expenseData: Expense) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
