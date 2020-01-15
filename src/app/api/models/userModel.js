const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

var UserSchema = new Schema({
    role: {
        type:integer ,
        required:true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true
    },
    hash_password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('User', UserSchema);