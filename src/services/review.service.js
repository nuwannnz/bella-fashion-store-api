const ProductReview = require('../models/product-review.model');

const createReview = async (reviewDto) => {
    const review = new ProductReview();

    review.customer = reviewDto.customerId;
    review.product = reviewDto.productId;
    review.rating = reviewDto.rating;
    review.comment = reviewDto.comment;

    if (reviewDto.imageUrls) {
        review.images = reviewDto.imageUrls;
    }

    await review.save();
    let createdReview = review.populate('customer')

    return createdReview;

}

const getReviewsByProductId = async (productId) => {
    const reviews = await ProductReview.find({ product: productId }).populate('customer', 'fName lName')
    return reviews
}

const updateReview = async (reviewDto) => {

}

const deleteReview = async (reviewId) => {

}

module.exports = {
    createReview,
    getReviewsByProductId,
    updateReview,
    deleteReview
}