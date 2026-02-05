const express = require("express");
const router = express.Router();

const upload = require("../middleware/imageUpload");
const book = require("../controllers/book.controller");

router.get("/", book.getBooks);
router.post("/add-book", upload.single("img"), book.addBook);
router.get("/edit/:id", book.editBookPage);
router.post("/edit/:id", upload.single("img"), book.updateBook);
router.get("/delete/:id", book.deleteBook);

module.exports = router;
