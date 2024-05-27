import { calculateSpentByBudget, formatCurrency } from "./Helper";
import CustomProgress from "./Progress";

export default function BudgetItem({ budget: { amount, name } }) {
  
  const spentAmount = calculateSpentByBudget(name);
  console.log(spentAmount);

  const remainingAmount = amount - spentAmount;

  return (
    <div className="border-2 p-3 border-cyan-500 rounded-lg shadow-lg bg-white">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-lg text-gray-600">
          {formatCurrency(amount)} Budgeted
        </p>
      </div>

      <div className="my-5">
        <CustomProgress value={spentAmount} max={amount} />
      </div>

      <div className="flex justify-between">
        <small className="text-cyan-500">
          {formatCurrency(spentAmount)} spent
        </small>
        <small
          className={`${
            remainingAmount < amount ? "text-red-500" : "text-gray-300"
          }`}
        >
          {formatCurrency(remainingAmount)} remaining
        </small>
      </div>
    </div>
  );
}
