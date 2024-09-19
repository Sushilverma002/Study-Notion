import React from "react";
import DeleteAccount from "./DeleteAccount";
import ChangeProfilePicture from "./ChangeProfilePicture";
import UpdatePassword from "./UpdatePassword";
import EditProfile from "./EditProfile";

const index = () => {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </>
  );
};

export default index;
