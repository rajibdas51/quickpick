import express from 'express';
import {
  getProducts,
  getProductsById,
  createProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

// Get api to get all the products
router.route('/').get(getProducts).post(protect, admin, createProduct);

// Get api to get a single product
router.route('/:id').get(getProductsById);
export default router;
