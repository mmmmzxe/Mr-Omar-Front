import React from 'react'
import overview from '../../assets/data/overview'
import styles from '../dashboard.module.css'
import { LineChart } from "@mui/x-charts/LineChart";
import Row2 from '../drawdashboard/Row2'
import { BarChart } from "@mui/x-charts";
import Row3 from '../drawdashboard/Row3';
import TopBar from '../component/TopBar';
import SideBar from '../component/SideBar';
import { Link } from 'react-router-dom';
import DrawDashboard from '../drawdashboard/DrawDashboard';

const DashBoard = () => {
  return (
    <div>
      <div className={styles.header_Dashboard}><TopBar /></div>
      <div className='flex'>
        <SideBar />
        <div>
          <div className='my-8'>
            <div className={`${styles.overview_Dashboad} container ml-2.5 md:ml-0`}>
              {overview.map((item, index) => (

                <div key={index} className={`${styles.card} w-[320px] md:w-[205px] mr-7  `}>
                  <img
                    src={item.img}
                    alt="all-lectures"
                    width={40}
                    height={40}
                    className='m-auto'
                  />
                  <p className={styles.content}>{item.title}</p>
                  <span className={`${styles.numbers} text-black dark:text-white text-center my-2`}>{item.subTitle}</span>
                </div>

              ))}


            </div>
          </div>
          <div className={`${styles.draw_Dashboard} container my-16 lg:pl-64 pl-0`}>
            <Row2 />
            <Row3 />

          </div>
          <div>
            {/* <DrawDashboard /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard