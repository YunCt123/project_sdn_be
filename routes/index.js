var express = require('express');
var router = express.Router();
const Product = require('../models/product');

/* GET home page. */

router.get('/products-view', async function(req, res, next) {
  try {
    const products = await Product.find();
    res.render('product', { products });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
