const asyncHandler = require("express-async-handler");

const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Product = require("../models/proudct");
const ApiError = require("../utils/ApiError");

const calcTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};

exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  //find cart for logged user
  let cart = await Cart.findOne({ user: req.user._id });

  //find product to take data from it
  const product = await Product.findById(productId);

  //if user not have cart then create cart and save product in new cart
  if (!cart) {
    cart = await Cart.create({
      cartItems: [
        {
          product: productId,
          color,
          price: product.price,
        },
      ],
      user: req.user._id,
    });
  } else {
    //if user have cart and product found in cartITEM THEN update quantity
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );
    if (itemIndex > -1) {
      const cartItem = cart.cartItems[itemIndex];
      cartItem.quantity += 1;
      cart.cartItems[itemIndex] = cartItem;
    } else {
      cart.cartItems.push({ product: productId, color, price: product.price });
    }
  }
  //calculate totalPrice
  calcTotalPrice(cart);
  await cart.save();
  return res.status(200).json({
    message: "product added to cart successfully",
    numberOfCartItems: cart.cartItems.length,
    cart,
  });
});

exports.getLoggedUser = asyncHandler(async (req, res, next) => {
  const userCart = await Cart.findOne({ user: req.user._id });
  if (!userCart) {
    return next(new ApiError(`no cart for this user`, 404));
  }
  return res
    .status(200)
    .json({ numberOfCartItems: userCart.cartItems.length, userCart });
});

exports.deleteFromCart = asyncHandler(async (req, res, next) => {
  const cartItem = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { _id: req.params.cartItemId } },
    },
    { new: true }
  );
  //calc totalPrice after removed item
  calcTotalPrice(cartItem);
  return res.status(200).json({
    message: "product removed from cart successfully",
    numberOfCartItems: cartItem.cartItems.length,
    cartItem,
  });
});

exports.clearAll = asyncHandler(async (req, res, next) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  return res.status(204).send();
});

exports.updateQuantity = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError(`no cart for this user`, 404));
  }
  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.cartItemId
  );
  if (itemIndex > -1) {
    const itemCart = cart.cartItems[itemIndex];
    itemCart.quantity = quantity;
    cart[itemIndex] = itemCart;
  }
  calcTotalPrice(cart);
  await cart.save();

  return res.status(200).json({
    message: "product updated from cart successfully",
    numberOfCartItems: cart.cartItems.length,
    cart,
  });
});

exports.applyCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findOne({
    name: req.body.coupon,
    expires: { $gt: Date.now() },
  });
  if (!coupon) {
    return next(new ApiError(`this coupon is expire or invalid`, 400));
  }
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError(`no cart for this user`, 404));
  }
  const totalPrice = calcTotalPrice(cart);
  const totalPriceAfterDiscount =
    totalPrice - (totalPrice * coupon.discount) / 100;

  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  console.log(totalPriceAfterDiscount);
  await cart.save();
  return res.status(200).json({
    numberOfCartItems: cart.cartItems.length,
    cart,
  });
});
