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
    const createdReview = await ProductReview.findOne({ _id: review._id }).populate('customer', 'fName lName');

    return createdReview;

}

const getReviewsByProductId = async (productId) => {
    const reviews = await ProductReview.find({ product: productId }).populate('customer', 'fName lName')
    return reviews
}

const updateReview = async (reviewDto) => {

}

const deleteReview = async (reviewId) => {
    const result = await ProductReview.deleteOne({ _id: reviewId });

    return result.deletedCount && result.deletedCount === 1;

}

const upVoteReview = async (reviewId) => {
    const review = await ProductReview.findOne({ _id: reviewId });
    review.upVotes = review.upVotes + 1;
    await review.save();
    return true;
}

const downVoteReview = async (reviewId) => {
    const review = await ProductReview.findOne({ _id: reviewId });
    review.downVotes = review.downVotes + 1;
    await review.save();
    return true;
}

module.exports = {
    createReview,
    getReviewsByProductId,
    updateReview,
    deleteReview,
    upVoteReview,
    downVoteReview
}