import { useNavigate } from 'react-router-dom';
import productImg from '../assets/product.png';

export default function Card({ index, name, stock, price, onAddToCart, _id }) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const product = {
      name,
      stock,
      price,
    };
    onAddToCart(product);
  };

  const handleLearnMore = () => {
    navigate(`/${_id}`);
  };

  return (
    <figure
      className={`relative w-full max-w-xs overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${index % 2 === 0 ? 'animate-fade-up' : 'animate-fade-down'}`}
    >
      <div className="aspect-square w-full bg-slate-100 p-4">
        <img
          src={productImg}
          alt={name}
          className="h-full w-full object-contain"
        />
      </div>

      <figcaption className="space-y-3 p-4">
        <h2 className="line-clamp-2 min-h-12 text-lg font-semibold text-slate-800 text-center">
          {name}
        </h2>

        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
          <p className="font-medium text-slate-600">Stock</p>
          <p className="font-semibold text-slate-900">{stock}</p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2 text-sm">
          <p className="font-medium text-blue-700">Price</p>
          <p className="text-base font-bold text-blue-900">${price}</p>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <button
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 cursor-pointer transition hover:bg-slate-50 active:scale-[0.98"
            onClick={handleLearnMore}
          >
            Learn More
          </button>
          <button
            className="flex-1 rounded-lg bg-orange-500 px-3 py-2 text-sm font-bold text-white shadow-sm cursor-pointer transition hover:bg-orange-600 active:scale-[0.98] disable:cursor-not-allowed disable:bg-slate-300"
            disabled={stock <= 0}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </figcaption>
      <span className="absolute right-2 top-2 rounded bg-red-600 px-2 py-1 text-xs text-white">
        {stock <= 0 ? 'Out of stock!' : 'Available on stock'}
      </span>
    </figure>
  );
}
