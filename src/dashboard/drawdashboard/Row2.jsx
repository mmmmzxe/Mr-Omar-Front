import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Line from "./Line";
import React from "react";
import Pie from "./pie";
import styles from '../dashboard.module.css'
const Row2 = () => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} flexWrap={"wrap"} gap={1.2} mt={1.3}>
      <Paper  sx={{ maxWidth: 780, flexGrow: 1, minWidth: "400px",backgroundColor: "#AABED11A" , color: "gray" }}>
      <div className={`${styles.dashboard} mr-4`}>
        <Stack
          alignItems={"center"}
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          <Box>
          
            <Typography
              color="#f26a40"
              mb={1}
              mt={2}
              ml={4}
              variant="h6"
              fontWeight={"bold"}
            >
              تطور عدد الطلاب
            </Typography>
            
            <Typography variant="body2" ml={4}>
              نسبه الزياده <span className="text-numberNotfound">+15%</span> مقارنه بالعام الماضى
            </Typography>
          </Box>
          
        </Stack>
        </div>
        <Line isDahboard={true} />
      </Paper>
      
      <Box
        sx={{
          overflow: "auto",
          borderRadius: "4px",
          minWidth: "280px",
          maxHeight: 355,
          flexGrow: 1,
        }}
      >
      <Paper sx={{flexGrow: 1,minWidth: "400px" , backgroundColor: "#AABED11A" , color: "gray" }}>
        <div className="md:text-right text-center mb-4 md:mb-0">
        <Typography
          color="#f26a40"
          sx={{ padding: "30px 30px 0 30px" }}
          variant="h6"
          fontWeight="600"
        >
          الارباح
        </Typography>
        </div>

        <Pie isDashbord={true} />
        <Typography variant="h6" align="center" sx={{ mt: "15px" }}>
          57000 EGP
        </Typography>
        <Typography variant="body2" px={0.7} pb={3} align="center">
          صافى الدخل هذا العام
        </Typography>
      </Paper>
      </Box>
    </Stack>
  );
};

export default Row2;
