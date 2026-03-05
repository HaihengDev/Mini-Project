const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require('../controllers/productController.js');

const router = express.Router();

router.route('/').post(createProduct).get(getAllProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(deleteProduct)
  .put(updateProduct);

module.exports = router;
