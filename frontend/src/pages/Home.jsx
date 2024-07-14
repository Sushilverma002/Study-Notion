import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from "../components/core/HomePage/HighlightText";
import Button from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import Contentimg from "../components/core/HomePage/Contentimg";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import SectionThreeHP from "../components/core/HomePage/SectionThreeHP";
import ReviewSlider from "../components/core/HomePage/ReviewSlider";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <div>
      {/*section 1*/}
      <div className=" realtive mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit shadow-inner-custom">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-8 ">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-200">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8 ">
          <Button active={true} linkto={"/login"}>
            Learn More
          </Button>
          <Button>Book a Demo</Button>
        </div>

        <div className="mx-3 my-12 shadow-home-box w-9/12 ">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1*/}
        <div>
          <Contentimg
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                {" "}
                Unlock Your <HighlightText text={"coding potential"} />
                with out online course
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two\n</a><ahref="three/">Three</a>\n</nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* code section 2*/}
        <div>
          <Contentimg
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                {" "}
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two\n</a><ahref="three/">Three</a>\n</nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        <ExploreMore />
      </div>
      {/*section 2*/}
      <div className="bg-pure-greys-5 text-richblack-700 ">
        <div className="homepage_bg h-[333px]">
          <div className=" w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto ">
            <div className="h-[150px]"></div>

            <div className="flex flex-row gap-7 text-white">
              <Button active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </Button>
              <Button active={false} linkto={"/signup"}>
                <div>Learn More</div>
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto  w-11/12 flex flex-col items-center gap-7 justify-between max-w-maxContent">
          <div className="flex flex-row gap-5 mb-10 mt-[95px]">
            <div className=" text-richblack-900 text-4xl font-semibold w-[45%]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>

            <div className=" gap-10 w-[40%] items-start flex flex-col">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <Button active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </Button>
            </div>
          </div>
          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>

      {/*section 3*/}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <SectionThreeHP />
        <h2 className="text-center text-4xl font-semibold mt-10">
          Reviews from the learners
        </h2>
        <ReviewSlider />
      </div>
      {/*footer*/}
      <Footer />
    </div>
  );
};

export default Home;
