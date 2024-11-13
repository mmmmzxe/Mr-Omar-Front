import React from 'react'
import Button from "../../components/buttonjoin/ButtonJoin";
import rightdots from '../../assets/rightdots.svg'
import leftdots from '../../assets/leftdots.svg'
import mainatom from '../../assets/mainatom.svg'
import arrow from '../../assets/arrow.svg'
import apple from '../../assets/apple.svg'
import smallatom from '../../assets/smallatom.svg'
import dash from '../../assets/dash.svg'
import stars from '../../assets/stars.svg'
import me from '../../assets/omar.png'
import styles from "../Platform content/platformcontent.module.css";
const Hero = () => {
  return (
    <div className={`${styles.test} h-[700px] relative overflow-hidden`}>
      <img
        className={`${styles.right_dots} absolute top-12 -right-[4.5rem]`}
        src={rightdots}
        alt="rightdots"
        width={158}
        height={145}
        priority={true}
      />
      <img
        className={`${styles.left_dots} absolute bottom-20 -left-[5.5rem]`}
        src={leftdots}
        alt="leftdots"
        width={185}
        height={148}
        priority={true}
      />
      <img
        className={`${styles.atom_photo} absolute top-12 left-[43%]`}
        src={mainatom}
        alt="mainatom"
        width={187}
        height={187}
        priority={true}
      />
      <img
        className={`${styles.arrow_photo} absolute bottom-[20%] left-[50%]`}
        src={arrow}
        alt="arrow"
        width={110}
        height={110}
        priority={true}
      />

      <img
        className={`${styles.apple_photo} absolute top-12 left-32`}
        src={apple}
        alt="apple"
        width={73}
        height={75}
        priority={true}
      />
      <img
        className={`${styles.samllatom_photo} absolute bottom-8 right-12`}
        src={smallatom}
        alt="smallatom"
        width={80}
        height={80}
        priority={true}
      />
      <img
        className={`${styles.dash_photo} absolute top-56 left-72`}
        src={dash}
        alt="dash"
        width={74}
        height={68}
        priority={true}
      />
      <img
        className={`${styles.stars_photo} absolute bottom-8 left-[45%]`}
        src={stars}
        alt="stars"
        width={70}
        height={45}
        priority={true}
      />

      <div className={`${styles.right_PlatformContent} w-1/2 flex flex-col pt-[200px] mr-48 mt-4 gap-4`}>
        <h1 className={styles.heading_PlatformContent}>
          إدارة <span1 className={styles.span}>الدروس والطلاب</span1> بسهولة
          وكفاءة
        </h1>
        <p className={styles.platform_Content}>
          مع منصة عمر رشدي في الفيزياء، يمكنك تنظيم دروسك ومتابعة تقدم طلابك
          بكل سهولة.نحن هنا لتقديم الأدوات التي تحتاجها لتجربة تعليمية أكثر
          سلاسة وفعالية.
        </p>
        <Button />
      </div>

      <div>
        <img
          className={styles.omar}
          src={me}
          alt="omar"
          width={444}
          height={608}
          priority={true}
        />
      </div>
    </div>
  )
}

export default Hero