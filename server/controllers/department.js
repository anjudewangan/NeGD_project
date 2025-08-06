const Department = require("../models/Department");
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ departments });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}