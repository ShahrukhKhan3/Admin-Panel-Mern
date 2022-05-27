const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  status: Boolean
});

const Product = mongoose.model("Product", schema);

module.exports = Product;


/*
let products = [
  {
    title: "LED TV",
    price: 40000,
    image: 'samsung-40-inch-black-led.jpg',
    status: true
  },
{
    title: "LED TV",
    price: 40000,
    image: 'samsung-40-inch-black-led.jpg',
    status: true
  },
  {
    title: "LED TV",
    price: 40000,
    image: 'samsung-40-inch-black-led.jpg',
    status: true
  },
  {
    title: "LED TV",
    price: 40000,
    image: 'samsung-40-inch-black-led.jpg',
    status: true
  }
]
*/