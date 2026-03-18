const Category = require('../model/category.model');
const SubCategory = require('../model/subcategory.model')
const ExtraCategory = require('../model/extraCategory.model');
const Product = require('../model/product.model');

exports.addSubCategoryPage = async (req, res) => {
    try {

        let categories = await Category.find();

        res.render('subcategory/addSubCategory', {
            categories
        })

    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

exports.addSubCategory = async (req, res) => {
    try {

        await SubCategory.create({
            categoryId: req.body.categoryId,
            subCategoryName: req.body.subCategoryName
        })

        res.redirect('/subcategory/view-subcategory')

    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

exports.viewSubCategory = async (req, res) => {
    try {

        let subcategories = await SubCategory.find().populate('categoryId');
        res.render('subcategory/viewSubCategory', {
            subcategories
        })

    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

exports.deleteSubCategory = async (req, res) => {
    try {

        const subCategoryId = req.params.id;

        //  Find ExtraCategories
        const extraCategories = await ExtraCategory.find({
            subCategoryId: subCategoryId
        });

        const extraCategoryIds = extraCategories.map(extra => extra._id);

        //  Delete Products
        await Product.deleteMany({
            extraCategoryId: { $in: extraCategoryIds }
        });

        //  Delete ExtraCategories
        await ExtraCategory.deleteMany({
            subCategoryId: subCategoryId
        });

        //  Delete SubCategory
        await SubCategory.findByIdAndDelete(subCategoryId);

        res.redirect('/subcategory/view-subcategory');

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.editSubCategory = async (req, res) => {
    try {

        let subcategory = await SubCategory.findById(req.params.id);
        let categories = await Category.find();

        res.render("subcategory/editSubCategory", {
            subcategory,
            categories
        });

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};

exports.updateSubCategory = async (req, res) => {
    try {

        await SubCategory.findByIdAndUpdate(req.params.id, {
            categoryId: req.body.categoryId,
            subCategoryName: req.body.subCategoryName
        });

        res.redirect("/subcategory/view-subcategory");

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};