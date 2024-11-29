import { useState } from "react";
import styles from "./signUp.module.css";
import { Link } from "react-router-dom";
import img1 from '../../assets/signup.svg'
import done_img from '../../assets/done.svg'
import toast from 'react-hot-toast';
const SignUp = () => {
  const [done, setDone] = useState(false);
  const [toggle, setToggle] = useState(true);

  // State variables to capture form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studyYear, setStudyYear] = useState("1");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password_confirmation) {
      alert("كلمة السر غير متطابقة");
      return;
    }

    try {
      const requestBody = {
        name: name,
        email: email,
        studyyear: studyYear,
        password: password,
        password_confirmation: password_confirmation,
      };

      const response = await fetch("https://omarroshdy.com/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setDone(true);
        setToggle(false);
        toast.success("تم تسجيل الحساب بنجاح");

        // تخزين بيانات المستخدم في localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log("Account created successfully!", data);
      } else {
        alert(`Error: ${data.message || "Something went wrong!"}`);
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Failed to create an account. Please try again later.");
    }
  };



  return (
    <>
      {toggle && (
        <div className={styles.container}>
          <div className={styles.right_side}>
            <img src={img1} alt="signup" width={642} height={750} />
          </div>
          <div className={styles.left_side}>
            <div className={styles.info}>
              <h1 className="dark:text-white text-black text-2xl md:text-4xl">ابدأ سجل اكونت معانا</h1>
              <p className="dark:text-white  text-black text-base md:text-xl">
                لديك أكونت بالفعل  ؟
                <Link to="/login" className={styles.login}>
                  سجل الدخول
                </Link>
              </p>
            </div>
            <form onSubmit={handleSubmit} className={styles.form_container}>
              <div className={styles.name_container}>
                <label className="block dark:text-white  text-black text-sm md:text-lg mb-1">الاسم بالكامل</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={styles.input}
                  type="text"
                  placeholder="ادخل الاسم بالكامل"
                />
              </div>
              <div className={styles.name_container}>
                <label className="block dark:text-white text-black text-sm md:text-lg mb-1">البريد الإلكتروني</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                  type="email"
                  placeholder="ادخل بريدك الإلكتروني"
                />
              </div>
              <div className={styles.name_container}>
                <label className="block dark:text-white  text-black text-sm md:text-lg mb-1">السنه الدراسيه </label>
                <select
                  onChange={(e) => setStudyYear(e.target.value)}
                  name="study-year"
                  id="study-year"
                  className={styles.input}
                >
                  <option className="text-black" value="1">
                    الصف الاول الثانوي
                  </option>
                  <option className="text-black" value="2">
                    الصف الثاني الثانوي
                  </option>
                  <option className="text-black" value="3">
                    الصف الثالث الثانوي
                  </option>
                </select>
              </div>

              <div className={styles.name_container}>
                <label className="block dark:text-white text-black text-sm md:text-lg mb-1">كلمة السر</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.input}
                  type="password"
                  placeholder="ادخل كلمة السر الخاصة بك"
                />
              </div>
              <div className={styles.name_container}>
                <label className="block dark:text-white text-black text-sm md:text-lg mb-1">تأكيد كلمة السر</label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={styles.input}
                  type="password"
                  placeholder="تأكيد كلمة السر الخاصة بك"
                />
              </div>

              <div className="w-full p-[2px_20px] text-center border border-[#f26a40] bg-[#f26a40] rounded-[10px]">
                <button className="text-white w-full text-[20px] font-medium bg-transparent border-none cursor-pointer font-[Cairo]">انشأ حسابك</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* After creating Account */}
      {done && (
        <div className="text-center my-8 w-[930px] h-[465px] mx-auto shadow-[0_20px_40px_0_rgba(0,0,0,0.07)]">
          <img
            className={styles.icons}
            src={done_img}
            alt="done"
            width={275}
            height={275}
          />
          <h3 className="text-black dark:text-white md:my-5 text-xl md:text-4xl">تم تسجيل بيانات إنشاء حسابك شكرا علي ثقتك بنا ! </h3>
        </div>
      )}
    </>
  );
};

export default SignUp;
