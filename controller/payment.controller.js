const {
  submitPaymentService,
  getPaymentsService,
  getMemberPaymentsService,
  updatePaymentStatusService,
  getPaymentSummaryService,
} = require("../services/payment.services");

exports.submitPayment = async (req, res, next) => {
  console.log(req.user);
  try {
    const paymentData = {
      ...req.body,
      memberId: req.user.id,
      status: "pending",
    };

    if (req.file) {
      paymentData.screenshot = req.file.destination + req.file.filename;
    }

    const payment = await submitPaymentService(paymentData);

    res.status(201).json({
      success: true,
      message: "Payment submitted successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPayments = async (req, res, next) => {
  try {
    const query = {};

    // Filter by status if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by month if provided
    if (req.query.month) {
      query.month = req.query.month;
    }

    // Filter by member if provided (for admin)
    if (req.query.memberId) {
      query.memberId = req.query.memberId;
    }

    const payments = await getPaymentsService(query);

    res.status(200).json({
      success: true,
      message: "Payments retrieved successfully",
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyPayments = async (req, res, next) => {
  try {
    const payments = await getMemberPaymentsService(req.user.id);

    res.status(200).json({
      success: true,
      message: "Your payments retrieved successfully",
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePaymentStatus = async (req, res, next) => {
  try {
    const { paymentId, status, adminNote } = req.body;

    const payment = await updatePaymentStatusService(
      paymentId,
      status,
      adminNote,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPaymentSummary = async (req, res, next) => {
  try {
    const summary = await getPaymentSummaryService(req.user.id);

    res.status(200).json({
      success: true,
      message: "Payment summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};
