import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteExpence, waitTime } from "./Helper";
import { createBudget, fetchData, createExpense } from "./Helper";
import Intro from "./Intro";

import AddbudgetForm from "./AddbudgetForm";
import AddExpenceForm from "./AddExpenceForm";
import BudgetItem from "./BudgetItem";
import TableItem from "./TableItem";
import { ChevronRight } from "lucide-react";
import Hero from "./Hero";

export const DashboardLoder = () => {
  const userData = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expense");

  return { userData, budgets, expenses };
};

export const formAction = async ({ request }) => {
  try {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data.entries());

    if (_action === "newUser") {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`welcome , ${values.userName}`);
    }

    if (_action === "createBudget") {
      await waitTime();
      try {
        createBudget({
          name: values.budget,
          amount: values.budgetAmount,
        });

        return toast.success(`budget Ceated successfully`);
      } catch (error) {
        throw new Error("there is problem to creating budget");
      }
    }
    if (_action === "createExpense") {
      await waitTime();
      try {
        createExpense({
          name: values.newExpense,
          amount: values.newExpenseAmount,
          budgetId: values.newExpenseBudget,
        });

        return toast.success(`Expense ${values.newExpense} created`);
      } catch (error) {
        throw new Error("there is problem to Adding expense");
      }
    }

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

export default function Dashboard() {
  const { userData, budgets, expenses } = useLoaderData();

  return (
    <div className="lg:w-[90%] w-[95%]    mx-auto ">
      {!userData ? (
        <Intro />
      ) : (
        <div>
          <Hero userName={userData} budget={budgets} />
          <div className="w-full grid grid-cols-1 gap-5  mt-5 md:grid-cols-2">
            <AddbudgetForm />
            {budgets && <AddExpenceForm budget={budgets} />}
          </div>

          {budgets && (
            <>
              <h2 className="text-4xl my-10 font-bold">Existing Budgets</h2>
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
                {budgets &&
                  budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
              </div>

              {expenses && expenses.length > 0 && (
                <>
                  <h2 className="text-4xl my-10 font-bold">Recent Expenses</h2>

                  <div>
                    <div className="overflow-x-scroll ">
                      {expenses && expenses.length > 0 && (
                        <TableItem
                          expenses={expenses
                            .sort((a, b) => b.createdAt - a.createdAt)
                            .slice(0, 4)}
                        />
                      )}
                    </div>
                    <div className="p-2">
                      {expenses && expenses.length > 4 && (
                        <Link
                          to="/AllExpenses"
                          className="uppercase  text-xs flex w-fit justify-center items-center bg-black text-white px-4 py-2 rounded "
                        >
                          show All <ChevronRight size={17} />
                        </Link>
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
