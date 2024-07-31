import React from "react";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";

const Contentimg = ({
  position,
  heading,
  subheading,
  image,
  ctabtn1,
  ctabtn2,
  codeblock,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/* section 1*/}

      <div className="w-[50%] flex flex-col gap-3">
        {heading}
        <div className="text-richblack-300 font-bold">{subheading}</div>

        <div className=" font-bold flex flex-row gap-7 mt-8 ">
          <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText} <FaArrowRight />
            </div>
          </Button>
          <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </Button>
        </div>
      </div>

      {/* section 2 */}
      <div className="flex flex-row h-fit text-[10px] w-[%100] py-4 lg:w-[500px]">
        {/* bg gradient */}

        <div className="text-center flex flex-col w-[10%] font-bold text-richblack-400 font-inter">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2  font-bold font-mono pr-2  ${codeColor}`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            omitDeletionAnimation={true}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Contentimg;
