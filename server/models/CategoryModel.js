import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  { 
    
    category: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Categories", CategorySchema);
export default CategoryModel;
