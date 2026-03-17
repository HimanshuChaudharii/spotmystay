const Review = require("../models/Review");

exports.addReview = async (req, res) => {
    const review = new Review({
        hostel: req.params.hostelId,
        user: req.user._id,
        comment: req.body.comment,
        rating: req.body.rating
    });

    await review.save();
    res.json({ message: "Review added" });
};

exports.getReviews = async (req, res) => {
    const reviews = await Review.find({
        hostel: req.params.hostelId
    }).populate("user", "name");

    res.json(reviews);
};
