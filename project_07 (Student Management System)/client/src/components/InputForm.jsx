import {useEffect, useState} from 'react';
import './style/input-form.css';

export default function InputForm({ inputElements, formId, onSubmit }) {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if(file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  }

  useEffect(() => {
    return () => {
      if(imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
          ) : input.type === 'select' ? (
            <select
              className="form-input"
              id={input.id}
              name={input.id}
              defaultValue={''}
              required
            >
              <option value="" disabled>
                Select {input.label.replace(':', '')}
              </option>

              {input.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : input.type === 'file' ? (
            <>
              <input
                className="form-input"
                type={"file"}
                id={input.id}
                name={input.id}
                accept="image/*"
                onChange={handleImageChange}
              />

              {imagePreview && (
                <div className={"image-preview"}>
                  <img
                    src={imagePreview}
                    alt="Selected preview"
                    className="preview-image"
                  />
                </div>
              )}
            </>
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
