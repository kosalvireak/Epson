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
    displayedCharts: {
        showBarChart: { type: Boolean },
        showLineChart: { type: Boolean },
        showPieChart: { type: Boolean },
        showDoughnutChart: { type: Boolean }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
module.exports = mongoose.model('Csv', CsvsSchema)