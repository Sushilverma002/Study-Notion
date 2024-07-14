import React from "react";
import { NavbarLinks } from "../../data/navbar-links.js";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img src={Logo} alt="Logo" />
        </Link>

        <div className="flex flex-row">
          {NavbarLinks.map((ele, index) => {
            return (
              <div key={index}>
                <Link to={ele.path}>{ele.title}</Link>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row"></div>
      </div>
    </div>
  );
};

export default Navbar;
