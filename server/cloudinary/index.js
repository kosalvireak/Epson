const cloudinary = require('cloudinary').v2;
const config = require('../config/default.json')
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: "dahrstekd",
    api_key: "293195941186492",
    api_secret: "bVn297Ls4ZGiOg6LGbjuzKzheEM"
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Business Intelligence',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})

module.exports = { cloudinary, storage }