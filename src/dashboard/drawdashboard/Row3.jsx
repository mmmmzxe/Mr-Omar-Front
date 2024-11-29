import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import Bar from "./bar";
import styles from '../dashboard.module.css' 
import DrawDashboard from "./DrawDashboard";

const Row3 = () => {
  const theme = useTheme();
  return (
    <Stack gap={1.5} direction={"row"} flexWrap={"wrap"} mt={1.4}>

      <Paper  sx={{flexGrow: 1,minWidth: "400px", width: "33%", backgroundColor: "#AABED11A" }}>
        <div className={`${styles.dashboard} md:text-right text-center mb-1 md:mb-0`}>
      <Typography
          color={theme.palette.secondary.main}
          variant="h6"
          fontWeight="600"
          sx={{ padding: "30px 30px 0 30px" }}
        >
          زوار الصفحه
        </Typography>
        </div>

<Bar isDashbord={true} />


      </Paper>
{/* <DrawDashboard /> */}
       
    </Stack>
  );
};

export default Row3;
