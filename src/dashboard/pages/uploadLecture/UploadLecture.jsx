import React from 'react'
import styles from '../quiz/quiz.module.css'
import upload_img from '../../../assets/upload.jpg'
import TopBar from '../../component/TopBar'
import style from '../../dashboard.module.css';
import SideBar from '../../component/SideBar';
const UploadLecture = () => {
  return (
    <>
    <div className={style.header_Dashboard}><TopBar/></div>
    <div className='flex'>
        <SideBar />
    <div className={`${styles.quiz} overflow-hidden w-full factoryActioncontent`}> 
        <h1 className={`${styles.dashboard_Title} text-2xl font-semibold m-[20px_20px_40px] text-[#f26a40] relative`}>رفع المحاضرات</h1>
        <div
               
             className="flex md:flex-row flex-col justify-center items-center gap-4 md:py-10">
                <div>
                    <img className="md:w-[450px] rounded-lg p-4 mx-auto" src={upload_img} alt = "upload_img" />
                </div>  
                <div className="w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg">
                    <h1 className="text-black text-xl font-bold">مرحبا مستر عمر</h1>
                    <p className="text-black text-sm text-center">اذا كنت تريد رفع محاضره جديده</p>
                    <a href="https://omarroshdy.com/ubbergibberishwhizzlefoxtruploadotuplFlflimflamwombatwaffleboop">
                        <button className="mt-6 bg-numberNotfound rounded-md cursor-pointer font-semibold px-8 py-2 text-lg ">ارفع الان</button>
                    </a>
                </div>  
            </div>
   </div>
    </div>
   </>
  )
}

export default UploadLecture