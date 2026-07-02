export default function FormInput({ id, label, htmlFor, type, placeholder }) {
  return (
    <section className="input-container">
      <label htmlFor={htmlFor}>{label}</label>
      <input type={type} placeholder={placeholder} id={id} />
    </section>
  );
}
