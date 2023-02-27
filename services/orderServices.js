const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const factoryHandler = require("./factory_handler");

const Orders = require("../models/order");
const Cart = require("../models/cart");
const Prodcut = require("../models/proudct");

exports.createOrder = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;
  //get the cart based on cartId
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(new ApiError(`no cart for this user`, 404));
  }

  //get totalOrder price & check if coupon is applied
  const totalPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  //calc totalOrderPrice
  const totalOrderPrice = totalPrice + taxPrice + shippingPrice;

  //create order
  const order = await Orders.create({
    user: req.user._id,
    totalOrderPrice: totalOrderPrice,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
  });

  //increase sold and decrese quantity of product
  if (order) {
    const bulkOptions = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { sold: +item.quantity, quantity: -item.quantity } },
      },
    }));
    await Prodcut.bulkWrite(bulkOptions, {});
    await Cart.findByIdAndDelete(req.params.cartId);
  }
  return res.status(200).json({
    message: "success",
    data: order,
  });
});

exports.getAllOrders = factoryHandler.findListOfDocs(Orders);

exports.getOrder = factoryHandler.getDocument(Orders);

exports.getLoggedUserOrders = (req, res, next) => {
  if (req.user.role === "user") {
    req.objFilter = { user: req.user._id };
  }
  next();
};

//change status of paid
exports.updateOrderPaid = asyncHandler(async (req, res, next) => {
  const updateOrder = await Orders.findById(req.params.orderId);
  if (!updateOrder) {
    return next(
      new ApiError(`no order for this id ${req.params.orderId}`, 404)
    );
  }

  updateOrder.isPaid = true;
  updateOrder.paidAt = Date.now();

  await updateOrder.save();
  return res.status(200).json({
    message: "success",
    data: updateOrder,
  });
});

//change status of delivered
exports.updateOrderDelivered = asyncHandler(async (req, res, next) => {
  const updateOrder = await Orders.findById(req.params.orderId);
  if (!updateOrder) {
    return next(
      new ApiError(`no order for this id ${req.params.orderId}`, 404)
    );
  }

  updateOrder.isDelivered = true;
  updateOrder.DeliveredAt = Date.now();

  await updateOrder.save();
  return res.status(200).json({
    message: "success",
    data: updateOrder,
  });
});
