import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      //role
      type: String,
      required: true,
      enum: ["Admin", "Student", "Instructor"],
    },
    active: {
      type: Boolean,
    },
    approve: {
      type: Boolean,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Courses",
      },
    ],
    image: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    additionalDeatils: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    courseProgress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "CourseProgress",
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Users", UserSchema);
