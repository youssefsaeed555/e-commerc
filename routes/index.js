//routes
const category = require("./category_routes");
const subCategory = require("./sub_category");
const brand = require("./brand");
const product = require("./proudct_routes");
const user = require("./user_services");
const auth = require("./auth_services");
const reviwes = require("./reviwes");
const wishList = require("./wishListRoutes");
const address = require("./addressRoutes");
const coupon = require("./couponRoutes");
const cart = require("./cart_routes");

const mountRoutes = (app) => {
  //mount routes
  app.use("/api/v1/categories", category);
  app.use("/api/v1/subCategories", subCategory);
  app.use("/api/v1/brands", brand);
  app.use("/api/v1/products", product);
  app.use("/api/v1/users", user);
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/review", reviwes);
  app.use("/api/v1/wishList", wishList);
  app.use("/api/v1/address", address);
  app.use("/api/v1/coupon", coupon);
  app.use("/api/v1/cart", cart);
};

module.exports = mountRoutes;
