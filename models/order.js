const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: ["true", "orders must belong to user"],
    },
    cartItems: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Proudcts" },
        color: String,
        price: Number,
        quantity: Number,
      },
    ],
    shippingAddress: {
      details: String,
      postalCode: Number,
      city: String,
      phone: String,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    DeliveredAt: Date,
    taxPrice: { type: Number, default: 0 },
    shippingPrice: Number,
    totalOrderPrice: Number,
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "userName email profileImg phone",
  }).populate({
    path: "cartItems.product",
    select: "title description imageCover",
  });
  next();
});

module.exports = mongoose.model("Orders", orderSchema);
