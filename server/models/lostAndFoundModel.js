import mongoose from "mongoose";

const lostAndFoundSchema = mongoose.Schema(
  { 
    userId: { type: String, required: true },
    lostAndFoundText: {
      type: String,
      required: true,
    },
    image: String,
    status: String,
    isLostOrFound: String,
    lfOwnerData: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const lostAndFoundModel = mongoose.model("LostAndFounds", lostAndFoundSchema);
export default lostAndFoundModel;
