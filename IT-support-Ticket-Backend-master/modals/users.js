const mongoose = require("mongoose");

// defining schema for users
const userScema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    profilePic: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // enable time stamp
  }
);

userScema.pre("save", (next) => {
  if (this.role !== "engineer") {
    this.assignedTickets = [];
  }
  next();
});

module.exports = mongoose.model("User", userScema);
