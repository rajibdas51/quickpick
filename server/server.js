import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
import connectDb from './config/db.js';
dotenv.config();
const port = process.env.PORT || 5000;
// connect database
connectDb();
const app = express();
app.get('/', (req, res) => {
  res.send('server is running!!');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === Number(req.params.id));
  res.json(product);
});

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
