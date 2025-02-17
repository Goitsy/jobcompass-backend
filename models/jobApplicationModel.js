import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const jobApplicationSchema = new Schema(
  {
    jobUrl: { type: String, required: true },
    jobTitle: { type: String, required: true },
    dateOfApplication: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: ["Applied", "In Review", "Interview", "Rejected"],
      default: "Applied",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const jobApplicationModel = model("jobApplication", jobApplicationSchema);

export default jobApplicationModel;
