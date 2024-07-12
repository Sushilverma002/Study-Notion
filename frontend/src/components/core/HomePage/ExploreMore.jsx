import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
const tabName = [
  "Free",
  "New to coding",
  "Most Popular",
  "Skill paths",
  "Carrer paths",
];
const ExploreMore = () => {
  const [currentTab, setCurrectTab] = useState(tabName[0]); //means free as default
  const [courses, setCourses] = useState(HomePageExplore[0].courses); //as default zeroth index data from file
  const [currentCard, setCurrectCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCard = (value) => {
    setCurrectTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrectCard(result[0].courses[0].heading);
  };
  return (
    <div className="flex flex-col ">
      <div className="text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={"Power of Code"} />
      </div>
      <p className="text-center text-richblack-300 text-sm text-[16px] mt-3">
        Learn to build anything you can imagine{" "}
      </p>

      <div>
        {tabName.map(element, (index) => {
          return (
            <div
              className={`${
                currentTab === element
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : ""
              }`}
            >
              {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
