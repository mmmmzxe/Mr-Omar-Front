import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo1.svg";
import user from '../../assets/Image.png'
import toast from 'react-hot-toast';
import notification from '../../assets/notification.svg'
import ListItemButton from "@mui/material/ListItemButton";
const HeaderSearch = () => {
  const [theme, setTheme] = useState(localStorage.getItem("currentMode") ?? "dark");
  const [showModal, setshowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem("accessToken")]);

  useEffect(() => {
    const superAdminStatus = localStorage.getItem("is_super_admin");
    if (superAdminStatus === '1') {
      setIsSuperAdmin(true);
    } else {
      setIsSuperAdmin(false);
    }
  }, []);
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);


  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const response = await fetch("https://omarroshdy.com/api/v1/logout", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          localStorage.removeItem("is_super_admin");
          setIsLoggedIn(false);
          setIsSuperAdmin(false);
          window.dispatchEvent(new Event('storage'));
          setshowModal(false);
          navigate("/");
          toast.success("تم تسجيل الخروج بنجاح");
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          localStorage.removeItem("is_super_admin");
          setIsLoggedIn(false);
          setIsSuperAdmin(false);
          window.dispatchEvent(new Event('storage'));
          setshowModal(false);
          navigate("/");
          toast.success("تم تسجيل الخروج بنجاح");
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("is_super_admin");
        setIsLoggedIn(false);
        setIsSuperAdmin(false);
      }
    }
  };
  return (
    <div className="w-full bg-[var(--secondary)] md:sticky md:top-0 z-50">
      <div className="max-w-screen-xl mx-auto h-20 flex items-center justify-between px-4 lg:px-0">
        <button onClick={() => setshowModal(true)} className="menu icon-menu flex items-center mr-2"></button>
        <div />
        {/* Logo */}
        <Link to={""}>
          <img src={logo} alt="logo" className="w-40 md:w-44" />
        </Link>
        <div className="hidden md:block">
          <h2 className="font-medium text-base 2xl:text-xl xl:text-lg text-black dark:text-white">لوحه التحكم</h2> - <span className="2xl-text-lg text-sm text-numberNotfound">الخاصة بمنصة مستر عمر رشدي</span>
        </div>
        {/* SearchBar */}
        <div className="md:inline-flex max-w-48 ml-2 2xl:max-w-xl md:max-w-60 lg:max-w-96 lg:ml-0 md:ml-2 w-full relative">
          <input
            type="text"
            placeholder="بحث ....."
            className="w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-1 focus:ring-darkText sm:text-sm px-4 py-2"
          />

          <IoSearchOutline className="absolute text-black top-2.5 left-4 text-xl" />

        </div>
        {/* SearchBar */}


        {/* Menubar */}
        <div className="flex items-center md:gap-x-6 gap-x-3 text-2xl lg:ml-4 2xl:ml-0 ml-4">
          <Link to={"/profile"}>
            <img src={user} className="hover:text-skyText duration-200 cursor-pointer" />
          </Link>
          <Link to={"/favorite"} className="relative block ">
            <img src={notification} className="hover:text-skyText duration-200 cursor-pointer" />

          </Link>
          <button onClick={() => {
            localStorage.setItem("currentMode", theme === "dark" ? "light" : "dark");
            setTheme(localStorage.getItem("currentMode"));
          }} className="mode moon_responsive flex items-center">
            {theme === "dark" ? (
              <span className="icon-moon-o"> </span>
            ) : (
              <span className="icon-sun"> </span>
            )}
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed">
          <ul className="modal">
            <li>
              <button
                className="icon-close"
                onClick={() => {
                  setshowModal(false);
                }}
              />
            </li>
            <li>
              <ListItemButton to="/dashboard" onClick={() => setshowModal(false)}>نظره عامه</ListItemButton>
            </li>
            <li>
              <ListItemButton to="/dashboard/all_Student" onClick={() => setshowModal(false)}>بيانات الطلاب</ListItemButton>
            </li>
            <li>
              <ListItemButton to="/dashboard/all_lecture" onClick={() => setshowModal(false)}>جميع المحاضرات</ListItemButton>
            </li>

            <li>
              <ListItemButton to="/dashboard/upload" onClick={() => setshowModal(false)}>رفع المحاضرات</ListItemButton>
            </li>
            <li>
              <ListItemButton to="/dashboard/quiz" onClick={() => setshowModal(false)}>انشاء كويز</ListItemButton>
            </li>
            <li>
              <ListItemButton to="/dashboard/all_Quiz" onClick={() => setshowModal(false)}>الاختبارات</ListItemButton>
            </li>
            <li>
              <ListItemButton to="/dashboard/result" onClick={() => setshowModal(false)}>نتائج الاختبارت</ListItemButton>
            </li>
            <li>
              <ListItemButton to="/dashboard/finacial" onClick={() => setshowModal(false)}>التقارير الماليه</ListItemButton>
            </li>
            <li>
              <ListItemButton to="/" onClick={() => setshowModal(false)}>الرجوع الى المنصه</ListItemButton>
            </li> 
            <li>
              <ListItemButton to="/" onClick={handleLogout}>تسجيل الخروج</ListItemButton>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HeaderSearch