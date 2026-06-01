import React from 'react';
import { ChevronDown } from 'lucide-react';

function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  icon: Icon,
  options
}) {
  const getFieldClass = () => {
    if (!touched) return 'form-group';
    return error ? 'form-group invalid' : 'form-group valid';
  };

  return (
    <div className={getFieldClass()}>
      <label htmlFor={id}>{label}</label>
      <div className="select-wrapper">
        {Icon && <Icon className="select-icon" style={{ width: '16px', height: '16px' }} />}
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required
        >
          <option value="" disabled>Select priority level...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="select-chevron" />
      </div>
      {touched && error && (
        <span className="error-message">{error}</span>
      )}
    </div>
  );
}

export default SelectField;
