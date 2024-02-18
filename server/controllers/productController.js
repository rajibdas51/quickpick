import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

//@desc get all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  // const pageSize = 12;
  //const page = Number(req.query.pageNum) || 1;

  //const catName = req.query.catName;
  /* 
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}; // search product using keywords
*/
  //let products = [];

  // const count = await Product.countDocuments({});
  const products = await Product.find({});
  res.status(200).json(products);
});

//@desc fetch single product by id
//@route GET /api/product/:id
//@access Public
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found!!');
  }
});

//@desc create Product
//@route POST /api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });
  const createdProduct = product.save();
  res.status(201).json(createdProduct);
});

//@desc update a  products
//@route PUT /api/products
//@access Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Resource not Found!!');
  }
});

//@desc Delete a  products
//@route DELETE /api/products
//@access Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product Deleted!!' });
  } else {
    res.status(404);
    throw new Error('Resource not Found!!');
  }
});
//@desc Create a new review
//@route POST  /api/products/:id/reviews
//@access Private/
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed!!');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(200).json({ message: 'Review Added!!' });
  } else {
    res.status(404);
    throw new Error('Resource not found!!');
  }
});

//@des get Top rated products
//@route GET /api/products/top
//access Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});
//@des get All categories
//@route GET /api/products/categories
//access Public

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Product.find({});
  res.status(200).json(categories);
});

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getAllCategories,
};
