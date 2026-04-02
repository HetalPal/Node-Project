const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadImage");

const {loginEmployee,getProfile,updateProfile,getAllEmpolyees} = require("../controller/employee.controller");
const { verifyEmployeeToken } = require("../middleware/verifyToken");

router.post("/login", loginEmployee);
router.get("/profile", verifyEmployeeToken, getProfile);
router.put("/update", verifyEmployeeToken,upload.single("image"), updateProfile);
router.get("/get-all-employees", verifyEmployeeToken, getAllEmpolyees);

module.exports = router;