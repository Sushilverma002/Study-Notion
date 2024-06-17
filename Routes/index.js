import { Router } from "express";
import AuthController from "../Controllers/AuthCntrl.js";
import resetPassCntrl from "../Controllers/ResetPassword.js";
import categoryCntrl from "../Controllers/CategoryCntrl.js";
import courseCntrl from "../Controllers/CourseCntrl.js";
import sectionCntrl from "../Controllers/SectionCntrl.js";
import subSectionCntrl from "../Controllers/SubSection.js";
import profileCntrl from "../Controllers/ProfileCntrl.js";
import paymentCntrl from "../Controllers/Payment.js";
import ratingAndReviewsCntrl from "../Controllers/RatingAndReviewsCntrl.js";
import {
  Auth,
  onlyAcessTOAdmin,
  onlyAcessTOInstructor,
  onlyAcessTOStudent,
} from "../Middlewares/auth.js";
const router = Router();

//============== auth Routes ========
router.post("/login", AuthController.login);
router.post("/signUp", AuthController.signUp);
router.post("/sendotp", AuthController.sendOTP);
router.put("/changePassword", Auth, AuthController.changePassword);

//================= reset pass Routes ========
router.post("/reset-Pass-Token", resetPassCntrl.resetPassToken);
router.post("/reset-Password", resetPassCntrl.resetPassword);

// ================ categories Routes ====================
router.post(
  "/createCategory",
  Auth,
  onlyAcessTOAdmin,
  categoryCntrl.createCategory
);
router.get(
  "/getAllCategory",
  Auth,
  onlyAcessTOAdmin,
  categoryCntrl.getAllCategory
);

// ================ profile Routes ====================
// Delete User Account
router.get("/getAllUserDetails", Auth, profileCntrl.getAllUserDetails);
router.delete("/deleteAccount", Auth, profileCntrl.deleteAccount);
router.put("/updateProfile", Auth, profileCntrl.updateProfile);

// Get Enrolled Courses
router.get("/getEnrolledCourses", Auth, profileCntrl.getEnrolledCourses);
router.put("/updateDisplayPicture", Auth, profileCntrl.updateDisplayPicture);

// ================ Course Routes ====================
router.post(
  "/createCourse",
  Auth,
  onlyAcessTOInstructor,
  courseCntrl.createCourse
);
router.get("/getAllCourse", courseCntrl.getAllCourse);
router.get("/getCourseDetail", courseCntrl.getCourseDetail);

// ================ section Routes ====================
router.post(
  "/createSection",
  Auth,
  onlyAcessTOInstructor,
  sectionCntrl.createSection
);
router.put(
  "/updateSection",
  Auth,
  onlyAcessTOInstructor,
  sectionCntrl.updateSection
);
router.put(
  "/deleteSection/:id",
  Auth,
  onlyAcessTOInstructor,
  sectionCntrl.updateSection
);

// ================ Subsection Routes ====================
router.post(
  "/createSubSection",
  Auth,
  onlyAcessTOInstructor,
  subSectionCntrl.createSubSection
);
router.post(
  "/updateSubSection",
  Auth,
  onlyAcessTOInstructor,
  subSectionCntrl.updateSubSection
);
router.post(
  "/deleteSubSection/:id",
  Auth,
  onlyAcessTOInstructor,
  subSectionCntrl.deleteSubSection
);

// ================ Ratind and Review Routes ====================

router.post(
  "/createRating",
  Auth,
  onlyAcessTOStudent,
  ratingAndReviewsCntrl.createRating
);
router.get("/getAvgRating", ratingAndReviewsCntrl.getAvgRating);
router.get("/getAllRating", ratingAndReviewsCntrl.getAllRating);

// ================ payement Routes ====================
router.post(
  "/caputrePayment",
  Auth,
  onlyAcessTOStudent,
  paymentCntrl.caputrePayment
);
router.post("/verifySignature", paymentCntrl.verifySignature);

export default router;
