import express from 'express';
import {
  getProducts,
  getProductsById,
} from '../controllers/productController.js';
const router = express.Router();

// Get api to get all the products
router.route('/').get(getProducts);

// Get api to get a single product
router.route('/:id').get(getProductsById);
export default router;
