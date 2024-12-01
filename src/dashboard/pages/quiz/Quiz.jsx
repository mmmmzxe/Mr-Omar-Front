import React, { useState } from 'react'
import style from '../../dashboard.module.css';
import SideBar from '../../component/SideBar'
import TopBar from '../../component/TopBar';
import FinalQuiz from '../../../components/FinalQuiz';
const Quiz = () => {
  return (
    <>
      <div className={style.header_Dashboard}><TopBar /></div>
      <div className='flex'>
        <SideBar />
         <div className='mx-auto'>
          <FinalQuiz />
         </div>
      </div>
    </>
  )
}

export default Quiz