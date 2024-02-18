import { Category } from "../../../DB/models/category.model.js";
import { SubCategory } from "../../../DB/models/subCategory.model.js";
import cloudinary from "../../utils/cloudinary.js";
import slugify from "slugify";

export const createSubCategory = async (req, res, next) => {
  let isCategory = await Category.findById(req.body.category);
  if (!isCategory) return next(new Error("Category Not Found"));

  let subCategoryExits = await SubCategory.findOne({ name: req.body.name });
  if (subCategoryExits) return next(new Error("SubCategory Already Exits"));
  if (!req.file) return next(new Error("SubCategory Image is Required"));
  let { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `ecommerce/SubCategories` }
  );
  await SubCategory.create({
    ...req.body,
    slug: slugify(req.body.name),
    image: { secure_url, public_id },
  });
  return res.json({
    success: true,
    message: "SubCategory Created Successfully",
  });
};

export const updateSubCategory = async (req, res, next) => {
  let isSubCategory = await SubCategory.findById(req.params.id);
  if (!isSubCategory) return next(new Error("SubCategory Not Found"));

  if (isSubCategory.addedBy.toString() != req.user._id)
    return next(new Error("You Cannot Update SubCategory Not Added By You"));

  if (req.body.name) {
    if (req.body.name == isSubCategory.name)
      return next(new Error("Enter Diffrent SubCategory Name"));
    let subCategoryNameExits = await SubCategory.findOne({
      name: req.body.name,
    });
    if (subCategoryNameExits)
      return next(new Error("SubCategory Already Exits"));
    isSubCategory.name = req.body.name;
    isSubCategory.slug = slugify(req.body.name);
  }

  if (req.file) {
    let { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        public_id: isSubCategory.image.public_id,
      }
    );
    isSubCategory.image.secure_url = secure_url;
    isSubCategory.image.public_id = public_id;
  }

  await isSubCategory.save();
  return res.json({
    success: true,
    message: "SubCategory Updated Successfully",
  });
};

export const deleteSubCategory = async (req, res, next) => {
  let isSubCategory = await SubCategory.findById(req.params.id);
  if (!isSubCategory) return next(new Error("SubCategory Not Found"));

  if (isSubCategory.addedBy.toString() != req.user._id)
    return next(new Error("You Cannot Update SubCategory Not Added By You"));

  await isSubCategory.deleteOne();
  await cloudinary.uploader.destroy(isSubCategory.image.public_id);

  return res.json({
    success: true,
    message: "SubCategory Deleted Successfully",
  });
};

export const getSubCategories = async (req, res, next) => {
  let subCategories = await SubCategory.find();
  return res.json({ success: true, subCategories });
};
