const Book = require("../model/book.model");
const fs = require("fs");
const path = require("path");

exports.getBooks = async(req, res)=>{
    const books = await Book.find();
    res.render("index", { books });
};

exports.addBook = async(req, res)=>{
    let image = req.file ? req.file.filename : "";
    await Book.create({
        bookid: req.body.bookid,
        bookname: req.body.bookname,
        authorname: req.body.authorname,
        price: req.body.price,
        quantity: req.body.quantity,
        language: req.body.language,
        category: req.body.category,
        pages: req.body.pages,
        img: image
    });
    res.redirect("/");
};

exports.editBookPage = async(req, res)=>{
    const book = await Book.findById(req.params.id);
    res.render("editBook", { book });
};

exports.updateBook = async(req, res)=>{
    const oldBook = await Book.findById(req.params.id);
    let image = oldBook.img;
    if(req.file){
        if(oldBook.img){
            fs.unlinkSync(path.join(__dirname, "..", "uploads", oldBook.img));
        }
        image = req.file.filename;
    }
    await Book.findByIdAndUpdate(req.params.id, {
        bookid: req.body.bookid,
        bookname: req.body.bookname,
        authorname: req.body.authorname,
        quantity: req.body.quantity,
        language: req.body.language,
        category: req.body.category,
        img: image
    });
    res.redirect("/");
};

exports.deleteBook = async (req, res) => {
    const id = req.params.id;

    const book = await Book.findById(id);
    if (!book) {
        console.log("Book not found");
        return res.redirect('/');
    }

    if (book.img && book.img !== "") {
        let imagePath = path.join(__dirname, "..", "uploads", book.img);
        try {
            fs.unlinkSync(imagePath);
        } catch (err) {
            console.log("Image not found");
        }
    }

    await Book.findByIdAndDelete(id);
    res.redirect('/');
};
