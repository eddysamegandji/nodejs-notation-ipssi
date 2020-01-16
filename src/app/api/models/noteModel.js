const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let noteSchema = new Schema({
    note: {
        type: Number,
        required: "La note est requise"
    },
    message: {
        type: String
    },
    id_module: {
        type: String,
        required: "ID module requis"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Note', noteSchema);