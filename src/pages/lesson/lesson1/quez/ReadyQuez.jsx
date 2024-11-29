import React from 'react'
import styles from './ques.module.css'
import ready from '../../../../assets/Exams-pana 1.png'
import { Link } from 'react-router-dom'
import { FaAnglesDown } from "react-icons/fa6";
const ReadyQuez = () => {
    return (
        <div class={`${styles.ready_Quez} relative`}>
            <div className="xl:min-h-[calc(100vh-72px)] min-h-custom container flex flex-col md:flex-row justify-between items-center md:pt-32 pb-32">
                <div className="text-center xs:w-full xs:h-auto md:h-[260px]  py-0 px-5 md:w-[650px] md:text-right rounded-[50px] d-lg-flex flex-lg-column justify-content-center align-items-stretch mb-16 pt-5 pt-lg-0">
                    <h1 className='md:text-4xl text-2xl m-0 text-black dark:text-white'>مستعد لبدء الاختبار!</h1>
                    <p className='leading-7 md:text-[20px] text-[16px] mt-2.5 text-[var(--subtitle)] max-w-[500px]'>اختبر نفسك علي ماتم شرحه ودراسته فى المحاضره.</p>
                    <button className="border-none outline-none px-6 py-2 rounded text-black bg-white hover:bg-[#f26a40] cursor-pointer  mt-8 text-base">
                       <Link to="/startQuez">ابدا الان</Link>
                    </button>
                </div>
                <div class={styles.image}>
                    <img src={ready} />
                </div>
            </div>
            <Link className={styles.go_Down}><FaAnglesDown className={`${styles.animation} text-3xl`} /></Link>
        </div>
    )
}

export default ReadyQuez