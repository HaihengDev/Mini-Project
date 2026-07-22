import './style/input-form.css';

export default function InputForm({ inputElements, formId, onSubmit }) {
  return (
    <form className="form-wrapper" id={formId} onSubmit={onSubmit}>
      {inputElements.map((input) => (
        <div className="form-group" key={input.id}>
          <label className="form-label" htmlFor={input.id}>
            {input.label}
          </label>

          {input.type === 'academic_year' ? (
            <div className="academic-year-group">
              <input
                className="form-input"
                type="number"
                id="academic_year_start"
                name="academic_year_start"
                placeholder="2025"
                required
              />

              <span>-</span>

              <input
                className="form-input"
                type="number"
                id="academic_year_end"
                name="academic_year_end"
                placeholder="2026"
                required
              />
            </div>
          ) : input.type === 'radio' ? (
            <div className="radio-group">
              {input.options.map((option) => (
                <label className="radio-label" key={option.value}>
                  <input
                    type="radio"
                    name={input.id}
                    value={option.value}
                    required
                  />
                  {option.label}
                </label>
              ))}
            </div>
          ) : input.type === 'date' ? (
            <input
              className="form-input"
              type="date"
              id={input.id}
              name={input.id}
              required
            />
          ) : (
            <input
              className="form-input"
              type={input.type}
              id={input.id}
              name={input.id}
              placeholder={input.placeholder}
              required
            />
          )}
        </div>
      ))}
    </form>
  );
}
