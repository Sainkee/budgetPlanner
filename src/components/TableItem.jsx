import React from "react";
import { formatCurrency } from "./Helper";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "lucide-react";

export default function TableItem({ expenses }) {
  const fecher = useFetcher();

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-cyan-500  text-white">
        <tr>
          {["Name", "Amount", "Date", "budget", ""].map((item, index) => (
            <th
              key={index}
              className="px-6 py-3 text-left text-xl font-medium  uppercase tracking-wider"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {expenses.map((expense, index) => (
          <tr key={index} className=" text-sm text-gray-500">
            <td className="px-6 py-4 whitespace-nowrap ">{expense.name}</td>
            <td className="px-6 py-4 whitespace-nowrap ">
              {formatCurrency(expense.amount)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap ">
              {new Date(expense.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-white  ">
              <Link
                to={`/budget/${expense.budgetId}`}
                className="bg-cyan-500/70  px-6 py-2 rounded-md"
              >
                {" "}
                {expense.budgetId}
              </Link>
            </td>
            <td>
              <fecher.Form method="post">
                <input type="hidden" name="_action" value="deleteExpense" />
                <input type="hidden" name="expenseId" value={expense.id} />
                <button
                  type="submit"
                  className="bg-red-500/70 px-6 py-2 rounded-md"
                >
                  <TrashIcon size={17} />
                </button>
              </fecher.Form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
