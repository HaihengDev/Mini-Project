import Card from '../components/Card.jsx';

export default function CardLayout({ products, handleAddToCart }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, index) => (
        <Card
          key={p._id}
          _id={p._id}
          index={index}
          name={p.name}
          stock={p.stock}
          price={p.price}
          imgUrl={p.image}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
