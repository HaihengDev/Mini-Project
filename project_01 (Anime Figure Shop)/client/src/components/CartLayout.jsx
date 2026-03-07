export default function CartLayout({ cart }) {
  return (
    <section className="w-full px-8 py-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-slate-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4 w-full">
          {cart.map((el, index) => (
            <div
              key={index}
              className="flex items-center gap-6 w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                <img
                  src={`http://localhost:8000/uploads/${el.imgUrl}`}
                  alt={el.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-slate-800">
                  {el.name}
                </h2>
                <p className="text-sm text-slate-500">Available in stock</p>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-xl font-bold text-blue-600">${el.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
