const BloodDonor = require("../models/BloodDonor");

exports.createBloodDonorService = async (data) => {
  const isExist = await BloodDonor.findOne({ mobile: data.mobile });

  if (isExist) {
    throw new Error("Your mobile number is already exists!");
  }

  return await BloodDonor.create(data);
};

exports.getBloodDonorsService = async (filter, options) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    district,
    upazila,
    union,
    bloodGroup,
  } = options;

  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { district: { $regex: search, $options: "i" } },
      { upazila: { $regex: search, $options: "i" } },
      { union: { $regex: search, $options: "i" } },
    ];
  }

  if (district) query.district = district;
  if (upazila) query.upazila = upazila;
  if (union) query.union = union;
  if (bloodGroup) query.bloodGroup = bloodGroup.trim();

  const bloodDonors = await BloodDonor.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await BloodDonor.countDocuments(query);

  return { bloodDonors, total };
};

exports.getBloodDonorByIdService = async (id) => {
  return await BloodDonor.findById(id);
};

exports.updateBloodDonorByIdService = async (id, data) => {
  return await BloodDonor.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

exports.deleteBloodDonorByIdService = async (id) => {
  return await BloodDonor.findByIdAndDelete(id);
};
