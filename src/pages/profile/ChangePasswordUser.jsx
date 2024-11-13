import { useState } from "react";
import { Accordion } from "flowbite-react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from "react-icons/hi";

const styleAccordion = {
  backgroundColor: '#555555',
  marginTop: '25px',
  borderRadius: '10px 10px   0  0',
  borderColor: '#3c3c3b',
  boxShadow: '0 0 10px #3c3c3b',
};

const ChangePasswordUser = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // حالة إظهار كلمة السر الحالية
  const [showNewPassword, setShowNewPassword] = useState(false); // حالة إظهار كلمة السر الجديدة
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // حالة إظهار تأكيد كلمة السر
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // تحقق من تطابق كلمة السر الجديدة مع تأكيد كلمة السر
    if (newPassword !== confirmPassword) {
      toast.error("كلمة السر الجديدة غير متطابقة مع تأكيد كلمة السر");
      return;
    }

    // بناء الـ body
    const requestBody = {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
    };

    try {
      // إرسال طلب PUT لتغيير كلمة المرور
      const response = await fetch("https://omarroshdy.com/api/v1/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // إرسال التوكن في الـ header
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/');
        toast.success("تم تغيير كلمة المرور بنجاح");
      } else {
        toast.error(data.message || "فشل تغيير كلمة المرور");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("حدث خطأ أثناء محاولة تغيير كلمة المرور");
    }
  };

  return (
    <Accordion dir='rtl' collapseAll style={styleAccordion}>
      <Accordion.Panel className="bg-black-color-dark rounded-lg shadow-md mt-4">
        <Accordion.Title className='text-numberNotfound py-1.25 px-0 font-bold focus:outline-none rounded-lg dark:text-numberNotfound dark:bg-black-color-dark focus:ring-0 hover:rounded-lg hover:bg-secondary-color'>
          <div className='flex justify-between items-center gap-5 mr-2.5'>
            تغيير كلمة المرور
          </div>
        </Accordion.Title>
        <Accordion.Content>
          <div className="my-5 relative flex justify-evenly items-center flex-col">
            <form
              onSubmit={handleChangePassword}
              className="w-12/12 sm:w-6/12 md:w-8/12 lg:w-8/12 border border-t-4 m-auto border-numberNotfound text-white  bg-[#3C3C3B] dark:bg-black-color-dark bg-white-color px-8 md:px-12 py-6 mb-5 rounded-xl"
            >
              <div className="text-center text-lg fw-bold mb-4 mt-2">
                تغيير كلمة المرور القديمة
              </div>
              <div className="mt-5 leading-7">
                <p className="text-[12px]">
                  رجاءً أدخل كلمة المرور القديمة أولا ثم ادخل كلمة المرور الجديدة مرتين كي تتأكد من كتابتها بشكل صحيح
                </p>
              </div>
              <div className="mb-5 relative">
                <label
                  htmlFor="old_password"
                  className="block my-2 text-sm font-medium dark:text-white"
                >
                  كلمة المرور القديمة
                </label>
                <div className="relative">
                  <input
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    name="old_password"
                    id="old_password"
                    className="border placeholder-white bg-numberNotfound border-black text-gray-900 md:w-full text-sm rounded-lg focus:ring-numberNotfound focus:border-numberNotfound block p-2.5 dark:bg-black-color dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-numberNotfound dark:focus:border-numberNotfound"
                    placeholder="كلمة المرور القديمة"
                    type={showCurrentPassword ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute top-2.5 left-2"
                  >
                    {showCurrentPassword ? <HiEyeOff className="text-gray-500" /> : <HiEye className="text-gray-500" />}
                  </button>
                </div>
              </div>

              <div className="my-5 relative">
                <label
                  htmlFor="new_password"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    name="new_password"
                    id="new_password"
                    className="border bg-numberNotfound border-black text-gray-900 text-sm rounded-lg focus:ring-numberNotfound focus:border-numberNotfound block w-full p-2.5 dark:bg-black-color dark:border-gray-600 dark:placeholder-gray-400 placeholder-white dark:text-white dark:focus:ring-numberNotfound dark:focus:border-numberNotfound"
                    placeholder="كلمة المرور الجديدة"
                    type={showNewPassword ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute top-2.5 left-2"
                  >
                    {showNewPassword ? <HiEyeOff className="text-gray-500" /> : <HiEye className="text-gray-500" />}
                  </button>
                </div>
              </div>

              <div className="my-5 relative">
                <label
                  htmlFor="confirm_new_password"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confirm_new_password"
                    id="confirm_new_password"
                    className="border placeholder-white bg-numberNotfound border-black text-gray-900 text-sm rounded-lg focus:ring-numberNotfound focus:border-numberNotfound block w-full p-2.5 dark:bg-black-color dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-numberNotfound dark:focus:border-numberNotfound"
                    placeholder="تأكيد كلمة المرور"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-2.5 left-2"
                  >
                    {showConfirmPassword ? <HiEyeOff className="text-gray-500" /> : <HiEye className="text-gray-500" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="border py-1.25 px-0 text-center rounded-xl bg-numberNotfound text-white font-bold text-xs md:text-lg w-full p-2 hover:bg-white hover:text-numberNotfound transition-all duration-200"
              >
                اعاده تعيين
              </button>
            </form>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default ChangePasswordUser;
