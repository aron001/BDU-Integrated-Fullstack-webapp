import mongoose from "mongoose";

const advertSchema = mongoose.Schema(
  { 
    userId: { type: String, required: true },
    advertText: {
      type: String,
      required: true,
    },
    image: String,
    creatorData: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const advertModel = mongoose.model("Adverts", advertSchema);
export default advertModel;
