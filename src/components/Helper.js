import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import app from "./firebase";
import { redirect } from "react-router-dom";

export const fetchData = (key) => {
  try {
    const userData = localStorage.getItem(key);
    return JSON.parse(userData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw error; // Rethrow to be caught by error boundary
  }
};

export const getAllMatching = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

export const logoutAction = async () => {
  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  if (currentUser) {
    try {
      await signOut(auth);
      const userName = currentUser.displayName || "User";
      localStorage.removeItem("userName");
      localStorage.removeItem("expense");
      localStorage.removeItem("budgets");
      toast.success(`${userName}, you are logged out`);
      return redirect("/");
    } catch (error) {
      console.error("Error during sign-out:", error);
      toast.error("Failed to log out");
      return redirect("/");
    }
  }
  const userData = fetchData("userName");
  if (userData) {
    const user = userData.toUpperCase();
    toast.success(user + " You are logged out");
    localStorage.removeItem("userName");
    localStorage.removeItem("expense");
    localStorage.removeItem("budgets");
  }

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
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    name: name,
    id: self.crypto.randomUUID(),
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  // ?? for if undefined or null then return []
  const existingexpense = fetchData("expense") ?? [];
  return localStorage.setItem(
    "expense",
    JSON.stringify([...existingexpense, newItem])
  );
};

export const deleteExpence = (id) => {
  const expenseData = fetchData("expense") || [];
  const newExpense = expenseData.filter((expense) => expense.id !== id);
  return localStorage.setItem("expense", JSON.stringify(newExpense));
};

export const waitTime = () => {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 800));
};

export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

export const formatPercents = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const calculateSpentByBudget = (budgetId) => {
  const expenseData = fetchData("expense") || [];

  const expenseAmount = expenseData.reduce((acc, expense) => {
    if (expense.budgetId === budgetId) {
      acc += parseFloat(expense.amount);
    }
    return acc;
  }, 0);

  return expenseAmount;
};
