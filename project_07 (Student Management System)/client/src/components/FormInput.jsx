export default function FormInput({
  id,
  label,
  htmlFor,
  type,
  placeholder,
  selection,
  value,
  onChange,
}) {
  return (
    <section className="input-container">
      <label htmlFor={htmlFor}>{label}</label>

      {type === 'radio' ? (
        <div className="radio-group">
          {selection.map((item) => (
            <label key={item.value}>
              <input
                type="radio"
                name={id}
                value={item.value}
                checked={value === item.value}
                onChange={onChange}
              />
              {item.label}
            </label>
          ))}
        </div>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </section>
  );
}
