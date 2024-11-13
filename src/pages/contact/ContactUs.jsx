import React, { useState } from "react";
import styles from "./contact.module.css";
import img_email from '../../assets/gray-email.svg';
import email from '../../assets/email.svg';
import phone from '../../assets/phone.svg';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Page = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const subject = "omarrasdywebsite";
    const name = `${firstName} ${lastName}`;
    const hisemail = emailInput;
    const content = message;

    const body = {
      subject,
      name,
      hisemail,
      content
    };

    try {
      const response = await fetch('https://omarroshdy.com/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('حدث خطأ أثناء الإرسال');
      }
      setFirstName('');
      setLastName('');
      setEmailInput('');
      setMessage('');

      console.log('تم إرسال الرسالة بنجاح');
      toast.success("تم إرسال الرسالة بنجاح");
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء الإرسال");
    }
  };

  return (
    <div className={`${styles.contact_container} flex justify-evenly rtl pt-10 mt-16`}>
      <div className={`${styles.right_section} mt-20 h-[330px] w-[400px] text-center`}>
        <h1 className={`${styles.right_heading} font-semibold text-5xl mb-5`}>تواصل معنا</h1>
        <p className={`${styles.help} font-medium md:text-2xl text-base md:leading-[40px] leading-[20px] dark:text-white text-black`}>
          نحن هنا لمساعدتك! تواصل مع فريقنا بأكثر من طريقة، سواء عبر الهاتف،
          البريد الإلكتروني، أو من خلال ملء النموذج
        </p>
        <div className={`${styles.contact_icons_container} flex flex-col mt-4 gap-2 pr-6 md:pr-0`}>
          <div className={`${styles.contact_icons} flex items-center justify-start gap-2.5`}>
            <img
              src={email}
              alt="email"
              height={24}
              width={24}
              priority={true}
            />
            <p className='dark:text-white text-black font-normal text-lg'>omarroshdy14@gmail.com</p>
          </div>
          <div className={`${styles.contact_icons} flex items-center justify-start gap-2`}>
            <img
              src={phone}
              alt="phone"
              height={24}
              width={24}
              priority={true}
            />
            <p className='dark:text-white text-black font-normal text-lg'>+20 1069235832</p>
          </div>
        </div>
      </div>

      {/* Left Section */}
      <div className={styles.left_section}>
        <h1 className='dark:text-white text-black font-semibold text-3xl mr-7 mt-2'>اترك لنا رسالة</h1>
        <p className={`${styles.soon} font-normal text-2xl text-[var(--subtitle)] leading-[40px] w-[386px] mr-[30px]`}>
          يرجى ملء البيانات التالية وسنتواصل معك في أقرب وقت ممكن.
        </p>
        <form className={`${styles.form_container} p-[25px] px-[42px] flex flex-col gap-[20px] items-start`} onSubmit={handleSubmit}>
          <div className={`${styles.Name_container} flex gap-4`}>
            <input
              className={`${styles.firstName} outline-none p-[8px] px-[16px] w-[250px] h-[55px] rounded-[10px] text-[18px] font-normal bg-transparent text-[var(--title)]`}
              type="text"
              placeholder="الاسم الاول"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className={`${styles.lastName} outline-none p-[8px] px-[16px] w-[250px] h-[55px] rounded-[10px] text-[18px] font-normal bg-transparent text-[var(--title)]`}
              type="text"
              placeholder="الاسم الثاني"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className={`${styles.email_container} p-[5px] px-[15px] w-full flex items-center rounded-[10px] bg-transparent`}>
            <img
              src={img_email}
              alt="email"
              height={24}
              width={24}
              priority={true}
            />
            <input
              className={`${styles.email_input} outline-none w-full p-[8px] px-[16px] h-[55px] text-[18px] font-normal border-none bg-transparent text-[var(--title)]`}
              type="email"
              placeholder="البريد الالكتروني"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
          </div>
          <div className={`${styles.textarea_container} h-[120px] w-full bg-transparent`}>
            <textarea
              className={`${styles.massage} focus:outline-none resize-none p-[5px] px-[15px] border-none font-normal text-[18px] w-full h-full rounded-[10px] text-[var(--title)] bg-transparent`}
              placeholder="اترك رسالتك"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className={`${styles.btn_container} w-full p-[2px] px-[20px] text-center border border-[#f26a40] bg-[#f26a40] rounded-[10px]`}>
            <button className={`${styles.send} text-white w-full text-[17px] font-medium bg-transparent border-none cursor-pointer`} type="submit">
              ارسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
