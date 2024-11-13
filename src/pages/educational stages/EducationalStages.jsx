import React, { useEffect, useState } from "react";
import styles from "./EducationalStages.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
import ButtonLesson1 from "../lesson/lesson1/ButtonLesson1";
import ButtonLesson2 from "../lesson/lesson2/ButtonLesson2";
import ButtonLesson3 from "../lesson/lesson3/ButtonLesson3";

const EducationalStages = () => {
  const [studyYear, setStudyYear] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // حالة لتحديد إذا كان المستخدم قد سجل دخولًا أم لا

  // AOS
  useEffect(() => {
    Aos.init({
      once: false,
      duration: 1200,
    });

    // جلب بيانات المستخدم من localStorage في البداية
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setIsSuperAdmin(user.is_super_admin === 1); // تحديد ما إذا كان المستخدم super admin
      setStudyYear(user.studyyear); // جلب year من بيانات المستخدم
      setIsLoggedIn(true); // تحديد أن المستخدم قد سجل دخولًا
    } else {
      setIsLoggedIn(false); // إذا كانت البيانات غير موجودة، المستخدم لم يقم بتسجيل الدخول
    }

    // بيخزن حاله المستخدم
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setIsSuperAdmin(user.is_super_admin === 1);
        setStudyYear(user.studyyear);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // تنظيف storage  عند إلغاء التفعيل
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className={styles.educational_Stages}>
      {isLoggedIn ? (
        // إذا كان المستخدم مسجل دخول، عرض المحتوى بناءً على studyYear و isSuperAdmin
        <>
          {isSuperAdmin ? (
            // إذا كان المستخدم Super Admin، اعرض جميع الـ Cards
            <>
              <div data-aos="fade-up" data-aos-delay="100" className={styles.educational_Stages1}>
                <div>
                  <h1 className="text-lg pr-5 my-1.5 md:pr-0 md:text-2xl">الصف الاول الثانوي</h1>
                  <p className="text-sm pr-5 my-1.5 md:pr-0 md:text-lg">
                    استكشاف جميع الدروس والمواد التعليمية للصف الأول الثانوي
                  </p>
                </div>
                <div>
                  <ButtonLesson1 />
                </div>
              </div>

              <div data-aos="fade-up" data-aos-delay="200" className={styles.educational_Stages1}>
                <div>
                  <h1 className="text-lg md:text-2xl pr-5 my-1.5 md:pr-0">الصف الثانى الثانوي</h1>
                  <p className="text-sm md:text-lg pr-5 my-1.5 md:pr-0">
                    استكشاف جميع الدروس والمواد التعليمية للصف الثاني الثانوي
                  </p>
                </div>
                <div>
                  <ButtonLesson2 />
                </div>
              </div>

              <div data-aos="fade-up" data-aos-delay="300" className={styles.educational_Stages1}>
                <div>
                  <h1 className="text-lg md:text-2xl pr-5 my-1.5 md:pr-0">الصف الثالث الثانوي</h1>
                  <p className="text-sm md:text-lg pr-5 my-1.5 md:pr-0">
                    استكشاف جميع الدروس والمواد التعليمية للصف الثالث الثانوي
                  </p>
                </div>
                <div>
                  <ButtonLesson3 />
                </div>
              </div>
            </>
          ) : (
            // إذا لم يكن المستخدم Super Admin، عرض المحتوى بناءً على year
            <>
              {studyYear === "1" && (
                <div data-aos="fade-up" data-aos-delay="100" className={styles.educational_Stages1}>
                  <div>
                    <h1 className="text-lg pr-5 my-1.5 md:pr-0 md:text-2xl">الصف الاول الثانوي</h1>
                    <p className="text-sm pr-5 my-1.5 md:pr-0 md:text-lg">
                      استكشاف جميع الدروس والمواد التعليمية للصف الأول الثانوي
                    </p>
                  </div>
                  <div>
                    <ButtonLesson1 />
                  </div>
                </div>
              )}

              {studyYear === "2" && (
                <div data-aos="fade-up" data-aos-delay="200" className={styles.educational_Stages1}>
                  <div>
                    <h1 className="text-lg md:text-2xl pr-5 my-1.5 md:pr-0">الصف الثانى الثانوي</h1>
                    <p className="text-sm md:text-lg pr-5 my-1.5 md:pr-0">
                      استكشاف جميع الدروس والمواد التعليمية للصف الثاني الثانوي
                    </p>
                  </div>
                  <div>
                    <ButtonLesson2 />
                  </div>
                </div>
              )}

              {studyYear === "3" && (
                <div data-aos="fade-up" data-aos-delay="300" className={styles.educational_Stages1}>
                  <div>
                    <h1 className="text-lg md:text-2xl pr-5 my-1.5 md:pr-0">الصف الثالث الثانوي</h1>
                    <p className="text-sm md:text-lg pr-5 my-1.5 md:pr-0">
                      استكشاف جميع الدروس والمواد التعليمية للصف الثالث الثانوي
                    </p>
                  </div>
                  <div>
                    <ButtonLesson3 />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        // إذا لم يكن المستخدم مسجل دخول، اعرض جميع الكروت
        <>
          <div data-aos="fade-up" data-aos-delay="100" className={styles.educational_Stages1}>
            <div>
              <h1 className="text-lg pr-5 my-1.5 md:pr-0 md:text-2xl">الصف الاول الثانوي</h1>
              <p className="text-sm pr-5 my-1.5 md:pr-0 md:text-lg">
                استكشاف جميع الدروس والمواد التعليمية للصف الأول الثانوي
              </p>
            </div>
            <div>
              <ButtonLesson1 />
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="200" className={styles.educational_Stages1}>
            <div>
              <h1 className="text-lg md:text-2xl pr-5 my-1.5 md:pr-0">الصف الثانى الثانوي</h1>
              <p className="text-sm md:text-lg pr-5 my-1.5 md:pr-0">
                استكشاف جميع الدروس والمواد التعليمية للصف الثاني الثانوي
              </p>
            </div>
            <div>
              <ButtonLesson2 />
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="300" className={styles.educational_Stages1}>
            <div>
              <h1 className="text-lg md:text-2xl pr-5 my-1.5 md:pr-0">الصف الثالث الثانوي</h1>
              <p className="text-sm md:text-lg pr-5 my-1.5 md:pr-0">
                استكشاف جميع الدروس والمواد التعليمية للصف الثالث الثانوي
              </p>
            </div>
            <div>
              <ButtonLesson3 />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EducationalStages;
