import { Outlet, useLoaderData } from "react-router-dom";

import { fetchData } from "./Helper";

import Footer from "./Footer";
import Navbar from "./Navbar";

export const MainLoader = () => {
  const userData = fetchData("userName");

  return { userData };
};

export default function MainBord() {
  const { userData } = useLoaderData();

  return (
    <>
      <Navbar userData={userData} />
      <div className="lg:w-[90%] w-[95%] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
