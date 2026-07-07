export default function FormInput({
  id,
  label,
  htmlFor,
  type,
  placeholder,
  selection,
}) {
  return (
    <section className="input-container">
      <label htmlFor={htmlFor}>{label}</label>

      {type === 'radio' ? (
        <div className="radio-group">
          {selection.map((item) => (
            <label key={item.value}>
              <input type="radio" name={id} value={item.value} />
              {item.label}
            </label>
          ))}
        </div>
      ) : (
        <input id={id} type={type} placeholder={placeholder} />
      )}
    </section>
  );
}
