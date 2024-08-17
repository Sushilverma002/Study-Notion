import categoryCntrl from "../Controllers/CategoryCntrl.js";
import courseCntrl from "../Controllers/CourseCntrl.js";
import sectionCntrl from "../Controllers/SectionCntrl.js";
import subSectionCntrl from "../Controllers/SubSection.js";
import ratingAndReviewsCntrl from "../Controllers/RatingAndReviewsCntrl.js";
import { Router } from "express";
import {
  Auth,
  onlyAcessTOAdmin,
  onlyAcessTOInstructor,
  onlyAcessTOStudent,
} from "../Middlewares/auth.js";
const course = Router();

// ================ categories Routes ====================
course.post(
  "/createCategory",
  Auth,
  onlyAcessTOAdmin,
  categoryCntrl.createCategory
);
course.get(
  "/getAllCategories",
  Auth,
  onlyAcessTOAdmin,
  categoryCntrl.getAllCategory
);

// ================ Course Routes ====================
course.post(
  "/createCourse",
  Auth,
  onlyAcessTOInstructor,
  courseCntrl.createCourse
);
course.get("/getAllCourse", courseCntrl.getAllCourse);
course.post("/getCourseDetail", courseCntrl.getCourseDetail);

// ================ section Routes ====================
course.post(
  "/createSection",
  Auth,
  onlyAcessTOInstructor,
  sectionCntrl.createSection
);
course.put(
  "/updateSection",
  Auth,
  onlyAcessTOInstructor,
  sectionCntrl.updateSection
);
course.put(
  "/deleteSection/:id",
  Auth,
  onlyAcessTOInstructor,
  sectionCntrl.updateSection
);

// ================ Subsection Routes ====================
course.post(
  "/createSubSection",
  Auth,
  onlyAcessTOInstructor,
  subSectionCntrl.createSubSection
);
course.post(
  "/updateSubSection",
  Auth,
  onlyAcessTOInstructor,
  subSectionCntrl.updateSubSection
);
course.post(
  "/deleteSubSection/:id",
  Auth,
  onlyAcessTOInstructor,
  subSectionCntrl.deleteSubSection
);

// ================ Ratind and Review Routes ====================

course.post(
  "/createRating",
  Auth,
  onlyAcessTOStudent,
  ratingAndReviewsCntrl.createRating
);
course.get("/getAvgRating", ratingAndReviewsCntrl.getAvgRating);
course.get("/getReviews", ratingAndReviewsCntrl.getAllRating);

export default course;
