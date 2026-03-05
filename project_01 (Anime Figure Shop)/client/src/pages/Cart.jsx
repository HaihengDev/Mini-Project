import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CartLayout from '../components/CartLayout.jsx';

export default function Cart() {
  const { cart = [], setCart } = useOutletContext();
  const [showCheckout, setShowCheckOut] = useState(false);
  const total = cart.reduce((sum, el) => {
    return sum + Number(el.price);
  }, 0);

  const handleClickCheckOut = () => {
    setShowCheckOut(true);
    setCart([]);
  };

  return (
    <section className="flex flex-col gap-4">
      <CartLayout cart={cart} />

      <div className="flex align-center justify-between">
        <p>Total:</p>
        <p>
          <b>{total}$</b>
        </p>
      </div>
      <button
        className="w-[20%] py-3 bg-orange-500 text-white font-bold rounded-lg cursor-pointer transition duration-300 hover:bg-orange-600"
        onClick={handleClickCheckOut}
      >
        Checkout
      </button>

      {showCheckout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold">Checkout Successfully</h1>

            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600"
              onClick={() => setShowCheckOut(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
