import React, { useEffect } from "react";
import './platformContent.css';
import services from "../../assets/data/services";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const PlatformContent = () => {
    useEffect(() => {
        Aos.init({
            once: true,
            duration: 1200,
        });
    }, []);

    return (
        <div className="services">
            <div className="container_">
                {services.map((item, index) => (
                    <div
                        data-aos="fade-up"
                        data-aos-delay={100 + index * 100}
                        className="box"
                        key={index}
                    >
                        <img src={item.img} className={item.icon} />
                        <h3>{item.title}</h3>
                        <p>{item.subTitle}</p>
                        <div className="info">
                            <Link to="https://wa.me/01069235832" target="_blank">تفاصيل</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlatformContent;
