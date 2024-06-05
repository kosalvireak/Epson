const mongoose = require('mongoose')
const CsvsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    upload: {
        type: Date,
    },
    names: [String],
    numbers: [Number],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
module.exports = mongoose.model('Csv', CsvsSchema)