const express = require('express')

const {
addSubCategoryPage,
addSubCategory,
viewSubCategory,
deleteSubCategory,
editSubCategory,
updateSubCategory
} = require('../controllers/subCategory.controller')

const routes = express.Router()

routes.get('/add-subcategory',addSubCategoryPage)
routes.post('/add-subcategory',addSubCategory)
routes.get('/view-subcategory',viewSubCategory)
routes.get('/delete-subcategory/:id',deleteSubCategory)
routes.get('/edit-subcategory/:id',editSubCategory)
routes.post('/update-subcategory/:id',updateSubCategory)

module.exports = routes