import React from "react";
import { FaCheck } from "react-icons/fa";
import styles from "./pricing.module.css";
import { Link } from "react-router-dom";
import CommonSection from './CommonSection';
import right from '../../assets/right.svg'
const plans = [
    {
        title: "الخطة الأساسية",
        price: "199 جـ",
        details: [
            "إضافة حتى ١٠ دروس شهرياً",
            "مساحة تخزين تصل إلى ٣ جيجابايت",
            "دعم فني عبر البريد الإلكتروني فقط",
            "وصول إلى جميع الأدوات التعليمية",
        ],
    },
    {
        title: "الخطة المتقدمة",
        price: "299 جـ",
        details: [
            "إضافة حتى ٢٠ درس شهرياً",
            "مساحة تخزين تصل إلى ٥ جيجابايت",
            "دعم فني عبر الهاتف والبريد الإلكتروني",
            "وصول إلى الأدوات التعليمية المتقدمة",
        ],
    },
    {
        title: "الخطة المميزة",
        price: "499 جـ",
        details: [
            "إضافة غير محدودة للدروس",
            "مساحة تخزين تصل إلى ١٠ جيجابايت",
            "دعم فني مميز ٢٤/٧",
            "وصول إلى جميع الأدوات والميزات",
        ],
    },
];

const Pricing = () => {
    return (
        <>
            <CommonSection title=".مرحبا بكم فى منصه مستر عمر يمكنكم الاشتراك من خلال اى بوابه دفع" />
            <div className="relative flex flex-col items-center mt-16 md:mt-36">
                <h1 className="mb-4 text-black dark:text-white text-xl md:text-4xl">خطط الاشتراك لمنصة عمر رشدي</h1>
                <p className="text-[#333] dark:text-white text-base md:text-lg">
                    .استفد من ميزات إدارة الدروس، تتبع الطلاب، والدعم الفني
                    <span className="mt-1 block text-center">.اختر الخطة التي تناسب احتياجاتك</span>
                </p>
            </div>

            <div className={`${styles.pricing} relative py-24`}>
                <div className={`${styles.pricing_container} container1`}>
                    {plans.map((plan, index) => (
                        <div key={index} className={`${styles.pricing_box} text-center relative bg-white z-10 transition-all duration-300 my-16 ${styles[`plan${index + 1}`]}`}>
                            <div className={styles.price}>
                                <span className={`${styles.title} block text-3xl my-7 mb-2 text-black font-bold `}>{plan.title}</span>
                                <span className="text-[#333] text-2xl">{plan.price}</span>
                            </div>
                            <ul className="text-right">
                                {plan.details.map((detail, detailIndex) => (
                                    <li key={detailIndex} className="p-5 border-t-2 border-[#eee] text-base text-black">
                                        <img src={right} className="inline-block ml-2 text-[#2196f3]" />
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                            <div className={`${styles.divider} mt-6 mx-6`} />
                            <Link to="/" className="text-white no-underline bg-[#f26a40] p-2 rounded-lg block w-fit mx-auto mt-7 mb-10 px-6 py-2.5 font-bold transition duration-300">
                                اشترك الآن
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Pricing;
