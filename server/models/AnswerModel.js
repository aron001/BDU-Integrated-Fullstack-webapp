import mongoose from "mongoose";

const AnswerSchema = mongoose.Schema(
  { 
    questionId: { type: String, required: true },
    userId: { type: String, required: true },
    answerText: {
      type: String,
      required: true,
    },
    upVotes:[],
    downVotes: [],
    answerOwnerData: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const AnswerModel = mongoose.model("Answers", AnswerSchema);
export default AnswerModel;
