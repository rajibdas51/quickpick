import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
dotenv.config();
const port = process.env.PORT || 5000;
// connect database
connectDb();
const app = express();

app.use(cors());

// all the routes

app.get('/', (req, res) => {
  res.send('server is running!!');
});
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
