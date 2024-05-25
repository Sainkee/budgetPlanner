export default function CustomProgress({ value, max }) {
  return (
    <div className="relative w-full h-6 bg-gray-200 rounded-md overflow-hidden">
      <div
        className="h-full bg-cyan-500 rounded-md"
        style={{ width: `${(max/value ) * 100}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-semibold">
        {Math.round((value / max) * 100)}%
      </span>
    </div>
  );
}
