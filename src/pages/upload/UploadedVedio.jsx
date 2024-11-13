import React, { useState } from "react";
import { LuSubtitles } from "react-icons/lu";
import { MdDescription, MdCloudUpload } from "react-icons/md";
import { Stadge } from "../../assets/data/stadage";
import Loader from "./Loader";  
import toast from 'react-hot-toast';
import styles from '../lesson/lesson1/lesson.module.css';
const UploadedVedio = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);  // إضافة state لرفع الصورة
  const [url, setUrl] = useState("");  // لإدخال رابط الفيديو
  const [embeded, setEmbeded] = useState("");  // لإدخال الكود المدمج (iframe)
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [progress, setProgress] = useState(0); // حالة لحفظ التقدم

  const handleUpload = async () => {
    const accessToken = localStorage.getItem("accessToken");
  
    if (!title || !description || !category || !imageAsset || !url || !embeded) {
      setMsg("يرجى ملء جميع الحقول بشكل صحيح");
      return;
    }
  
    // تحديد السنة الدراسية بناءً على الفئة المختارة
    const studyyear = category;
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("studyyear", studyyear); // إرسال السنة الدراسية المحددة
    formData.append("category", category);  // إرسال الفئة
    formData.append("image", imageAsset);   // إرسال الصورة
    formData.append("url", url);  // إرسال رابط الفيديو
    formData.append("embeded", embeded);  // إرسال الكود المدمج (iframe)

    try {
      setIsLoading(true);
  
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://omarroshdy.com/api/v1/uploadinfo", true);
      xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
  
      // تحديث التقدم عند حدوث تغيير في التحميل
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentLoaded = (event.loaded / event.total) * 100;
          setProgress(percentLoaded);   
        }
      };

      // عند إتمام التحميل
      xhr.onload = () => {
        const result = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
          toast.success("تم رفع الصورة بنجاح!");
          setTitle("");  
          setDescription("");
          setCategory(null);  
          setImageAsset(null);  
          setUrl("");  
          setEmbeded("");   
        } else {
          toast.error(result.message || "حدث خطأ أثناء رفع الصورة");
        }
        setIsLoading(false);
      };

      xhr.onerror = () => {
        toast.error("فشل في رفع الصورة. يرجى المحاولة لاحقاً");
        setIsLoading(false);
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("فشل في رفع الصورة. يرجى المحاولة لاحقاً");
      setIsLoading(false);
    }
  };

  return (
    <a href="https://omarroshdy.com/ubbergibberishwhizzlefoxtruploadotuplFlflimflamwombatwaffleboop">
      <h2 className={`${styles.main_title} uppercase dark:text-white text-black mx-auto my-20 border-2 border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}>
           Go To Upload Vedio
        </h2>
    </a>
  );
};

export default UploadedVedio;
