import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();
const port = process.env.PORT || 5000;
// connect database
connectDb();
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
// all the routes

app.get('/', (req, res) => {
  res.send('server is running!!');
});
// product routes
app.use('/api/products', productRoutes);
// user routes
app.use('/api/users', userRoutes);
// order routes
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
