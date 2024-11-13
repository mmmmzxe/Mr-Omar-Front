import React from "react";
import { Link } from "react-router-dom";

const ButtonLesson3 = () => {
  return (
    <>
      <Link
        to="/lesson3"
        className="mb-2.5 md:mb-2.5 text-white cursor-pointer text-[16px] font-[cairo] font-normal leading-[45px] max-w-[160px] relative no-underline w-[150px] h-[40px] block text-center border-0 outline outline-1 outline-[rgba(255,255,255,0.5)] outline-offset-0 shadow-inner transition-all duration-[1250ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:border hover:border-white hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.5),_0_0_20px_rgba(255,255,255,0.2)] hover:outline-[rgba(255,255,255,0)] hover:outline-offset-[15px] hover:text-shadow-[1px_1px_2px_#427388]"
      >
        عرض الدرس
      </Link>
    </>
  );
};

export default ButtonLesson3;
