import React from "react";
import { NavbarLinks } from "../../data/navbar-links.js";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Account_Type } from "../../utils/constant.js";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/auth/ProfileDropDown.jsx";
// import { apiConnector } from "../../appRedux/services/apiconnector.js";
// import { categories } from "../../appRedux/services/apis.js";
// import { useEffect } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const subLinks = [
  {
    title: "python",
    link: "/catalog/python",
  },
  {
    title: "web dev",
    link: "/catalog/web-development",
  },
];
const Navbar = () => {
  //logic for fetching reducer;
  const { token } = useSelector((state) => state.auth); //so hum auth mein se token nikal rahe hai
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  // //api call
  // const [subLinks, setSubLinks] = useEffect([]);

  // const fetchSublinks = async () => {
  //   try {
  //     const result = await apiConnector("GET", categories.CATEGORIES_API);

  //     //we are saving all the categories data comming from the results
  //     console.log("Printing sublinks result:", result);
  //     setSubLinks(result.data.data);
  //   } catch (error) {
  //     console.log("Could not fetch the category list.");
  //   }
  // };
  // useEffect(() => {
  //   console.log("PRINTING TOKEN", token);
  //   fetchSublinks();
  // }, []);

  // creating a function for mark YELLOW where on nav which page are watching
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img src={Logo} alt="Logo" width={160} height={42} loading="lazy" />
        </Link>

        {/* nav links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />
                    <div
                      className="invisible absolute left-[50%]
                                translate-x-[-50%] translate-y-[35%]
                                 top-[50%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]"
                    >
                      <div
                        className="absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"
                      ></div>
                      {subLinks.length ? (
                        subLinks.map((ele, index) => (
                          <Link to={`${ele.link}`} key={index}>
                            <p>{ele.title}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/signUp dasboard */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== Account_Type.INSTRUCTOR && (
            <Link to={"/dashboad/cart"} className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>

        <div className="flex flex-row"></div>
      </div>
    </div>
  );
};

export default Navbar;
