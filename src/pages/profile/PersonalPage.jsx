import { NavLink, Outlet } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";

function PersonalPage() {
  return (
    <>
      <div className="min-h-[calc(100vh-257px)] container">
        <section className="flex justify-end mt-4 md:mt-12 mb-5">
          <section className="md:w-[80%] w-full h-[500px] dark:shadow-numberNotfound shadow-md flex justify-center">
            <section className="bg-secondary-color dark:bg-black-color dark:text-white w-[100%] h-[100%] overflow-auto rounded-l-lg shadow-2xl pl-2 pr-2 md:pl-12 md:pr-12">

              <Outlet />
            </section>
            <section className="dark:bg-black-color-dark border-l-2 border-black-color rounded-r-lg bg-black-color text-white">
              <NavLink
                to="information"
                className={({ isActive }) =>
                  `flex justify-end items-center gap-10 p-5 cursor-pointer rounded-r-lg ${isActive ? "bg-gray-500 text-numberNotfound" : "hover:bg-gray-600 hover:text-numberNotfound"
                  }`
                }
              >
                <p className="font-bold dark:text-white hidden md:block">معلوماتي</p>
                <IoPerson size={25} className="dark:text-numberNotfound" />
              </NavLink>

              <NavLink
                to="order"
                className={({ isActive }) =>
                  `flex justify-end items-center gap-10 p-5 cursor-pointer ${isActive ? "bg-gray-500 text-numberNotfound" : "hover:bg-gray-600 hover:text-numberNotfound"
                  }`
                }
              >
                <h2 className="text-lg font-bold dark:text-white hidden md:block">الاشتراكات</h2>
                <FaCartArrowDown size={25} className="dark:text-numberNotfound" />
              </NavLink>
              <NavLink
                to="security"
                className={({ isActive }) =>
                  `flex justify-end items-center gap-10 p-5 cursor-pointer ${isActive ? "bg-gray-500 text-numberNotfound" : "hover:bg-gray-600 hover:text-numberNotfound"
                  }`
                }
              >
                <h2 className="text-lg font-bold dark:text-white hidden md:block">الامان</h2>
                <MdOutlineSecurity size={25} className="dark:text-numberNotfound" />
              </NavLink>

              <NavLink
                to="/help"
                className={({ isActive }) =>
                  `flex justify-end items-center gap-8 p-5 cursor-pointer ${isActive ? "bg-gray-500 text-numberNotfound" : "hover:bg-gray-600 hover:text-numberNotfound"
                  }`
                }
              >
                <h2 className="text-lg font-bold dark:text-white hidden md:block">المساعدة</h2>
                <FiHelpCircle size={25} className="dark:text-numberNotfound" />
              </NavLink>
            </section>
          </section>
        </section>
      </div>
    </>
  );
}

export default PersonalPage;
