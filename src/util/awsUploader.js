const AWS = require('aws-sdk');
const config = require('../config');

const uploadImageToAWS = async (imageFile) => {


    const s3 = new AWS.S3({
        accessKeyId: config.AWS.ACCESS_KEY,
        secretAccessKey: config.AWS.SECRET_ACCESS_KEY
    })

    const params = {
        Bucket: config.AWS.BUCKET_NAME,
        Key: imageFile.originalname,
        Body: imageFile.buffer,
        ACL: 'public-read'
    }

    const result = await s3.upload(params).promise()

    console.log('uploaded => ', result.Location)

    return result.Location;

}

module.exports = {
    uploadImageToAWS
}