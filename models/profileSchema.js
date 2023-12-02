const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    profileImg: [
        {
            fieldname: String,
            originalname: String,
            encoding: String,
            mimetype: String,
            destination: String,
            filename: String,
            path: String,
            size: Number
        }
    ],
    coverImg: [
        {
            fieldname: String,
            originalname: String,
            encoding: String,
            mimetype: String,
            destination: String,
            filename: String,
            path: String,
            size: Number
        }
    ],
    userName: String,
    Bio: String,
    userEmail: String,
    website: String
});

const profileModel = mongoose.model('Profile', profileSchema);
module.exports= profileModel;