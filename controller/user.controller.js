const { default: axios } = require("axios");
const {
  signupService,
  loggedInUserService,
  getUserByToken,
  getUsersService,
  changeUserRoleService,
  changeUserStatusService,
} = require("../services/user.services");
const sendSms = require("../utils/sendSms");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res, next) => {
  try {
    const userInfo = req.body;

    userInfo.imageUrl = req.file.destination + req.file.filename;
    const user = await signupService(userInfo);

    await user.save({ validateBeforeSave: false });

    sendSms(
      user?.mobile,
      "তথ্য যাচাইবাচাই এর পর আপনার একাউন্ট টি অনুমোদন করা হবে। পূর্ব বড়ুয়া তরুণ সংঘ আইটি টিম।"
    );

    res.status(201).json({
      success: true,
      message: "Successfully singed up",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. If not user send res
 * 4. Compare password
 * 5. If password not correct send res
 * 6. Check if user is active
 * 7. If not active send res
 * 8. Generate token
 * 9. Send user and token
 * */

exports.login = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      const error = new Error("Mobile or Password missing!");
      error.statusCode = 400;
      throw error;
    }

    const user = await loggedInUserService(mobile);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 400;
      throw error;
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Mobile or Password is invalid!");
      error.statusCode = 400;
      throw error;
    }

    if (user.status != "active") {
      const error = new Error("Account not active");
      error.statusCode = 400;
      throw error;
    }

    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const query = {};

    if (req.query.role) {
      query.role = req.query.role;
    }

    const users = await getUsersService(query);

    if (!users.length) {
      return res.status(400).json({
        success: false,
        message: "Users not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get users",
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something wrong",
    });
  }
};

exports.changeRole = async (req, res, next) => {
  try {
    const { _id, role } = req.body;

    if (!_id | !role) {
      return res.status(400).json({
        success: true,
        message: "Not valid request",
      });
    }

    await changeUserRoleService(req.body);
    res.status(200).json({
      success: true,
      message: "Successfully change user role",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something wrong",
    });
  }
};

exports.changeStatus = async (req, res, next) => {
  try {
    const { _id, status } = req.body;

    if (!_id | !status) {
      return res.status(400).json({
        success: true,
        message: "Not valid request",
      });
    }

    await changeUserStatusService(req.body);
    res.status(200).json({
      success: true,
      message: "Successfully change user status",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something wrong",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await loggedInUserService(req?.user?.email);
    res.status(200).json({
      success: true,
      message: "Valid user",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getTokenUser = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await getUserByToken(token);
    const expired = new Date() > new Date(user?.confirmationTokenExpire);

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (expired) {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    user.status = "active";
    user.confirmationToken = undefined;
    user.confirmationTokenExpire = undefined;

    user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Account actived",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.verifyNid = async (req, res, next) => {
  try {
    const { nid, dob } = req.body;

    // Validate input
    if (!nid || !dob) {
      return res.status(400).json({
        success: false,
        message: "NID and DOB are required",
      });
    }

    // Construct the verification API URL
    const verificationUrl = `https://api.foxithub.pro/unofficial/api.php?key=udcbd22&nid=${nid}&dob=${dob}`;

    // Make the API request
    const { data } = await axios.get(verificationUrl);

    // Handle successful response from external API
    if (data.data && data.data.status === 200) {
      return res.status(200).json({
        success: true,
        message: "NID verified successfully",
        data: data?.data?.data,
      });
    }

    // If API verification failed
    return res.status(400).json({
      success: false,
      message: "NID verification failed",
      data: null,
    });
  } catch (error) {
    // Handle errors
    // console.error("Error verifying NID:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong during NID verification",
      error: error.message,
    });
  }
};
