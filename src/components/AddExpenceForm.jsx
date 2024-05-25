import { Plus, PlusCircle } from "lucide-react";
import { useRef, useEffect } from "react";
import { useFetcher } from "react-router-dom";
export default function AddExpenceForm({ budget }) {
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
    <div className="bg-white h-fit w-full p-3 rounded-2xl">
      <div className="  border-2 border-black rounded-2xl p-5  flex flex-col gap-5 border-dashed">
        <h2 className="text-xl capitalize font-bold">
          Add new{" "}
          <span className="text-cyan-500">
            {budget.length === 1 && `${budget.map((budg) => budg.name)}`}
          </span>{" "}
          Expense
        </h2>
        <fetcher.Form method="post" className="" ref={formRef}>
          <div className=" md:flex-row flex flex-col gap-5 my-2 w-full">
            <div className="md:w-1/2">
              <label className="font-semibold" htmlFor="newExpense">
                Expense Name
              </label>
              <input
                type="text"
                id="newExpense"
                placeholder="e.g. ,Coffee"
                required
                ref={focusRef}
                name="newExpense"
                className="border-2 border-slate-500 border-solid p-2  w-full  rounded-md focus:border-cyan-500"
              />
            </div>
            <div className="md:w-1/2">
              <label className="font-semibold" htmlFor="newExpenseAmount">
                Expense Amount
              </label>
              <input
                type="number"
                id="newExpenseAmount"
                placeholder="e.g. , $200"
                required
                step="0.01"
                name="newExpenseAmount"
                inputMode="decimal"
                className="border-2 border-slate-500 border-solid p-2 focus:border-cyan-500 w-full  rounded-md "
              />
            </div>
            <input type="hidden" value="createExpense" name="_action" />
          </div>

          <div className="my-2" hidden={budget.length === 1}>
            <label className="font-semibold" htmlFor="newExpenseBudget">
              Budget categories
            </label>
            <select
              id="newExpenseBudget"
              required
              name="newExpenseBudget"
              className="border-2 border-slate-500 border-solid p-2 focus:border-cyan-500 w-full   rounded-md "
            >
              {budget
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((bud) => (
                  <option key={bud.id} value={bud.id}>
                    {bud.name}
                  </option>
                ))}
            </select>
          </div>

          <input type="hidden" name="_action" value="createExpense" />
          <button
            type="submit "
            className="flex bg-black w-fit disabled:bg-gray-500 items-center justify-center text-white py-2 px-4 rounded-md gap-2 
            "
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Add Budget</span>
                <span>
                  {" "}
                  <PlusCircle width={15} color="white" />
                </span>
              </>
            )}
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}
