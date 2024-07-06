import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    about: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Profile", ProfileSchema);
