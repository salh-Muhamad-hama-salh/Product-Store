import mongoose from "mongoose";

const productStoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    imageURL: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductStore = mongoose.model("ProductStore", productStoreSchema);
