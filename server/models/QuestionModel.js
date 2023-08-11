import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: {
      type: String,
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    category: String,
    questionOwnerData: [],
  },
  {
    timestamps: true,
  }
);

const QuestionModel = mongoose.model("Questions", QuestionSchema);
export default QuestionModel;
