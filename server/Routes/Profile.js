import { Router } from "express";
import { Auth } from "../Middlewares/auth.js";
import profileCntrl from "../Controllers/ProfileCntrl.js";
const profile = Router();

// ================ profile Routes ====================
// Delete User Account
profile.get("/getUserDetails", Auth, profileCntrl.getAllUserDetails);
profile.delete("/deleteProfile", Auth, profileCntrl.deleteAccount);
profile.put("/updateProfile", Auth, profileCntrl.updateProfile);

// Get Enrolled Courses
profile.get("/getEnrolledCourses", Auth, profileCntrl.getEnrolledCourses);
profile.put("/updateDisplayPicture", Auth, profileCntrl.updateDisplayPicture);

export default profile;
