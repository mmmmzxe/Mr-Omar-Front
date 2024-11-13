import React from "react";
import "../lesson1/commonSection.css";
const CommonSection = (props) => {
  return (
    <section className="lesson_section">
      <div className="flex flex-col w-full text-center">
        <h2 className="text-white text-lg md:text-3xl ">{props.title}</h2>
        <p className="leading-[35px] text-[#111] dark:text-[#777] mt-4 text-base xl:text-xl xl:ml-96 xl:w-[850px] xl:h-[85px]">دلوقتي هتقدر تفهم الفيزياء بشكل أبسط وأسهل! كل المواضيع اللي محتاج تعرفها عن الحركة، القوى، والشغل متقسمة بشكل منظم علشان تذاكر بتركيز وتحقق أعلى الدرجات!</p>
        <div class="subscribe w-full mt-4">
          <form action="">
          <input type="submit" value="بحث" />
            <input type="text" placeholder="ابحث بالتاريخ او العنوان" />
          </form>
        </div>

      </div>
    </section>
  );
};

export default CommonSection;
