import React from "react";
import Footer from "../components/common/Footer";
import ContactDeatils from "../components/contactForm/ContactDeatils";
import ContactForm from "../components/contactForm/ContactForm";
const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex flex-col justify-between gap-10 text-white w-11/12 lg:flex-row">
        {/* contact deatils */}
        <div className="lg:w-[48%]">
          <ContactDeatils />
        </div>
        {/* contact form */}
        <div>
          <ContactForm className="lg:w-[60%]" />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
