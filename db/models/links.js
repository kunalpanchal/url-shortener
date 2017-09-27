const mongoose = require('mongoose');
const linksSchema = new mongoose.Schema(
    {
        longUrl: {
            type: String,
            unique: true,
            trim: true
        },
        shortUrl: {
            type: String,
            trim: true
        },
        fullHash: {
            type: String,
            trim: true
        },
        shortHash: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
        autoIndex: true
    }
);
const links = mongoose.model('Links', linksSchema);
module.exports = links;