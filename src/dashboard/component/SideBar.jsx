import { useEffect, useState, useRef } from "react";
import styles from "./sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import nav_link from '../../assets/data/dashboard';
import ListItemButton from "@mui/material/ListItemButton";
import img5 from "../../assets/logout.svg";
import toast from 'react-hot-toast';

const SideBar = () => {
  const navigate = useNavigate()
  const location = useLocation;
  const [showModal, setshowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
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
    <div className="sidebar bg-[#AABED11A] w-[0px] hidden  md:w-[250px] min-h-screen md:flex">
      <div className="w-[230px] shadow-[0_0_10px_#ddd] p-5 relative">
        <h3 className="home_title relative mb-5 md:hidden mt-0">لوحه التحكم</h3>
        <ul>
          {nav_link.map((item, index) => (
            <li key={index}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '10px',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  backgroundColor:
                    location.pathname === item.path ? 'rgba(241,100,55,0.2)' : 'inherit',
                  color: location.pathname === item.path ? 'var(--title)' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'rgba(241,100,55,0.2)',
                    color: 'var(--title)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <img src={item.img} alt="img" />
                <span className="lg:mr-2 md:ml-3 text-base hidden md:block text-black dark:text-white">
                  {item.display}
                </span>
              </ListItemButton>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <img src={img5} />
            <Link to="/" onClick={handleLogout} className=" p-2  rounded-md lg:mr-2 md:ml-3 text-base hidden md:block text-black dark:text-white" >تسجيل الخروج</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
