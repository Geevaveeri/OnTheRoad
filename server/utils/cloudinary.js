const cloudinary = require('cloudinary').v2;
const fileupload = require('express-fileupload');

cloudinary.config({
    cloud_name: process.env.CC_NAME,
    api_key: process.env.CC_KEY,
    api_secret: process.env.CC_SECRET
});

