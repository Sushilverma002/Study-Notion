import React from "react";
import Button from "./Button";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa6";
const SectionThreeHP = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-row gap-20 items-center">
        <div className="shadow-inner-custom">
          <img src={Instructor} alt="Instructor" />
        </div>
        {/* right content */}
        <div className="w-[50%] flex flex-col gap-10">
          <div className="text-4xl font-semibold  w-[50%]">
            Become an <HighlightText text={"instructor"} />
          </div>

          <p className="text-richblack-300 font-medium text-[16px] w-[80%]">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <Button active={true} linkto={"/signup"}>
              <div className="gap-2 items-center flex flex-row">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionThreeHP;
