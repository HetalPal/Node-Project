const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose')
const Category = require('../model/category.model');
const SubCategory = require('../model/subcategory.model');
const ExtraCategory = require('../model/extraCategory.model');
const Product = require('../model/product.model');

exports.addCategoryPage = async (req, res) => {
    try {
        return res.render('category/addCategory');
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.addCategory = async (req, res) => {
    try {

        let imagePath = req.file ? `/uploads/${req.file.filename}` : "";

        await Category.create({
            categoryname: req.body.categoryname,
            categoryImg: imagePath
        });

        return res.redirect("/category/view-category");

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.viewCategory = async (req, res) => {
    try {

        let categories = await Category.find();

        return res.render('category/viewCategory', {
            categories
        });

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.deleteCategory = async (req, res) => {
    try {

        const categoryId = req.params.id;

        //  Find SubCategories
        const subcategories = await SubCategory.find({ categoryId });
        const subCategoryIds = subcategories.map(sub => sub._id);

        //  Find ExtraCategories
        const extraCategories = await ExtraCategory.find({
            subCategoryId: { $in: subCategoryIds }
        });
        const extraCategoryIds = extraCategories.map(extra => extra._id);

        //  Delete Products
        await Product.deleteMany({
            extraCategoryId: { $in: extraCategoryIds }
        });

        //  Delete ExtraCategories
        await ExtraCategory.deleteMany({
            subCategoryId: { $in: subCategoryIds }
        });

        //  Delete SubCategories
        await SubCategory.deleteMany({ categoryId });

        //  Delete Category
        await Category.findByIdAndDelete(categoryId);

        res.redirect('/category/view-category');

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.editCategory = async (req, res) => {
    try {

        let category = await Category.findById(req.params.id);

        return res.render('category/editCategory', {
            category
        });

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.updateCategory = async (req, res) => {
    try {

        let category = await Category.findById(req.params.id);

        let updateData = {
            categoryname: req.body.categoryname
        };

        if (req.file) {

            if (category.categoryImg) {

                let oldImg = path.join(__dirname, "..", category.categoryImg);

                try {
                    fs.unlinkSync(oldImg);
                } catch (err) {
                    console.log("Old image not found");
                }

            }

            updateData.categoryImg = `/uploads/${req.file.filename}`;
        }

        await Category.findByIdAndUpdate(req.params.id, updateData);

        return res.redirect("/category/view-category");

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};