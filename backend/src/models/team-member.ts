import mongoose from "mongoose";


// # team member schema

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      requied: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// # team member model

const TeamMemberModel = mongoose.model("TeamMember", teamMemberSchema);

export default TeamMemberModel;
