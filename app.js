const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const userRouter = require("./routes/user.route.js");
const memberRouter = require("./routes/member.route.js");
const universityStudentRouter = require("./routes/universityStudent.route.js");
const recentActivitiesRouter = require("./routes/recentActivities.route.js");
const principalAdviserMessageRouter = require("./routes/principalAdviserMessage.route.js");
const presidentMessageRouter = require("./routes/presidentMessage.route.js");
const donorPartnerRouter = require("./routes/donorPartner.route.js");
const provideHelpRouter = require("./routes/provideHelp.route.js");
const scholarshipApplicationRouter = require("./routes/scholarshipApplication.route.js");
const uploader = require("./middleware/uploader.js");
const verifyToken = require("./middleware/verifyToken.js");
const meritoriousStudentRouter = require("./routes/meritoriouseStudent.route.js");
const headerBannerRouter = require("./routes/headerBanner.route.js");
const PicnicRouter = require("./routes/picnic.route.js");
const NoticeRouter = require("./routes/notice.route.js");
const BloodDonorRouter = require("./routes/bloodDonor.route.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("images"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/member", memberRouter);
app.use("/api/v1/university-student", universityStudentRouter);
app.use("/api/v1/recent-activities", recentActivitiesRouter);
app.use("/api/v1/adviser-message", principalAdviserMessageRouter);
app.use("/api/v1/president-message", presidentMessageRouter);
app.use("/api/v1/donor-partner", donorPartnerRouter);
app.use("/api/v1/provide-help", provideHelpRouter);
app.use("/api/v1/header-banner", headerBannerRouter);
app.use("/api/v1/scholarship-application", scholarshipApplicationRouter);
app.use("/api/v1/meritorious-student", meritoriousStudentRouter);
app.use("/api/v1/picnic", PicnicRouter);
app.use("/api/v1/notice", NoticeRouter);
app.use("/api/v1/blood-donor", BloodDonorRouter);

app.get("/", cors(), (req, res) => {
  res.status(200).json({
    success: true,
    message: "PBTS server is running!",
  });
});

app.get("/api/v1/images/:url", cors(), (req, res) => {
  const { url } = req.params;
  res.sendFile(__dirname + `/images/${url}`);
});

app.post("/api/v1/upload-image", uploader.single("image"), (req, res) => {
  res.status(201).json({
    success: true,
    message: "Successfully uploaded image",
    url: req.file.destination + req.file.filename,
  });
});

// Route to upload multiple files
app.post("/api/v1/upload-files", uploader.array("files", 10), (req, res) => {
  // Limit to 10 files for example
  const fileUrls = req.files.map((file) => ({
    url: `${file.destination}${file.filename}`,
    type: file.mimetype,
  }));
  res.status(201).json({
    success: true,
    message: "Successfully uploaded files",
    files: fileUrls,
  });
});

// Route to retrieve file based on type
app.get("/api/v1/retrieve-file/:filename", (req, res) => {
  const { filename } = req.params;
  const extension = path.extname(filename).toLowerCase();

  let directory;
  if (extension === ".pdf") {
    directory = "pdfs";
  } else if (
    extension === ".png" ||
    extension === ".jpg" ||
    extension === ".jpeg"
  ) {
    directory = "images";
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Unsupported file type" });
  }

  const filePath = path.resolve(__dirname, `${directory}/${filename}`);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ success: false, message: "File not found" });
    }
  });
});

app.get("/api/v1/verify-admin", verifyToken, (req, res) => {
  // Extract the role from the decoded token payload
  const { role } = req.user;

  // Perform role-based checks or other validations
  if (role !== "admin") {
    return res.status(403).json({
      statusCode: 403,
      success: false,
      message: "Insufficient privileges",
    });
  }

  // Token is valid and user has the required role
  return res.json({
    success: true,
    message: "Token is valid and role is correct",
  });
});
app.get("/api/v1/verify", verifyToken, (req, res) => {
  return res.json({
    success: true,
    message: "Token is valid",
  });
});

app.use((err, req, res, next) => {
  // Check if the error has a status code
  if (err.statusCode) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: false,
      error: err.message,
    });
  } else {
    // If the error doesn't have a status code, assume it's a 500 internal server error
    res.status(500).json({
      statusCode: 500,
      success: false,
      error: err.message ?? "Internal Server Error",
    });
  }
});

module.exports = app;
