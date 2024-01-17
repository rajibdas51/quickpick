import express from 'express';
import asyncHandler from '../middleware/asyncMiddleware';
const router = express.Router();

// Get api to get all the products
router.get(
  '/',
  asyncHandler((req, res) => {
    res.json(products);
  })
);

// Get api to get a single product
router.get(
  '/:id',
  asyncHandler((req, res) => {
    const product = products.find((p) => p._id === Number(req.params.id));
    res.json(product);
  })
);

export default router;
