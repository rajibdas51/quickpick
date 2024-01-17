import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './data/products.js';
import connectDb from './config/db.js';
import colors from 'colors';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import users from './data/users.js';

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log('Data Imported Successfully!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    console.log('Data Deleted successfully!'.red.inverse);
  } catch (error) {
    console.log(`${error}`.red.inverse);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
