const Payment = require("../models/Payment");
const User = require("../models/User");
const moment = require("moment");

exports.submitPaymentService = async (paymentData) => {
  const payment = await Payment.create(paymentData);

  // Add payment to user's payment history
  await User.findByIdAndUpdate(paymentData.memberId, {
    $push: { paymentHistory: payment._id },
  });

  return payment;
};

exports.getPaymentsService = async (query = {}) => {
  return await Payment.find(query).populate(
    "memberId",
    "name membershipId imageUrl"
  );
};

exports.getMemberPaymentsService = async (memberId) => {
  return await Payment.find({ memberId }).sort({ month: -1 });
};

exports.updatePaymentStatusService = async (
  paymentId,
  status,
  adminNote,
  processedBy
) => {
  const payment = await Payment.findByIdAndUpdate(
    paymentId,
    { status, adminNote, processedBy },
    { new: true, runValidators: true }
  );

  if (status === "approved") {
    // Update user's last payment date if approved
    await User.findByIdAndUpdate(payment.memberId, {
      lastPaymentDate: new Date(),
    });
  }

  return payment;
};

exports.getPaymentSummaryService = async (memberId) => {
  const user = await User.findById(memberId).populate("paymentHistory");
  const currentMonth = moment().format("MM-YYYY");

  // Check if user has paid for current month
  const hasPaidCurrentMonth = user.paymentHistory.some(
    (payment) => payment.month === currentMonth && payment.status === "approved"
  );

  // Get last 6 months payment status
  const months = [];
  for (let i = 0; i < 6; i++) {
    const month = moment().subtract(i, "months").format("MM-YYYY");
    const payment = user.paymentHistory.find(
      (p) => p.month === month && p.status === "approved"
    );

    months.push({
      month,
      paid: !!payment,
      paymentId: payment?._id,
      amount: payment?.amount || user.monthlyFee,
    });
  }

  return {
    currentMonthStatus: hasPaidCurrentMonth ? "paid" : "unpaid",
    monthlyFee: user.monthlyFee,
    paymentHistory: months,
    lastPaymentDate: user.lastPaymentDate,
  };
};
