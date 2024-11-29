import React, { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Lineprogress = () => {
  const [attendance, setAttendance] = useState(80);
  const [absence, setAbsence] = useState(20);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Attendance Progress */}
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="body2" color="gray"></Typography>
        <Typography variant="body2" color="gray" sx={{ mx: 4 }}>
          نسبة الحضور (%{attendance})
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={attendance}
        sx={{
          height: 10,
          marginLeft: 1,
          borderRadius: 4,
          transform: "scaleX(-1)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#2ecc71",
          },
        }}
      />

      {/* Absence Progress */}
      <Box display="flex" alignItems="center" mt={2}>
        <Typography variant="body2" color="gray"></Typography>
        <Typography variant="body2" color="gray" sx={{ mx: 1 }}>
          نسبة الغياب(%{absence})
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={absence}
        sx={{
          height: 10,
          marginLeft: 1,
          borderRadius: 4,
          transform: "scaleX(-1)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#e74c3c",
          },
        }}
      />
    </Box>
  );
};

export default Lineprogress;
