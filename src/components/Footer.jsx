import React from "react";
import foot from "../assets/wave.svg";
export default function Footer() {
  return (
    <div
      className=" h-[100px] mt-20 bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${foot})` }}
    ></div>
  );
}
