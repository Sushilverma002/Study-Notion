import React from "react";
import HighlightText from "./HighlightText";
import Picture2 from "../../../assets/Images/Compare_with_others.png";
import Picture1 from "../../../assets/Images/Know_your_progress.png";
import Picture3 from "../../../assets/Images/Plan_your_lessons.png";
import Button from "./Button";

const LearningLanguageSection = () => {
  return (
    <div className="mt-[150px] mb-32">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-center text-4xl font-semibold ">
          Your swiss knife for
          <HighlightText text={"learning any language"} />
        </div>

        <div className="mx-auto text-center text-base font-medium w-[70%] text-richblack-600">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-row items-center mt-8">
          <img
            src={Picture1}
            alt="KnowYourProgess"
            className="object-contain -mr-32"
          />
          <img
            src={Picture2}
            alt="CompareWithOthers"
            className="object-contain"
          />
          <img
            src={Picture3}
            alt="PlanYourLessons"
            className="object-contain -ml-36"
          />
        </div>

        <div className="w-fit">
          <Button active={true} linkto={"/login"}>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
