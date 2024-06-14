import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
    },
    subSection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SubSection",
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Section", SectionSchema);
