export default function CartLayout({ cart }) {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        cart.map((el, index) => (
          <div key={index} className="border p-3 mb-2">
            <p>Name: {el.name}</p>
            <p>Price: {el.price}</p>
          </div>
        ))
      )}
    </section>
  );
}
