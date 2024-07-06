import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
    },
    courseDescription: {
      type: String,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    whatYouWillLearn: {
      type: String,
    },
    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    ratingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],
    price: {
      type: Number,
    },
    thumbnail: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tag: {
      type: [String],
      required: true,
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Course", CourseSchema);
