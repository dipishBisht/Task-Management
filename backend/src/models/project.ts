import mongoose from "mongoose";

// # Project schema

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value >= new Date();
        },
        message: "Due date must be in the future.",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true, 
      maxlength: 500,
    },
  },
  { timestamps: true }
);

// # Project model

const ProjectModel = mongoose.model("Project", projectSchema);

export default ProjectModel;
