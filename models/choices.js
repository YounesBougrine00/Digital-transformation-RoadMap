const mongoose = require('mongoose')

const choiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    axe_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'axes'
    },
    level_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stadiums'
    },
})

const Choices = mongoose.model("choices", choiceSchema);

module.exports = { Choices };