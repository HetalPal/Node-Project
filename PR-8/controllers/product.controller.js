const Product = require('../model/product.model')
const Category = require('../model/category.model')
const SubCategory = require('../model/subcategory.model')
const ExtraCategory = require('../model/extraCategory.model')

exports.addProductPage = async (req, res) => {
    try {
        let categories = await Category.find()
        let subcategories = await SubCategory.find()
        let extracategories = await ExtraCategory.find()

        res.render('product/addProduct', { categories, subcategories, extracategories })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

exports.addProduct = async (req, res) => {
    try {
        let image = req.file ? `/uploads/${req.file.filename}` : ""
        await Product.create({
            title: req.body.title,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            categoryId: req.body.categoryId,
            subCategoryId: req.body.subCategoryId,
            extraCategoryId: req.body.extraCategoryId,
            productImage: image
        })
        res.redirect('/product/view-product')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

exports.viewProduct = async (req, res) => {
    try {

        let products = await Product.find()
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

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.redirect('/product/view-product')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

exports.editProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)
        let categories = await Category.find()
        let subcategories = await SubCategory.find()
        let extracategories = await ExtraCategory.find()

        res.render('product/editProduct', { product, categories, subcategories, extracategories })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}



exports.updateProduct = async (req, res) => {
    try {
        let image = req.file ? `/uploads/${req.file.filename}` : req.body.oldImage
        await Product.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            categoryId: req.body.categoryId,
            subCategoryId: req.body.subCategoryId,
            extraCategoryId: req.body.extraCategoryId,
            productImage: image
        })
        res.redirect('/product/view-product')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}