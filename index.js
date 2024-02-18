import dotenv from "dotenv";
import express from "express";
import { dbConect } from "./DB/connection.js";
import userRouter from "./src/modules/user/user.router.js";
import categoryRouter from "./src/modules/category/category.router.js";
import subCategoryRouter from "./src/modules/subcategory/subcategory.router.js";
import brandsRouter from "./src/modules/brand/brand.router.js";


dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
await dbConect();

app.use("/auth",userRouter);
app.use("/category",categoryRouter);
app.use("/subCategory",subCategoryRouter);
app.use("/brands",brandsRouter);


app.all("*", (req, res, next) => res.send("End Point Not Found"));

app.use((error, req, res, next) => {
  return res.json({
    success: false,
    errors: { error: error.message, stack: error.stack },
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
