import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
import connectDb from './config/db.js';
import cors from 'cors';
dotenv.config();
const port = process.env.PORT || 5000;
// connect database
connectDb();
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('server is running!!');
});
// Get api to get all the products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get api to get a single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === Number(req.params.id));
  res.json(product);
});

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
