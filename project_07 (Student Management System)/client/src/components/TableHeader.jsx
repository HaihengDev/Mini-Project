export default function TableHeader({ tableHeader, onAdd }) {
  return (
    <thead>
      <tr>
        {tableHeader.map((el, index) => (
          <th key={index}>{el}</th>
        ))}
        <th>
          <button onClick={onAdd}>Add</button>
        </th>
      </tr>
    </thead>
  );
}
