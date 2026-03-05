const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productRoutes = require('../routes/productRoutes.js');
const orderRotues = require('../routes/orderRoutes.js');
require('dotenv').config();

const app = express();
// app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRotues);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Database is connected successfully!'))
  .catch((err) => console.log(err));

module.exports = app;
