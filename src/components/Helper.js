import { Currency } from "lucide-react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const fetchData = (key) => {
  try {
    const userData = localStorage.getItem(key);

    return JSON.parse(userData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw error; // Rethrow to be caught by error boundary
  }
};

export const logoutAction = () => {
  let userData = localStorage.getItem("userName");
  const user = JSON.parse(userData).toUpperCase();
  toast.success(user + " You are logged out");

  localStorage.removeItem("userName");

  return redirect("/");
};

export const createBudget = ({ name, amount }) => {
  const newItem = {
    name: name,
    id: self.crypto.randomUUID(),
    createdAt: Date.now(),
    amount: +amount,
  };
  // ?? for if undefined or null then return []
  const existingBudget = fetchData("budgets") ?? [];
  console.log(existingBudget);
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudget, newItem])
  );
};
export const createExpense = ({ name, amount, expenseId }) => {
  const newItem = {
    name: name,
    id: self.crypto.randomUUID(),
    createdAt: Date.now(),
    amount: +amount,
    expenseId: expenseId,
  };
  // ?? for if undefined or null then return []
  const existingexpense = fetchData("expense") ?? [];
  console.log(existingexpense);
  return localStorage.setItem(
    "expense",
    JSON.stringify([...existingexpense, newItem])
  );
};

export const waitTime = () => {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));
};

export const formateCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

export const calculateSpentByBudget = (budgetId) => {
  const expenseData = fetchData("expense")||[];

  const expenseAmount = expenseData.reduce((acc, expense) => {
    if (expense.budgetId === budgetId) {
      return acc + expense.amount;
    }
    return acc;
  }, 0);
  return formateCurrency(expenseAmount);
};
