const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

    title: String,

    description: String,

    quantity: Number,

    price: Number,

    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },

    subCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubCategory'
    },

    extraCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ExtraCategory'
    },

    productImage:String

})

module.exports = mongoose.model('Product',productSchema)