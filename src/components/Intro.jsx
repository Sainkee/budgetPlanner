import React, { useRef, useState } from "react";
import { Form, useFetcher } from "react-router-dom";
import { User } from "lucide-react";

import illu from "../assets/illustration.jpg";
// google authorization

export default function Intro() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const [val, seVal] = useState(null);

  return (
    <div className=" md:flex-row flex flex-col gap-10 justify-center items-center my-20 ">
      <div>
        <h1 className="capitalize text-4xl md:text-6xl lg:7xl my-2 font-bold">
          Take care of <br />
          <span className="text-cyan-600">your money</span>
        </h1>

        <p className="text-xl">
          personal budgeting is a secreat to financial freedom start your
          journey today.
        </p>
        <fetcher.Form method="post" className="w-full  ">
          <input
            onChange={(e) => seVal(e.target.value)}
            type="text"
            className="outline-none border my-2 p-2 flex grow w-full sm:w-1/2 border-cyan-200 w-fullrounded-sm "
            aria-label="userKey"
            name="userName"
            placeholder="what is your Name ?"
          />
          <input type="hidden" name="_action" value="newUser" />

          <div className="flex gap-5 pt-2 ">
            <button
              type="submit"
              className="bg-blue-500 disabled:bg-slate-500 hover:bg-blue-600 text-white py-2 px-4 gap-2 flex items-center rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  Logging in... <span className="animate-spin">&#9696;</span>
                </>
              ) : (
                <>{!val ? <>Login with Google</> : <>Login</>}</>
              )}
            </button>
          </div>
        </fetcher.Form>
      </div>
      <div className=" w-full md:w-1/2 p-6 mx-auto ">
        <img src={illu} alt="person with money" />
      </div>
    </div>
  );
}
