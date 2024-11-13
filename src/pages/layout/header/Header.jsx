import { useEffect, useState, useRef } from "react";
import "./header.css";
import logo from '../../../assets/Logo1.svg';
import { Link, useNavigate, NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import toast from 'react-hot-toast';

const nav__links = [
  { display: "الرئيسيه", path: "/" },
  { display: "التسعير", path: "/pricing" },
  { display: "تواصل معنا", path: "/contact" },
  { display: "حسابى", path: "/information" },
];

const Header = () => {
  const headerRef = useRef(null);
  const [showModal, setshowModal] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("currentMode") ?? "dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // الـ useEffect التالي سيقوم بتحديث الحالة عند تغيير قيمة التوكين في localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem("accessToken")]);

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header_shrink");
      } else {
        headerRef.current.classList.remove("header_shrink");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          setIsLoggedIn(false);
          window.dispatchEvent(new Event('storage'));
          setshowModal(false);
          navigate("/");
          toast.success("تم تسجيل الخروج بنجاح");
        } else {
          console.error("Logout failed!");
          toast.error("فشل فى  تسجيل الخروج  ");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  return (
    <header className="flex items-center container1" ref={headerRef}>
      <button onClick={() => setshowModal(true)} className="menu icon-menu flex items-center"></button>
      <div />
      <Link to="/">
        <div className="logo_img">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <nav>
        <ul className="flex items-center mx-0">
          {nav__links
            .filter((item) => {
              if (!isLoggedIn && item.display === "حسابى") {
                return false; // إخفاء رابط "حسابى" عندما لا يكون المستخدم مسجلاً الدخول
              }
              return true;
            })
            .map((item, index) => (
              <li key={index}>
                <NavLink to={item.path} className={(navClass) => navClass.isActive ? "active__menu" : ""}>
                  {item.display}
                </NavLink>
              </li>
            ))}
          {isLoggedIn && (
            <li>
              <NavLink onClick={handleLogout}>تسجيل الخروج</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className="my-5 flex items-center justify-center 2xl:mx-8 xl:gap-5 gap-3 sub_Link">
        {!isLoggedIn && (
          <ul className="flex items-center signin">
            <li>
              <Link to="/login">
                <button className="px-4 py-2 whitespace-nowrap text-base font-semibold rounded-md border-none cursor-pointer transition duration-300 ease-in-out bg-[#f26a40] text-black dark:text-white hover:text-white">
                  تسجيل الدخول
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signUp">
                <button className="px-4 py-2 whitespace-nowrap text-base font-semibold rounded-md border-none cursor-pointer transition duration-300 ease-in-out bg-[#f26a40] text-black dark:text-white hover:text-white">
                  انشاء حساب
                </button>
              </Link>
            </li>
          </ul>
        )}
        {!isLoggedIn && (
          <Link to="/login" className="icon_user flex items-center">
            <FiUser />
          </Link>
        )}
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
              <Link to="/" onClick={() => setshowModal(false)}>الرئيسيه</Link>
            </li>
            <li>
              <Link to="/pricing" onClick={() => setshowModal(false)}>التسعير</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setshowModal(false)}>تواصل معنا</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/information" onClick={() => setshowModal(false)}>حسابى</Link>
                </li>
                <li>
                  <Link to="/" onClick={handleLogout}>تسجيل الخروج</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={() => setshowModal(false)}>تسجيل الدخول</Link>
              </li>
            )}
          </ul>
        </div>
      )}


    </header>
  );
};

export default Header;