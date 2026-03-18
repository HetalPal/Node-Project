const Product = require('../model/product.model');
const Category = require('../model/category.model');
const SubCategory = require('../model/subcategory.model');
const ExtraCategory = require('../model/extraCategory.model');


//  Add Product Page
exports.addProductPage = async (req, res) => {
    try {
        const categories = await Category.find();
        const subcategories = await SubCategory.find();
        const extracategories = await ExtraCategory.find();

        res.render('product/addProduct', {
            categories,
            subcategories,
            extracategories
        });

    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};


//  Add Product
exports.addProduct = async (req, res) => {
    try {

        let image = req.file ? `/uploads/${req.file.filename}` : "";

        await Product.create({
            title: req.body.title,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            categoryId: req.body.categoryId,
            subCategoryId: req.body.subCategoryId,
            extraCategoryId: req.body.extraCategoryId,
            productImage: image
        });

        res.redirect('/product/view-product');

    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};


//  View Product 
exports.viewProduct = async (req, res) => {
    try {

        const products = await Product.find()
            .populate('categoryId')
            .populate('subCategoryId')
            .populate('extraCategoryId');

        res.render('product/viewProduct', {
            products
        });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};


//  Delete Product (SAFE)
exports.deleteProduct = async (req, res) => {
    try {

        const productId = req.params.id;

        await Product.findByIdAndDelete(productId);

        res.redirect('/product/view-product');

    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};


//  Edit Product Page
exports.editProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        const categories = await Category.find();
        const subcategories = await SubCategory.find();
        const extracategories = await ExtraCategory.find();

        res.render('product/editProduct', {
            product,
            categories,
            subcategories,
            extracategories
        });

    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};


//  Update Product
exports.updateProduct = async (req, res) => {
    try {

        let image = req.file
            ? `/uploads/${req.file.filename}`
            : req.body.oldImage;

        await Product.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            categoryId: req.body.categoryId,
            subCategoryId: req.body.subCategoryId,
            extraCategoryId: req.body.extraCategoryId,
            productImage: image
        });

        res.redirect('/product/view-product');

    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};