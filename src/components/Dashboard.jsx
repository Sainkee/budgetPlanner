import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { waitTime } from "./Helper";
import { createBudget, fetchData, createExpense } from "./Helper";
import Intro from "./Intro";
import AddBudget from "./AddBudget";
import AddbudgetForm from "./AddbudgetForm";
import AddExpenceForm from "./AddExpenceForm";
import BudgetItem from "./BudgetItem";

export const DashboardLoder = () => {
  const userData = fetchData("userName");
  const budgets = fetchData("budgets");

  return { userData, budgets };
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
          expenseId: values.newExpenseAmount,
        });

        return toast.success(`Expense ${values.newExpense} created`);
      } catch (error) {
        throw new Error("there is problem to Adding expense");
      }
    }
  } catch (error) {
    console.error("Error processing form data:", error);
    throw new error(); //
  }
};

export default function Dashboard() {
  const { userData, budgets } = useLoaderData();

  return (
    <div className="lg:w-[90%] w-[95%]    mx-auto ">
      {!userData ? (
        <Intro />
      ) : (
        <div>
          <AddBudget userName={userData} budget={budgets} />
          <div className="w-full flex flex-col gap-5  mt-5 md:flex-row">
            <AddbudgetForm userName={userData} budget={budgets} />
            <AddExpenceForm budget={budgets} />
          </div>

          <h2 className="text-4xl my-10 font-bold">Existing Budgets</h2>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
            {budgets &&
              budgets.map((budget) => (
                <BudgetItem key={budget.id} budget={budget} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
