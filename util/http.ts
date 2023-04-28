import axios from "axios";
import { Expense } from "../types";
import { BASE_BACKEND_URL } from "@env";

export async function storeExpense(expenseData: Expense) {
  const response = await axios.post(
    BASE_BACKEND_URL + "/expenses.json",
    expenseData
  );

  return response.data.name;
}

export async function fetchExpenses() {
  const response = await axios.get(BASE_BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id: string, expenseData: Expense) {
  return axios.put(BASE_BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id: string) {
  return axios.delete(BASE_BACKEND_URL + `/expenses/${id}.json`);
}
