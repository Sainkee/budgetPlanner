import React from "react";
import logomark from "../assets/logomark.svg";
import { Form, Link } from "react-router-dom";

import { toast } from "react-toastify";
export default function Navbar({ userData }) {
  return (
    <nav className="py-4 w-full  bg-white ">
      <div className=" mx-auto px-6 flex justify-between">
        <Link to="/">
          <div className="flex items-center gap-2  h-10 rounded-md border border-transparent p-2  hover:border hover:border-cyan-500">
            <img
              src={logomark}
              aria-label="go to home"
              alt="home logo"
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold text-gray-800">
              HomeBudget
            </span>
          </div>
        </Link>
        {userData && (
          <Form
            action="/logout"
            method="post"
            onSubmit={(e) => {
              if (!confirm("Do you want to delete this user?")) {
                e.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className="border border-red-500 rounded-md px-4 py-2 text-red-400"
            >
              Delete User
            </button>
          </Form>
        )}
      </div>
    </nav>
  );
}
