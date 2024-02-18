import { Review } from "../../../DB/models/reviews.model.js";

export const addReview = async (req, res, next) => {
  await Review.create({
    ...req.body,user:req.user._id
  });
  return res.json({ success: true, message: "Review Added Successfully" });
};

export const updateReview = async (req, res, next) => {
  let isReview = await Review.findById(req.params.id);
  if (!isReview) return next(new Error("Review Not Found"));

  if (isReview.user.toString() != req.user._id)
    return next(new Error("You Cannot Update Review Not Added By You"));

  if (req.body.comment) {
    if (req.body.comment == isReview.comment)
      return next(new Error("Enter Diffrent Comment"));
 
    isReview.comment = req.body.comment;
  }
  if (req.body.rate) {
    if (req.body.rate == isReview.rate)
      return next(new Error("Enter Diffrent rate"));
 
    isReview.rate = req.body.rate;
  }

  
  await isReview.save();
  return res.json({
    success: true,
    message: "Review Updated Successfully",
  });
};


