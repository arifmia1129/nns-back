const MeritoriousStudent = require("../models/MeritoriousStudent");

const getLastId = async () => {
  const latest = await MeritoriousStudent.findOne({}, { id: 1, _id: -1 })
    .sort({ createdAt: -1 })
    .lean();

  return latest?.id ? Number(latest.id) : 0;
};

const generateMeritoriouseStudentId = async () => {
  const latestId = await getLastId();
  return (latestId + 1).toString().padStart(5, "0");
};

module.exports = generateMeritoriouseStudentId;
