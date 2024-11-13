import React from "react";
import {Link} from "react-router-dom";

const Button = () => {
  return (
    <>
      <Link href="/create-account" className='m-5 text-lg no-underline w-[130px] h-[35px] text-center text-white rounded-md px-6 font-cairo font-medium bg-transparent cursor-pointer transition-all duration-300 ease-in-out relative inline-block border-none z-10 outline-none join_btn'>
        انضم الآن
      </Link>
    </>
  );
};

export default Button;

 
