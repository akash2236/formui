import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

function InputField({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  icon: Icon,
  helperText
}) {
  // Determine validation class wrapper
  const getFieldClass = () => {
    if (!touched) return 'form-group';
    return error ? 'form-group invalid' : 'form-group valid';
  };

  return (
    <div className={getFieldClass()}>
      <label htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        {Icon && <Icon className="input-icon" />}
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        {touched && (
          <div className="status-icon-box">
            {error ? (
              <AlertCircle className="status-error-icon" />
            ) : (
              <Check className="status-check-icon" />
            )}
          </div>
        )}
      </div>
      {touched && error ? (
        <span className="error-message">{error}</span>
      ) : (
        helperText && <small className="helper-text">{helperText}</small>
      )}
    </div>
  );
}

export default InputField;
