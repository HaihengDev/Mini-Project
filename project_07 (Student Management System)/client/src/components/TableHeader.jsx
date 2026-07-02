import './style/table.css';

export default function TableHeader({ tableHeader }) {
  return (
    <thead>
      <tr>
        {tableHeader.map((el, index) => (
          <th key={index}>{el}</th>
        ))}
      </tr>
    </thead>
  );
}
