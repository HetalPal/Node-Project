const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadImage");
const {verifyAdminToken} = require("../middleware/verifyToken");
const { verifyManagerToken } = require("../middleware/verifyToken");
const { verifyAllRoles } = require("../middleware/verifyToken");

const {register,login,profile,update,Adelete} = require("../controller/admin.controller");
const {createManager,getManagers,updateManager,deleteManager} = require("../controller/manager.controller");
const {getAllEmpolyees} = require("../controller/employee.controller");

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.get("/profile", verifyAdminToken, profile);
router.put("/update", verifyAdminToken, update);
router.delete("/delete", verifyAdminToken, Adelete );

// ADMIN CREATE MANAGR
router.post("/add-manager", verifyManagerToken,upload.single("image"), createManager);
router.get("/all-managers", verifyAdminToken,getManagers);
router.put("/update-manager/:id", verifyAdminToken, updateManager);
router.delete("/delete-manager/:id", verifyAdminToken, deleteManager);

router.get("/get-all-employees", verifyAllRoles, getAllEmpolyees);

module.exports = router;