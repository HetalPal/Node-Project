const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");
const upload = require("../middleware/uploadImage");

// Add Admin Page
router.get("/add-admin", adminController.addAdminPage);
router.post("/add-admin", upload.single("profileImage"), adminController.insertAdmin);

// View Admin
router.get("/view-admin", adminController.viewAdmin);

// View Single Admin
router.get("/single-admin/:id", adminController.singleAdmin);

// Edit Admin
router.get("/edit-admin/:id", adminController.editAdminPage);
router.post("/update-admin/:id", upload.single("profileImage"), adminController.updateAdmin);

// Delete Admin
router.get("/delete-admin/:id", adminController.deleteAdmin);

module.exports = router;