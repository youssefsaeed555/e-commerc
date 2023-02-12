const mongoose = require("mongoose");

const product = require("./proudct");

const reviewSchema = new mongoose.Schema(
  {
    title: String,
    rating: {
      type: Number,
      max: [5, "max rating value is 5.0"],
      min: [1, "max rating value is 1.0"],
      required: [true, "rating is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: ["true", "review must belong to user"],
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Proudcts",
      required: ["true", "review must belong to product"],
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name" });
  next();
});

reviewSchema.statics.calcAvgRatingAndQuantity = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "product",
        averageRaiting: { $avg: "$rating" },
        countOfRaiting: { $sum: 1 },
      },
    },
  ]);
  if (result.length > 0) {
    await product.findByIdAndUpdate(productId, {
      averageRaiting: result[0].averageRaiting,
      countOfRaiting: result[0].countOfRaiting,
    });
  } else {
    await product.findByIdAndUpdate(productId, {
      averageRaiting: 0,
      countOfRaiting: 0,
    });
  }
};

reviewSchema.post("save", async function (doc) {
  await this.constructor.calcAvgRatingAndQuantity(doc.product);
});

reviewSchema.post("remove", async function (doc) {
  await this.constructor.calcAvgRatingAndQuantity(doc.product);
});

module.exports = mongoose.model("Reviews", reviewSchema);
