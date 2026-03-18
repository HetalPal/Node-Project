const express = require('express');
const routes = express.Router();

const {
  addSubCategoryPage,
  addSubCategory,
  viewSubCategory,
  editSubCategory,
  updateSubCategory,
  deleteSubCategory
} = require('../controllers/subCategory.controller');

routes.get('/add-subcategory', addSubCategoryPage);
routes.post('/add-subcategory', addSubCategory);
routes.get('/view-subcategory', viewSubCategory);
routes.get('/edit-subcategory/:id', editSubCategory);
routes.post('/update-subcategory/:id', updateSubCategory);
routes.get('/delete-subcategory/:id', deleteSubCategory); 

module.exports = routes;