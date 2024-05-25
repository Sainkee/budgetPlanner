import React from "react";
import { Home, Undo2 } from "lucide-react";
import { Link, useRouteError, useNavigate } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  let navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col justify-center items-center text-center gap-5 mt-20 w-[80%] mx-auto p-5 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-6xl font-bold text-red-600">
        Uh oh! I got some error
      </h1>
      <h2 className="text-xl text-gray-700">{error.message}</h2>

      <div className="flex gap-5 mt-5">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          <Home width={20} />
          Go to Home
        </Link>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={goBack}
        >
          <Undo2 width={20} />
          Go Back
        </button>
      </div>
    </div>
  );
}
