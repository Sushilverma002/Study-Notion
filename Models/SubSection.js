import mongoose from "mongoose";

const SubSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    timeDuration: {
      type: String,
    },
    description: {
      type: String,
    },
    videoUrl: {
      type: string,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("SubSection", SubSectionSchema);
