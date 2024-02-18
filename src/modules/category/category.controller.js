import { Category } from "../../../DB/models/category.model.js";
import cloudinary from "../../utils/cloudinary.js";
import slugify from "slugify";

export const createCategory = async (req, res, next) => {
  let categoryExits = await Category.findOne({ name: req.body.name });
  if (categoryExits) return next(new Error("Category Already Exits"));
  if (!req.file) return next(new Error("Category Image is Required"));
  let { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `ecommerce/categories` }
  );
  await Category.create({
    ...req.body,
    slug: slugify(req.body.name),
    image: { secure_url, public_id },
  });
  return res.json({ success: true, message: "Category Created Successfully" });
};

export const updateCategory = async (req, res, next) => {
  let isCategory = await Category.findById(req.params.id);
  if (!isCategory) return next(new Error("Category Not Found"));

  if (isCategory.addedBy.toString() != req.user._id)
    return next(new Error("You Cannot Update Category Not Added By You"));

  if (req.body.name) {
    if (req.body.name == isCategory.name)
      return next(new Error("Enter Diffrent Category Name"));
    let categoryNameExits = await Category.findOne({ name: req.body.name });
    if (categoryNameExits) return next(new Error("Category Already Exits"));

    isCategory.name = req.body.name;
    isCategory.slug = slugify(req.body.name);
  }

  if (req.file) {
    let { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        public_id: isCategory.image.public_id,
      }
    );
    isCategory.image.secure_url = secure_url;
    isCategory.image.public_id = public_id;
  }

  await isCategory.save();
  return res.json({ success: true, message: "Category Updated Successfully" });
};

export const deleteCategory = async (req, res, next) => {
  let isCategory = await Category.findById(req.params.id);
  if (!isCategory) return next(new Error("Category Not Found"));

  if (isCategory.addedBy.toString() != req.user._id)
    return next(new Error("You Cannot Update Category Not Added By You"));

  await isCategory.deleteOne();
  await cloudinary.uploader.destroy(isCategory.image.public_id);

  return res.json({ success: true, message: "Category Deleted Successfully" });
};

export const getCategories = async (req, res, next) => {
  let categories = await Category.find().populate("subcategories");
  return res.json({ success: true, categories });
};
