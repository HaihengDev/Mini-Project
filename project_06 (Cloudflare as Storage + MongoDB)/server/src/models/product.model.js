import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: 'products' },
);

export default mongoose.model('Product', productSchema);
