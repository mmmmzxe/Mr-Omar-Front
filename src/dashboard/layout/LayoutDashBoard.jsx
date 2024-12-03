import * as React from "react";
import styles from '../dashboard.module.css';
import TopBar from "../component/TopBar";
import SideBar from "../component/SideBar";
import { ToastBar, Toaster } from "react-hot-toast";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom"; // لعرض المحتوى بناءً على المسار

const LayoutDashBoard = ({ children }) => {
  return (
    <div className={styles.dashboard}>
       <main>
        {children}
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "#fbc15c",
                color: "black",
              },
              error: {
                style: {
                  background: "red",
                  color: "white",
                },
              },
            },
          }}
          containerStyle={{
            top: 100,
            left: 20,
            bottom: 20,
            right: 20,
          }}
        >
          {(t) => (
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: t.visible
                  ? "custom-enter 1s ease"
                  : "custom-exit 1s ease",
              }}
            />
          )}
        </Toaster>
         
      </main>
<Box component="main">
  <Outlet />
</Box>

     
    </div>
  );
};

export default LayoutDashBoard;
