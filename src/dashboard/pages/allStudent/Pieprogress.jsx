import { PieChart } from "@mui/x-charts";
import React from "react";

const Pieprogress = () => {
  return (
    <>
      <PieChart
        colors={["rgba(32, 159, 132, 1)", "rgba(255, 44, 83, 1)"]}
        series={[
          {
            data: [
              { id: 0, value: 80 },
              { id: 1, value: 20 },
            ],
            innerRadius: 40,
            startAngle: -50,
            cx: 180,
            cy: 95,
          },
        ]}
        width={300}
        height={200}
      />
    </>
  );
};

export default Pieprogress;
