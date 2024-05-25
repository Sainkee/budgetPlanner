import { calculateSpentByBudget, formateCurrency } from "./Helper";
import CustomProgress from "./Progress";

export default function BudgetItem({ budget }) {
  const { name, amount,id } = budget;
  const spentAmount = calculateSpentByBudget(id)
  return (
    <div className="border-2  p-3 border-cyan-500 rounded-lg shadow-lg   bg-white">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-lg text-gray-600 ">{formateCurrency(amount)} Budgeted</p>
      </div>

      <div className="my-5">
        <CustomProgress value={`${amount}`} max={100} />
      </div>

      <div className="flex justify-between">
        <small className="text-cyan-500">{formateCurrency(spentAmount)} spent</small>
        <small>... remaining</small>
      </div>
    </div>
  );
}
