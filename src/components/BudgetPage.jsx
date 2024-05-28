import React from "react";

import { getAllMatching } from "./Helper"; // Corrected function name
import { useLoaderData } from "react-router-dom";

export const budgetLoader = ({ params }) => {
  const budget = getAllMatching({
    category: "budgets",
    key: params.id,
    value: params.id,
  });


  return {budget};
};

export default function BudgetPage() {
    const {budget} = useLoaderData()

  return (
    <div>
      <h1 className="text-6xl font-bold capitalize text-black mt-10">
        <span className="text-cyan-400">{budget.id} </span> Overview
      </h1>
    </div>
  );
}
