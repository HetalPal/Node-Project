const fs = require('fs');
const path = require('path');
const Category = require('../model/category.model');

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

        let category = await Category.findById(req.params.id);

        if (category.categoryImg) {

            let imgPath = path.join(__dirname, "..", category.categoryImg);

            try {
                fs.unlinkSync(imgPath);
            } catch (err) {
                console.log("Image not found");
            }
        }

        await Category.findByIdAndDelete(req.params.id);

        return res.redirect("/category/view-category");

    } catch (error) {
        console.log(error);
        return res.redirect("/");
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