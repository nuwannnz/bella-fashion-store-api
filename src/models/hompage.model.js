const mongoose = require("mongoose");

const Homepage = new mongoose.Schema(
    {
        banners: [
            {
                image: String,
                link: String
            }
        ],
        categoryBanners: [
            {
                image: String,
                link: String,
                text: String
            }
        ]
    }
);

module.exports = mongoose.model("Homepage", Homepage);
