const { Router } = require("express");
const reviewController = require("../controllers/review.controller");
const { verifyJWTToken } = require("../middleware/auth");

// init express router
const route = Router();

module.exports = (app) => {
    app.use("/reviews", route);

    // create review
    route.post("/", verifyJWTToken, reviewController.createReview);

    // get reviews of product
    route.get("/:productId", reviewController.getReviewsOfProduct);


    // update review
    route.patch("/:reviewId", verifyJWTToken, reviewController.updateReview);

    // upvote review
    route.patch("/:reviewId/upvote", verifyJWTToken, reviewController.upVoteReview);

    // downvote review
    route.patch("/:reviewId/downvote", verifyJWTToken, reviewController.downVoteReview);

    // delete review
    route.delete("/:reviewId", verifyJWTToken, reviewController.deleteReview);



};
