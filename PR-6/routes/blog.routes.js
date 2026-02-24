const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller");
const upload = require("../middleware/uploadImage");

router.get("/add-blog", blogController.addBlogPage);
router.post("/add-blog", upload.single("image"), blogController.insertBlog);

router.get("/view-blog", blogController.viewBlog);
router.get("/single-blog/:id", blogController.singleBlog);

router.get("/edit-blog/:id", blogController.editBlogPage);
router.post("/update-blog/:id", upload.single("image"), blogController.updateBlog);

router.get("/delete-blog/:id", blogController.deleteBlog);

module.exports = router;