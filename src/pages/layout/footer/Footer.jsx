import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLocationArrow,
} from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from '../../../assets/Logo1.svg'
import './footer.css'
const FooterLinks = [
  {
    title: "الرئيسيه",
    link: "/",
  },
  {
    title: "التسعير",
    link: "/about",
  },
  {
    title: "تواصل معنا",
    link: "/contact",
  },
  {
    title: "تسجيل الدخول",
    link: "/login",
  },
  {
    title: "انشاء حساب",
    link: "/signup",
  },
];
const InformationLinks = [
  {
    title: "الخصوصيه",
    link: "",
  },
  {
    title: "كيفيه الاستخدام",
    link: "",
  },
  {
    title: "تقديم الخدمات",
    link: "",
  },


];

const Footer = () => {
  return (
    <>
      <div className="container1 grid md:grid-cols-2 lg:grid-cols-3 pb-20 ">
        {/* manasa details */}
        <div className="py-8 -mt-8">
          <Link
            to="/"
            className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl
"
          >
            <img src={logo} alt="logo" />
          </Link>
          <p className="text-gray-600 dark:text-white/70  lg:pr-24 pt-3">
            مع منصة عمر رشدي في الفيزياء، يمكنك تنظيم دروسك ومتابعة تقدم طلابك بكل سهولة.نحن هنا لتقديم الأدوات التي تحتاجها لتجربة تعليمية أكثر سلاسة وفعالية
          </p>
        </div>

        {/* mansa links */}
        <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 ">
          <div className="py-8">
            <h1 className="text-xl font-bold sm:text-left mb-3 text-black dark:text-white">
              Quick Links
            </h1>
            <ul className="space-y-3">
              {FooterLinks.map((data, index) => (
                <li key={index}>
                  <a
                    href={data.link}
                    className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300"
                  >
                    {data.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="py-8">
            <h1 className="text-xl font-bold sm:text-left mb-3 text-black dark:text-white">
              Information
            </h1>
            <ul className="space-y-3">
              {InformationLinks.map((data, index) => (
                <li key={index}>
                  <a
                    href={data.link}
                    className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300"
                  >
                    {data.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* mansa Address */}
          <div className="py-8 col-span-2 sm:col-auto">
            <h1 className="text-xl font-bold sm:text-left mb-3 text-black dark:text-white">Address</h1>
            <div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FaLocationArrow className="text-3xl" />
                <p> طنطا شارع المعتصم بين سعيد والحلو</p>
              </div>
              <div className="flex items-center gap-3 mt-6 text-gray-600 dark:text-gray-400">
                <IoMdMail className="text-xl" />
                <p>info@omarroshdy.com</p>
              </div>
              <div className="flex items-center gap-3 mt-6 text-gray-600 dark:text-gray-400">
                <FaMobileAlt className="text-xl" />
                <p>+20 1069235832</p>
              </div>

              {/* social links */}
              <div className="flex items-center gap-5 mt-6 text-gray-600 dark:text-gray-400">
                <Link to="https://www.instagram.com/mr.omarroshdy/"
                  target="_blank">
                  <FaInstagram className="text-3xl hover:text-[#f26a40] duration-300" />
                </Link>
                <Link to="https://www.facebook.com/0marR0shdy"
                  target="_blank">
                  <FaFacebook className="text-3xl hover:text-[#f26a40] duration-200" />
                </Link>
                <Link to="https://www.youtube.com/@-omarroshdy4762"
                  target="_blank">
                  <FaYoutube className="text-3xl hover:text-[#f26a40] duration-200" />
                </Link>
                <Link to="https://www.tiktok.com/@omarroshdy29"
                  target="_blank">
                  <FaTiktok className="text-3xl hover:text-[#f26a40] duration-200" />
                </Link>
              </div>
            </div>
          </div>


        </div>

      </div>
      <p className="footer_component flex items-end justify-center py-8 text-black dark:text-white">© 2024 By <Link className="hover:text-orange-500" to='https://notfound-agency.com/'>NotFound Agency</Link>  All rights reserved.</p>
    </>

  );
};

export default Footer;
