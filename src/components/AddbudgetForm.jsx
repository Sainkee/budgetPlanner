import { CircleDollarSign } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

export default function AddBudget({ userName, budgets }) {
  console.log(budgets);
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    < div className="bg-white w-full p-3 rounded-2xl">
      <fetcher.Form method="post" className="" ref={formRef}>
        <div className=" border-2 border-black rounded-2xl p-5  flex flex-col gap-5 border-dashed">
          <h2 className="text-xl capitalize font-bold">Create budget</h2>
          <div className="flex flex-col ">
            <label className="font-semibold" htmlFor="budgets">
              Budget Name
            </label>
            <input
              type="text"
              id="budget"
              placeholder="e.g. ,Groceries"
              required
              ref={focusRef}
              name="budget"
              className="border-2 border-slate-500 border-solid p-2  w-full md:w-2/3 rounded-md focus:border-cyan-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="budgetAmount">
              Budget Amount
            </label>
            <input
              type="number"
              id="budgetAmount"
              placeholder="e.g. , $250"
              required
              step="0.01"
              name="budgetAmount"
              inputMode="decimal"
              className="border-2 border-slate-500 border-solid p-2 focus:border-cyan-500 w-full md:w-2/3 rounded-md "
            />
          </div>
          <input type="hidden" name="_action" value="createBudget" />
          <button
            type="submit "
            className="flex bg-black w-fit disabled:bg-gray-500 items-center justify-center text-white py-2 px-4 rounded-md gap-2 "
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Create Budget</span>
                <span>
                  {" "}
                  <CircleDollarSign width={15} color="white" />
                </span>
              </>
            )}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}
