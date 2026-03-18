const mongoose = require('mongoose');

const extraCategorySchema = new mongoose.Schema({

    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },

    extraCategoryName: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('ExtraCategory', extraCategorySchema);