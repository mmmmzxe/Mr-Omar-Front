import React from "react";
import "./commonSection.css";

const CommonSection = (props) => {
  return (
    <section className="pricing_section">
      <div>
        <h2 className="text-white text-center text-xl md:text-3xl ">{props.title}</h2>
      </div>
    </section>
  );
};

export default CommonSection;
