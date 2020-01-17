const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sessionSchema = new Schema({
    name: {
        type: String,
        required: "Le nom de la promo est requis."
    },
    year: {
        type: String,
        required: "L'année de la promo est requis."
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Session', sessionSchema);