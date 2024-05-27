import { formatPercents } from "./Helper";

export default function CustomProgress({ value, max }) {
  const percentage = (value / max) * 100;

  return (
    <div className="relative w-full h-6 bg-gray-200 rounded-md overflow-hidden">
      <div
        className="h-full bg-cyan-500 transition-all duration-800 ease-in-out rounded-md"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
