import React from 'react'
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "./overview.module.css";
import { BarChart } from "@mui/x-charts";
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];

const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];
const DrawDashboard = () => {
  return (
    <section className={styles.main}>
        <div className={styles.charts}>
          <div className={styles.rightcharts}>
            <div className={styles.firstrow}>
              <div>
                <h3 className='text-black dark:text-white'>تطور عدد الطلاب</h3>
                <p className='text-black dark:text-white'>
                  نسبة الزيادة: <span className={styles.Percentage}>+15%</span>{" "}
                  مقارنة بالأسبوع الماضي
                </p>
              </div>
              <div className={styles.options_container}>
                <select className={styles.selected}>
                  <option value="volvo">آخر أسبوع</option>
                  <option value="saab">اخر الشهر</option>
                </select>
              </div>
            </div>
            {/* Bar charts */}
            
            <div className={styles.linecharts}>
                
              <BarChart
                margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
                width={1000}
                height={300}
                series={[
                  {
                    data: uData,

                    id: "uvId",
                    yAxisId: "rightAxisId",
                  },
                ]}
                xAxis={[
                  { data: xLabels, scaleType: "band", categoryGapRatio: 0.7 },
                ]}
                yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
                rightAxis="rightAxisId"
              />
            </div>
          </div>
          {/* Line charts */}
          <div className={styles.leftcharts}>
          {/* <div>
                    <h2 className='text-black dark:text-white'>561 People</h2>
                    <p className='text-black dark:text-white'>2 March 2024</p>
                </div> */}
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                  color: "rgba(69, 11, 90, 1)",
                },
              ]}
              width={300}
              height={400}
            />
          </div>
        </div>
      </section>
  )
}

export default DrawDashboard