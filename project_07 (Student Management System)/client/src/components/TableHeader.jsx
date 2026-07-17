export default function TableHeader({ headerRows }) {
  return (
    <tr>
      {headerRows.map((row) => (
        <th>{row}</th>
      ))}
    </tr>
  );
}
