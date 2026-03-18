const express = require('express')
const { addProductPage, addProduct, viewProduct, deleteProduct, editProduct, updateProduct } = require('../controllers/product.controller')

const upload = require('../middleware/multer')

const routes = express.Router()

routes.get('/add-product', addProductPage)

routes.post('/add-product', upload.single('productImage'), addProduct)

routes.get('/view-product', viewProduct)

routes.get('/delete-product/:id', deleteProduct)

routes.get('/edit-product/:id', editProduct)

routes.post('/update-product/:id', upload.single('productImage'), updateProduct)

module.exports = routes