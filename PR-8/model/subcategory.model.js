const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({

    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subCategoryName:{
        type:String
    }

})

module.exports = mongoose.model('SubCategory', subCategorySchema)