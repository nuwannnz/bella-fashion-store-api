const { HTTP403Error } = require('../../util/httpErrors')
const reviewService = require('../../services/review.service');

const createReview = async (req, res, next) => {
    const { reviewDto } = req.body;
    try {

        if (!reviewDto.productId || !reviewDto.rating || !reviewDto.comment) {
            throw new HTTP403Error('Missing fields');
        }

        const customerInfo = req.decoded;

        // upload images if there are any

        const result = await reviewService.createReview({ ...reviewDto, customerId: customerInfo.id });

        return res.json(result);

    } catch (error) {
        next(error);
    }
}

const updateReview = async (req, res, next) => {
    const reviewId = req.params.reviewId
    const { reviewDto } = req.body;
    try {

        if (!reviewId || !reviewDto.rating || !reviewDto.comment) {
            throw new HTTP403Error('Missing fields');
        }


        // upload images if there are any

        const result = await reviewService.updateReview({ ...reviewDto, reviewId: reviewId });

        return res.json(result);

    } catch (error) {
        next(error);
    }
}


const getReviewsOfProduct = async (req, res, next) => {
    const productId = req.params.productId;
    try {
        if (!productId) {
            throw new HTTP403Error('Missing product id');
        }

        const result = await reviewService.getReviewsByProductId(productId);

        return res.json(result);

    } catch (error) {
        next(error);
    }
}

const deleteReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    try {
        if (!reviewId) {
            throw new HTTP403Error('Missing review id');
        }

        const result = await reviewService.deleteReview(reviewId);

        return res.json(result);

    } catch (error) {
        next(error);
    }
}

const upVoteReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    try {
        if (!reviewId) {
            throw new HTTP403Error('Missing review id');
        }

        const result = await reviewService.upVoteReview(reviewId);

        return res.json({ success: result });

    } catch (error) {
        next(error);
    }
}

const downVoteReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    try {
        if (!reviewId) {
            throw new HTTP403Error('Missing review id');
        }

        const result = await reviewService.downVoteReview(reviewId);

        return res.json({ success: result });

    } catch (error) {
        next(error);
    }
}


module.exports = {
    createReview,
    getReviewsOfProduct,
    updateReview,
    deleteReview,
    upVoteReview,
    downVoteReview
}