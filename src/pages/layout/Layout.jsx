import React from 'react'
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { ToastBar, Toaster } from "react-hot-toast";
const Layout = ({ children }) => {
  return (
    <>
      <div className=''>
        <Header />
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
        <Footer />
      </div>
    </>
  )
}

export default Layout