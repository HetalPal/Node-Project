const express = require('express');
const routes = express.Router();
const uploadImage = require('../middleware/uploadImage');
const {addCategoryPage,addCategory,viewCategory,editCategory,updateCategory,deleteCategory} = require('../controllers/category.controller');

routes.get('/add-category', addCategoryPage);
routes.post('/add-category',uploadImage.single('categoryImage'),addCategory);
routes.get('/view-category', viewCategory);
routes.get('/edit-category/:id', editCategory);
routes.post('/update-category/:id',uploadImage.single('categoryImage'),updateCategory);
routes.get('/delete-category/:id', deleteCategory);

module.exports = routes;