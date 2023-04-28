import axios from "axios";
import { storeExpense, fetchExpenses, updateExpense, deleteExpense } from "./http";

jest.mock("axios");

describe("storeExpense", () => {
  it("should store an expense", async () => {
    const expenseData = {
      amount: 100,
      date: new Date(),
      description: "Test expense",
    };
    const response = { data: { name: "test-id" } };
    (axios.post as jest.Mock).mockResolvedValue(response);

    const result = await storeExpense(expenseData);

    expect(result).toEqual("test-id");
    expect(axios.post).toHaveBeenCalledWith(
      "https://react-native-a697c-default-rtdb.firebaseio.com/expenses.json",
      expenseData
    );
  });
});

describe("fetchExpenses", () => {
  it("should fetch expenses", async () => {
    const response = {
      data: {
        "test-id-1": {
          amount: 100,
          date: "2021-01-01T00:00:00.000Z",
          description: "Test expense 1",
        },
        "test-id-2": {
          amount: 200,
          date: "2021-01-02T00:00:00.000Z",
          description: "Test expense 2",
        },
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(response);

    const result = await fetchExpenses();

    expect(result).toEqual([
      {
        id: "test-id-1",
        amount: 100,
        date: new Date("2021-01-01T00:00:00.000Z"),
        description: "Test expense 1",
      },
      {
        id: "test-id-2",
        amount: 200,
        date: new Date("2021-01-02T00:00:00.000Z"),
        description: "Test expense 2",
      },
    ]);
    expect(axios.get).toHaveBeenCalledWith(
      "https://react-native-a697c-default-rtdb.firebaseio.com/expenses.json"
    );
  });
});

describe("updateExpense", () => {
  it("should update an expense", async () => {
    const expenseData = {
      amount: 100,
      date: new Date(),
      description: "Test expense",
    };
    (axios.put as jest.Mock).mockResolvedValue({});

    await updateExpense("test-id", expenseData);

    expect(axios.put).toHaveBeenCalledWith(
      "https://react-native-a697c-default-rtdb.firebaseio.com/expenses/test-id.json",
      expenseData
    );
  });
});

describe("deleteExpense", () => {
  it("should delete an expense", async () => {
    (axios.delete as jest.Mock).mockResolvedValue({});

    await deleteExpense("test-id");

    expect(axios.delete).toHaveBeenCalledWith(
      "https://react-native-a697c-default-rtdb.firebaseio.com/expenses/test-id.json"
    );
  });
});
