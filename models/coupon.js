const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name of coupon is required"],
      trim: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: [true, "discount of coupon is required"],
    },
    expires: {
      type: Date,
      required: [true, "expire of coupon is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupons", couponSchema);
