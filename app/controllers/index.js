"use strict"

var bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let Links = mongoose.model('Links');

module.exports = {
    handleUrlRetrieval: async (req, res, next) => {
        try {
            let extensionUrl = '';
            let hashValue;
            if (req.path.split('/').splice(1).length > 1) {
                hashValue = req.path.split('/')[1];
                extensionUrl = req.path.split('/').splice(2).join('/');
            } else
                hashValue = req.path.substring(1);

            const link = await Links.findOne({ shortHash: hashValue });
            link && res.redirect(301, `${link.longUrl}/${extensionUrl}`);
            res.json({ message: 'Not Found' });
        } catch (e) {
            console.log('erererer', e);
        }
    },
    generate: async (req, res, next) => {
        const longUrl = req.query.longUrl;
        const isLongUrlExists = await Links.findOne({ longUrl });
        if (isLongUrlExists) {
            return res.json({
                message: 'Long Url Exists',
                shortUrl: getShortUrlWithHash(isLongUrlExists.shortHash),
            });
        }

        // This loop will run for 10 times untill it finds the right hash
        for (let i = 0; i < 10; i++) {
            const saltRounds = 8;
            const salt = await bcrypt.genSaltSync(saltRounds);
            let hash = await bcrypt.hashSync(longUrl, salt);
            hash = hash.replace('/', randChar()); //because we can't have slashes in the hash.
            const shortHash = hash.toString().substring(hash.length - 8, hash.length);
            const isExist = await Links.findOne({ shortHash });
            if (!isExist) {
                let links = new Links();
                links.shortHash = shortHash;
                links.longUrl = longUrl;
                links.fullHash = hash;
                await links.save();

                return res.json({ longUrl, shortUrl: getShortUrlWithHash(shortHash), hash, saltRounds });
                break;
            }
        }
        return res.json({ error: `Error Occured,couldn't find the right hash` });
    }
}

function randChar() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

function getShortUrlWithHash(hashValue) {
    return `http://localhost:3000/${hashValue}`;
}