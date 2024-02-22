import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
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
// file upload routes
app.use('/api/upload', uploadRoutes);

// Paypal api endpoint
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); // Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// check for production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static(path.join(__dirname, '/client/build')));
  // any route is not api will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('server is running!!');
  });
}

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
