const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let moduleModel = new Schema({
    name: {
        type: String,
        required: "Le nom du module est requis"
    },
    id_intervenant: {
        type: String,
        required: "Id intervenant requis"
    },
    id_session: {
        type: String,
        required: "Id session requis"
    },
    date_debut: {
        type: Date,
        required: "date de début requis"
    },
    date_fin: {
        type: Date,
        required: "date de fin requis"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Module', moduleModel);