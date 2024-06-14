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
router.post("/sendOTP", AuthController.sendOTP);
router.post("/signUp", AuthController.signUp);
router.post("/login", AuthController.login);
router.put("/changePassword", AuthController.changePassword);

//================= reset pass Routes ========
router.put("/resetPass", resetPassCntrl.resetPass);

// ================ tags Routes ====================
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

// ================ section Routes ====================
router.post(
  "/createSection",
  Auth,
  onlyAcessTOAdmin,
  sectionCntrl.createSection
);
router.put(
  "/updateSection",
  Auth,
  onlyAcessTOAdmin,
  sectionCntrl.updateSection
);
router.put(
  "/deleteSection/:id",
  Auth,
  onlyAcessTOAdmin,
  sectionCntrl.updateSection
);

// ================ Subsection Routes ====================
router.post(
  "/createSubSection",
  Auth,
  onlyAcessTOAdmin,
  subSectionCntrl.createSubSection
);
router.put(
  "/updateSubSection",
  Auth,
  onlyAcessTOAdmin,
  subSectionCntrl.updateSection
);
router.put(
  "/deleteSubSection/:id",
  Auth,
  onlyAcessTOAdmin,
  subSectionCntrl.updateSection
);
// ================ profile Routes ====================
router.post(
  "/getAllUserDetails",
  Auth,
  onlyAcessTOAdmin,
  profileCntrl.createProfile
);
router.post(
  "/deleteAccount",
  Auth,
  onlyAcessTOAdmin,
  profileCntrl.createProfile
);
router.post(
  "/updateProfile",
  Auth,
  onlyAcessTOAdmin,
  profileCntrl.createProfile
);
// ================ Course Routes ====================
router.post(
  "/createCourse",
  Auth,
  onlyAcessTOInstructor,
  courseCntrl.createCourse
);
router.get(
  "/getAllCourse",
  Auth,
  onlyAcessTOInstructor,
  courseCntrl.getAllCourse
);
router.get(
  "/getCourseDetail",
  Auth,
  onlyAcessTOInstructor,
  courseCntrl.getCourseDetail
);
// ================ Ratind and Review Routes ====================

router.post("/createRating", Auth, ratingAndReviewsCntrl.createRating);
router.get("/getAvgRating", Auth, ratingAndReviewsCntrl.getAverageRating);
router.get("/getAllRating", Auth, ratingAndReviewsCntrl.getAllRating);
// ================ payement Routes ====================
router.post(
  "/caputrePayment  ",
  Auth,
  onlyAcessTOStudent,
  paymentCntrl.caputrePayment
);
router.post("/verifySignature", paymentCntrl.verifySignature);
export default router;
