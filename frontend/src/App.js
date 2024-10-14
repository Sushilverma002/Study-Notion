import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import VerfiyEmail from "./pages/VerfiyEmail.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import Navbar from "./components/common/Navbar.jsx";
import OpenRoute from "./components/core/auth/OpenRoute.jsx";
import MyProfile from "./components/core/Dashboard/MyProfile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./components/core/Dashboard/Settings";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import PrivateRoute from "./components/core/auth/PrivateRoute.jsx";
import Home from "./pages/Home.jsx";
import { Account_Type } from "./utils/constant.js";
import Cart from "./components/core/Dashboard/Cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses.jsx";
import { useSelector } from "react-redux";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
//OpenRoute-> it is route use for authenication wheather user logged in or not . so only none logged in user only access the specific route.

function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgetPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerfiyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />

        <Route path="dashboard/my-profile" element={<MyProfile />} />
        <Route path="dashboard/Settings" element={<Settings />} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {user?.accountType === Account_Type.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
