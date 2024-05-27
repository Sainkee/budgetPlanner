import React from "react";
import { deleteExpence, fetchData } from "./Helper";
import { Link, useLoaderData } from "react-router-dom";
import TableItem from "./TableItem";
import { toast } from "react-toastify";
import { Home } from "lucide-react";

// Loader function to fetch expenses
export const expenseLoader = () => {
  const expenses = fetchData("expense");
  return { expenses };
};

export const deleteAction = async ({ request }) => {
  try {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data.entries());
    if (_action === "deleteExpense") {
      const deleteExpenseId = values.expenseId;
      try {
        deleteExpence(deleteExpenseId);

        return toast.success(`Expense deleted`);
      } catch (error) {
        throw new Error("there is problem to deleting expense");
      }
    }
  } catch (error) {
    console.error("Error processing form data:", error);
    throw new error(); //
  }
};

export default function AllExpense() {
  const { expenses } = useLoaderData();

  return (
    <div className="lg:w-[90%] w-[95%] mx-auto mt-5">
      <h1 className="capitalize text-4xl md:text-6xl lg:7xl my-2 font-bold">
        All Expenses
      </h1>
      {expenses && expenses.length > 0 ? (
        <>
          <h2 className="text-4xl my-10 font-semibold">
            Recent Expenses{" "}
            <small className="text-xs">({expenses.length} total)</small>
          </h2>
          <div className="overflow-x-scroll">
            <TableItem expenses={expenses} />
          </div>
        </>
      ) : (
        <>
          <p className="text-xl my-10">No expenses found!</p>
          <Link
            className="px-4 py-2 rounded-sm  bg-cyan-500 w-fit justify-center items-center gap-2 flex whitespace-nowrap text-white  "
            to="/"
          >
            Go to home <Home size={17} />
          </Link>
        </>
      )}
    </div>
  );
}
