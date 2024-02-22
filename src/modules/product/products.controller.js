import { Brand } from "../../../DB/models/brand.model.js";
import { Category } from "../../../DB/models/category.model.js";
import { Product } from "../../../DB/models/product.model.js";
import { SubCategory } from "../../../DB/models/subCategory.model.js";
import { nanoid } from "nanoid";
import slugify from "slugify";
import cloudinary from "../../utils/cloudinary.js";
export const createProduct = async (req, res, next) => {
  let isCategory = await Category.findById(req.body.category);
  if (!isCategory) return next(new Error("Category Not Found"));

  let isSubCategory = await SubCategory.findById(req.body.subCategory);
  if (!isSubCategory) return next(new Error("SubCategory Not Found"));

  let isBrand = await Brand.findById(req.body.brand);
  if (!isBrand) return next(new Error("Brand Not Found"));

  if (!req.files) return next(new Error("Images Are Required"));

  let cloudFolder = nanoid();

  let subImages = [];
  for (const file of req.files.subImages) {
    let { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      { folder: `ecommerce/products/${cloudFolder}/subImages` }
    );
    subImages.push({ secure_url, public_id });
  }

  let { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.default[0].path,
    {
      folder: `ecommerce/products/${cloudFolder}/defaultImage`,
    }
  );

  await Product.create({
    ...req.body,
    slug: slugify(req.body.name),
    cloudFolder,
    image: subImages,
    defaultImage: { secure_url, public_id },
    addedBy: req.user._id,
  });
  return res.json({ success: true, message: "Product Created Successfully" });
};

export const getProducts = async (req, res, next) => {
  let prodcuts = await Product.find({ ...req.query })
    .limit(req.query.limit)
    .sort(req.query.sort).paginate(req.query.page).search(req.query.search);
  return res.json({
    success: true,
    count:prodcuts.length,
    prodcuts,
  });
};

export const deleteproduct = async (req, res, next) => {
  let isProduct = await Product.findById(req.params.id);
  if (!isProduct) return next(new Error("Product Not Found"));

  if (isProduct.addedBy.toString() != req.user._id)
    return next(new Error("You Cannot Update product Not Added By You"));

  await isProduct.deleteOne();
  return res.json({
    success: true,
    message: "Product Deleted Successfully",
  });
};
