import React, { useState } from 'react';
import { Accordion } from 'flowbite-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChangeUserName = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }

    const requestBody = { name, email };
    
    try {
      const response = await fetch('https://omarroshdy.com/api/v1/user/profile-information', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log("Profile updated successfully:", data);

        // الحصول على البيانات الحالية من localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        
        // تحديث الـ localStorage مع الإبقاء على السنة الدراسية كما هي
        localStorage.setItem("user", JSON.stringify({ 
          name: name || user.name,  // إذا كان الاسم فارغًا نتركه كما هو
          email: email || user.email, // إذا كان الايميل فارغًا نتركه كما هو
          studyyear: user.studyyear  // إبقاء السنة الدراسية كما هي
        }));

         
        navigate('/');

        toast.success("تم تعديل حسابك بنجاح");

      } else {
        console.error("Error:", data.message || "Profile update failed");
        toast.error("حدث خطأ فى تعديل الحساب");
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <Accordion dir="rtl" collapseAll style={{ backgroundColor: '#555555', border: "#f26a40", borderRadius: '0', boxShadow: '0 0 10px #3c3c3b' }}>
      <Accordion.Panel className="bg-black-color-dark rounded-lg shadow-md mt-4">
        <Accordion.Title className='text-numberNotfound py-1.25 px-0 font-bold focus:outline-none rounded-lg dark:text-numberNotfound dark:bg-black-color-dark focus:ring-0 hover:rounded-lg hover:bg-secondary-color'>
          <div className='flex justify-between items-center gap-5 mr-2.5'>
            تغيير الاسم والايميل
          </div>
        </Accordion.Title>
        <Accordion.Content>
          <div className="my-5 relative flex justify-evenly items-center flex-col">
            <form onSubmit={handleUpdateProfile} className="w-12/12 sm:w-6/12 md:w-8/12 lg:w-8/12 border border-t-4 m-auto border-numberNotfound text-white bg-[#3C3C3B] dark:bg-black-color-dark bg-white-color px-8 md:px-12 py-6 mb-5 rounded-xl">
              <div className="text-center text-lg fw-bold mb-4 mt-2">
                تغيير الاسم والايميل.
              </div>
              <div className="mt-5 leading-7">
                <p className="text-[12px]">رجاءً أدخل الاسم الجديد والايميل الجديد الذى تريد تغيراهما.</p>
              </div>
              <div className="mb-5 relative">
                <label htmlFor="name" className="block mb-2 text-sm font-medium dark:text-white">الاسم الجديد</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="border placeholder-white bg-numberNotfound border-black text-gray-900 text-sm rounded-lg focus:ring-numberNotfound focus:border-numberNotfound block w-full p-2.5 dark:bg-black-color dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-numberNotfound dark:focus:border-numberNotfound"
                  placeholder="الاسم الجديد"
                  required
                />
                <label htmlFor="email" className="block mb-2 mt-4 text-sm font-medium dark:text-white">الايميل الجديد</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="border placeholder-white bg-numberNotfound border-black text-gray-900 text-sm rounded-lg focus:ring-numberNotfound focus:border-numberNotfound block w-full p-2.5 dark:bg-black-color dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-numberNotfound dark:focus:border-numberNotfound"
                  placeholder="الايميل الجديد"
                  required
                />
              </div>
              <button type="submit" className="border py-1.25 px-0 text-center rounded-xl bg-numberNotfound text-white font-bold text-xs md:text-lg w-full p-2 hover:bg-white hover:text-numberNotfound transition-all duration-200 mt-2">
                اعاده تعيين
              </button>
            </form>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default ChangeUserName;
