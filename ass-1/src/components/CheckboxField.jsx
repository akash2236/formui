import React from 'react';

function CheckboxField({
  id,
  name,
  checked,
  onChange,
  error,
  touched,
  label
}) {
  const getCheckboxClass = () => {
    if (!touched) return 'checkbox-group';
    return error ? 'checkbox-group invalid' : 'checkbox-group valid';
  };

  return (
    <div className={getCheckboxClass()}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <span className="custom-checkbox"></span>
        <span className="checkbox-text">{label}</span>
      </label>
      {touched && error && (
        <span className="error-message checkbox-error" style={{ display: 'block', opacity: 1, maxHeight: '20px' }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default CheckboxField;
