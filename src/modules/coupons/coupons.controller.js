import { Coupons } from "../../../DB/models/coupons.model.js";
import voucher_codes from "voucher-code-generator";
export const addCoupon = async (req, res, next) => {
  const couponCode = voucher_codes.generate({ length: 5 })[0];
  await Coupons.create({
    couponDiscount: req.body.couponDiscount,
    couponCode,
    expiredAt:new Date(req.body.expiredAt).getTime(),
    addedBy: req.user._id,
  });
  return res.json({ success: true, message: "Coupon Added Successfully" });
};

export const updateCoupon = async (req, res, next) => {
  let isCoupon = await Coupons.findById(req.params.id);
  if (!isCoupon) return next(new Error("Coupon Not Found"));

  if (isCoupon.addedBy.toString() != req.user._id)
    return next(new Error("You Cannot Update Coupon Not Added By You"));

  if (req.body.couponDiscount) {
    isCoupon.couponDiscount = req.body.couponDiscount;
  }
  if (req.body.expiredAt) {
    if (req.body.expiredAt == new Date(req.body.expiredAt).getTime())
      return next(new Error("Enter Diffrent Expired Date"));

    isCoupon.expiredAt = new Date(req.body.expiredAt).getTime();
  }

  await isCoupon.save();
  return res.json({
    success: true,
    message: "Coupon Updated Successfully",
  });
};

export const deleteCoupon = async (req, res, next) => {
  let isCoupon = await Coupons.findById(req.params.id);
  if (!isCoupon) return next(new Error("Coupon Not Found"));

  if (isCoupon.addedBy.toString() != req.user._id)
    return next(new Error("You Cannot Update Coupon Not Added By You"));


  await isCoupon.deleteOne();
  return res.json({
    success: true,
    message: "Coupon Deleted Successfully",
  });
};



