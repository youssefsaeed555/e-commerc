const mongoose = require("mongoose");

const brcypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "too short password"],
    },
    phone: String,
    profileImg: String,
    role: {
      type: String,
      enum: ["user", "manger", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    changePasswordAt: Date,
    passwordCodeReset: String,
    passwordCodeResetExpire: Date,
    isVerified: Boolean,
    wishList: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Proudcts",
      },
    ],
    address: [
      {
        id: mongoose.Schema.Types.ObjectId,
        alias: String,
        details: String,
        postalCode: Number,
        city: String,
        phone: String,
      },
    ],
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.profileImg) {
    const imgUrl = `${process.env.BASE_URl}/uploads/users/${doc.profileImg}`;
    doc.profileImg = imgUrl;
  }
};

userSchema.post("init", (doc) => {
  setImageUrl(doc);
});

userSchema.post("save", (doc) => {
  setImageUrl(doc);
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await brcypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("Users", userSchema);
