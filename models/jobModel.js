import mongoose from "mongoose"

import {JOB_STATUS, JOB_STYPE} from "../utils/constants.js"

// 1. Create Schema
const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_STYPE),
      default: JOB_STYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Job", JobSchema)
