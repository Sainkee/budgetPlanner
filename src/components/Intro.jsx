import React from "react";
import { Form } from "react-router-dom";
import { User } from "lucide-react";

import illu from "../assets/illustration.jpg";
export default function Intro() {
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
        <Form method="post" className="w-full  ">
          <input
            type="text"
            className="outline-none border my-2 p-2 flex grow w-full sm:w-1/2 border-cyan-200 w-fullrounded-sm "
            required
            aria-label="userKey"
            name="userName"
            placeholder="what is your Name ?"
          />
          <input type="hidden" name="_action" value="newUser"/>

          <button
            type="submit"
            className="bg-black flex py-2 px-4 gap-2 text-white  "
          >
            Create Account <User width={20} />{" "}
          </button>
        </Form>
      </div>
      <div className=" w-full md:w-1/2 p-6 mx-auto ">
        <img src={illu} alt="person with money" />
      </div>
    </div>
  );
}
