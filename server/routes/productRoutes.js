import express from 'express';
import asyncHandler from '../middleware/asyncMiddleware.js';
import Product from '../models/productModel.js';
const router = express.Router();

// Get api to get all the products
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// Get api to get a single product
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found!!' });
    }
  })
);

export default router;
