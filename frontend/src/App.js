import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import VerfiyEmail from "./pages/VerfiyEmail.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import Navbar from "./components/common/Navbar.jsx";
import OpenRoute from "./components/core/auth/OpenRoute.jsx";
// import MyProfile from "./components/core/Dashboard/MyProfile.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import Home from "./pages/Home.jsx";
//OpenRoute-> it is route use for authenication wheather user logged in or not . so only none logged in user only access the specific route.

function App() {
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
        {/* <Route path="/dashboard/my-profile" element={<MyProfile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
