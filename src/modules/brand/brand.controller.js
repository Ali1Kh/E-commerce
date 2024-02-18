import { Brand } from "../../../DB/models/brand.model.js";
import { Category } from "../../../DB/models/category.model.js";
import { SubCategory } from "../../../DB/models/subCategory.model.js";
import cloudinary from "../../utils/cloudinary.js";
import slugify from "slugify";

export const createBrand = async (req, res, next) => {
  let isCategory = await Category.findById(req.body.category);
  if (!isCategory) return next(new Error("Category Not Found"));

  let isSubCategory = await SubCategory.findById(req.body.subCategory);
  if (!isSubCategory) return next(new Error("SubCategory Not Found"));

  let brandExits = await Brand.findOne({ name: req.body.name });
  if (brandExits) return next(new Error("Brand Already Exits"));
  if (!req.file) return next(new Error("Brand Image is Required"));
  let { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `ecommerce/brands` }
  );
  await Brand.create({
    ...req.body,
    slug: slugify(req.body.name),
    image: { secure_url, public_id },
  });
  return res.json({ success: true, message: "Brand Created Successfully" });
};

export const updateBrand = async (req, res, next) => {
  let isBrand = await Brand.findById(req.params.id);
  if (!isBrand) return next(new Error("Brand Not Found"));

  if (isBrand.addedBy.toString() != req.user._id)
    return next(new Error("You Cannot Update Brand Not Added By You"));

  if (req.body.name) {
    if (req.body.name == isBrand.name)
      return next(new Error("Enter Diffrent Brand Name"));
    let brandNameExits = await Brand.findOne({
      name: req.body.name,
    });
    if (brandNameExits) return next(new Error("Brand Already Exits"));
    isBrand.name = req.body.name;
    isBrand.slug = slugify(req.body.name);
  }

  if (req.file) {
    let { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        public_id: isBrand.image.public_id,
      }
    );
    isBrand.image.secure_url = secure_url;
    isBrand.image.public_id = public_id;
  }

  await isBrand.save();
  return res.json({
    success: true,
    message: "Brand Updated Successfully",
  });
};

export const deleteBrand = async (req, res, next) => {
  let isBrand = await Brand.findById(req.params.id);
  if (!isBrand) return next(new Error("Brand Not Found"));

  if (isBrand.addedBy.toString() != req.user._id)
    return next(new Error("You Cannot Update Brand Not Added By You"));

  await isBrand.deleteOne();
  await cloudinary.uploader.destroy(isBrand.image.public_id);

  return res.json({
    success: true,
    message: "Brand Deleted Successfully",
  });
};

export const getBrands = async (req, res, next) => {
  let brands = await Brand.find();
  return res.json({ success: true, brands });
};
