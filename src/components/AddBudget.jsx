

export default function AddBudget({userName,budget}) {
  return (
    <div className=" w-full mx-auto">
      <h1 className="text-6xl font-bold  text-black mt-10">
        {" "}
        Welcome Back , <span className="text-cyan-400">{userName}</span>
      </h1>

      {!budget ? (
        <>
          <p className="text-2xl mt-2">
            Personal budgeting is the secret to financial freedom.
          </p>
          <p className="text-2xl mt-2"> Create a budget to get started!</p>
        </>
      ) : (
        <p className="text-2xl mt-2">
          You have existing budgets. Create a new budget or manage existing
          ones!
        </p>
      )}
    </div>
  );
}
