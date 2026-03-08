import { useParams, useNavigate } from 'react-router-dom';
import { Hook } from '../api/Hook.js';

export default function LearnMore() {
  const { id } = useParams();
  const products = Hook();
  const product = products.find((p) => p._id === id);
  const navigate = useNavigate();

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-red-500">Product not found!</p>
      </div>
    );

  return (
    <section className="max-w-4xl mx-auto p-6 md:p-10">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-4">
          <img
            className="object-contain w-full h-80 md:h-full rounded-lg"
            src={`http://localhost:8000/uploads/${product.image}`}
            alt={product.name}
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-4 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {product.name}
            </h1>
            <p className="text-gray-500 mb-2">
              <span className="font-semibold">ID:</span> {product._id}
            </p>
            <p className="text-gray-500 mb-2">
              <span className="font-semibold">Price:</span> ${product.price}
            </p>
            <p className="text-gray-500 mb-2">
              <span className="font-semibold">Stock:</span> {product.stock}
            </p>
          </div>

          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            onClick={() => navigate(-1)}
          >
            &larr; Back to Home page
          </button>
        </div>
      </div>
    </section>
  );
}
