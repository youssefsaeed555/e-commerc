const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Proudcts" },
        color: String,
        price: Number,
        quantity: { type: Number, default: 1 },
      },
    ],
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: ["true", "cart must belong to user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carts", cartSchema);
