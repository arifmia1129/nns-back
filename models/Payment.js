const mongoose = require("mongoose");
const moment = require("moment");

const paymentSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return moment(value, "MM-YYYY", true).isValid();
        },
        message: "Invalid month format. Please use MM-YYYY format.",
      },
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["bkash", "nagad", "bank", "cash"],
    },
    transactionId: {
      type: String,
      required: function () {
        return this.paymentMethod !== "cash";
      },
    },
    accountNumber: {
      type: String,
      required: function () {
        return this.paymentMethod === "bank";
      },
    },
    screenshot: {
      type: String, // URL to the payment screenshot
      required: function () {
        return this.paymentMethod !== "cash";
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNote: {
      type: String,
      default: "",
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
