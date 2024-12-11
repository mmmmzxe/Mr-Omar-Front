import React, { useState } from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import login from '../../assets/login.svg'
import { FiEyeOff } from "react-icons/fi";
import { FaEye } from "react-icons/fa6";
const Login = () => {
  const navigate = useNavigate();

  const [logedasparent, setLoggedasparent] = useState(false);
  const [pass, setPass] = useState(80);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // State variables to capture form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password, role);

    try {
      const requestBody = { email, password, role };

      const response = await fetch("https://omarroshdy.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(data);
    

      if (response.ok) {
        console.log("Login is successful", data);

        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", JSON.stringify(data.id));
        localStorage.setItem("is_super_admin", data.user.is_super_admin);

        localStorage.setItem("userId", data.user.id);
        if (data.user.is_super_admin === 1) {
          navigate('/dashboard');
        } else {
          const studyYear = data.user.studyyear;
        
          if (studyYear === "3") {
            navigate('/lesson3');
          } else if (studyYear === "2") {
            navigate('/lesson2');
          } else if (studyYear === "1") {
            navigate('/lesson1');
          } else {
            toast.error("السنة الدراسية غير معروفة");
          }
        }
        

       

        // Optional: Generate parent code if needed
        const parentCodeResponse = await fetch(
          "https://omarroshdy.com/api/v1/generateparentcode",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.access_token}`,
            },
            body: JSON.stringify({ email }),
          }
        );

        const parentCodeData = await parentCodeResponse.json();
        if (!parentCodeResponse.ok) {
          console.error("Error:", parentCodeData.message || "Failed to generate parent code!");
        }
      } else {
        console.error("Error:", data.message || "Something went wrong!");
        toast.error("خطا فى تسجيل الدخول");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("خطا فى تسجيل الدخول");
    }
  };


  return (
    <>
        <div className={styles.login}>
          <div className={styles.container_login}>
            <div className={styles.login_wrapper}>
              <div className={styles.right}>
                <img src={login} alt="login" width={627} height={575} />
              </div>
              <div className={styles.left}>
                <div>
                  <h1 className="text-black text-center dark:text-white text-2xl md:text-4xl">سجل الدخول للمنصة</h1>
                  <p className="text-black text-center mt-4 dark:text-white text-base md:text-xl">
                    ليس لديك حساب  ؟
                    <Link to="" className="no-underline text-[#f26a40] mr-2">
                      انشأ حسابك الان
                    </Link>
                  </p>
                </div>
                <form onSubmit={handleLogin} className={styles.form_container}>
                  <label className="block text-black dark:text-white text-sm md:text-lg my-2"> البريد الاليكتروني</label>
                  <div className={styles.input_wrapper}>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={styles.form_control}
                      type="email"
                      placeholder="ادخل البريد الاليكتروني الخاص بك"
                    />
                  </div>
                  <label className="block text-black dark:text-white text-sm md:text-lg mb-1">كلمة السر</label>
                  <div className={`${styles.input_wrapper} flex justify-center items-center gap-5`}>
      <input
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.form_control}
        type={isPasswordVisible ? 'text' : 'password'} // Toggle between text and password type
        placeholder="ادخل كلمة السر الخاصة بك"
      />
      <button 
        type="button" 
        onClick={togglePasswordVisibility} 
        className="flex justify-center items-center" // You can style the button
      >
       {isPasswordVisible ? (
          <FiEyeOff className="h-5 w-5 text-gray-500" /> // Heroicon for eye-off
        ) : (
          <FaEye className="h-5 w-5 text-gray-500" /> // Heroicon for eye
        )}
      </button>
    </div>
                  <div className="w-full xl:w-[40%] mt-2 p-[2px_20px] text-center border border-[#f26a40] bg-[#f26a40] rounded-[10px]">
                    <button className="text-white w-full text-[20px] font-medium bg-transparent border-none cursor-pointer font-[Cairo]">تسجيل الدخول</button>
                  </div>
                  <p className='text-center mt-12 '>اذا كنت ولى امر ؟      
                    <b className='text-numberNotfound'> <Link to="/loginParent">سجل من هنا</Link>
                    </b>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Login;
