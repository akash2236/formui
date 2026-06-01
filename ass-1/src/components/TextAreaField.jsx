import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

function TextAreaField({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  icon: Icon,
  charCount,
  maxChars = 500
}) {
  const getFieldClass = () => {
    if (!touched) return 'form-group';
    return error ? 'form-group invalid' : 'form-group valid';
  };

  const isLimitInvalid = charCount < 20 || charCount > maxChars;

  return (
    <div className={getFieldClass()}>
      <label htmlFor={id}>
        {label}
        <span 
          className="counter" 
          style={{ color: isLimitInvalid && touched ? 'var(--color-invalid)' : 'var(--color-text-muted)' }}
        >
          Chars: {charCount}/{maxChars}
        </span>
      </label>
      <div className="textarea-wrapper">
        {Icon && <Icon className="textarea-icon" />}
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        {touched && (
          <div className="status-icon-box" style={{ top: '15px', transform: 'none' }}>
            {error ? (
              <AlertCircle className="status-error-icon" />
            ) : (
              <Check className="status-check-icon" />
            )}
          </div>
        )}
      </div>
      {touched && error && (
        <span className="error-message">{error}</span>
      )}
    </div>
  );
}

export default TextAreaField;
