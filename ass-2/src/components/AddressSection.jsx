import React from 'react';
import { MapPin } from 'lucide-react';

function AddressSection({
  title,
  stepNumber,
  prefix, // 'shipping' or 'billing'
  formData,
  onChange,
  onBlur,
  errors,
  touched,
  checkbox,
  getSectionClass
}) {
  // Helper to extract fields based on prefix
  const getVal = (field) => formData[`${prefix}${field}`] || '';
  const getErr = (field) => errors[`${prefix}${field}`] || '';
  const isTouched = (field) => touched[`${prefix}${field}`] || false;

  // Helper to assign input visual error cues
  const getFieldClass = (field) => {
    const fieldKey = `${prefix}${field}`;
    if (!touched[fieldKey]) return 'form-group';
    return errors[fieldKey] ? 'form-group invalid' : 'form-group valid';
  };

  return (
    <section className={getSectionClass(stepNumber)}>
      <h2 className="section-title">
        <span className="step-num">{stepNumber}</span>
        {title}
      </h2>

      {/* Row: Name & Phone */}
      <div className="form-row">
        <div className={getFieldClass('Name')}>
          <label htmlFor={`${prefix}Name`}>Full Name</label>
          <div className="input-wrapper">
            <MapPin className="input-icon" />
            <input
              type="text"
              id={`${prefix}Name`}
              name={`${prefix}Name`}
              placeholder="John Doe"
              value={getVal('Name')}
              onChange={onChange}
              onBlur={() => onBlur(`${prefix}Name`)}
            />
          </div>
          {isTouched('Name') && getErr('Name') && (
            <span className="error-message">{getErr('Name')}</span>
          )}
        </div>

        <div className={getFieldClass('Phone')}>
          <label htmlFor={`${prefix}Phone`}>Phone Number</label>
          <div className="input-wrapper">
            <MapPin className="input-icon" />
            <input
              type="text"
              id={`${prefix}Phone`}
              name={`${prefix}Phone`}
              placeholder="9876543210"
              value={getVal('Phone')}
              onChange={onChange}
              onBlur={() => onBlur(`${prefix}Phone`)}
            />
          </div>
          {isTouched('Phone') && getErr('Phone') && (
            <span className="error-message">{getErr('Phone')}</span>
          )}
        </div>
      </div>

      {/* Row: Email & Pincode */}
      <div className="form-row">
        <div className={getFieldClass('Email')}>
          <label htmlFor={`${prefix}Email`}>Email Address</label>
          <div className="input-wrapper">
            <MapPin className="input-icon" />
            <input
              type="email"
              id={`${prefix}Email`}
              name={`${prefix}Email`}
              placeholder="john@example.com"
              value={getVal('Email')}
              onChange={onChange}
              onBlur={() => onBlur(`${prefix}Email`)}
            />
          </div>
          {isTouched('Email') && getErr('Email') && (
            <span className="error-message">{getErr('Email')}</span>
          )}
        </div>

        <div className={getFieldClass('Pincode')}>
          <label htmlFor={`${prefix}Pincode`}>Pincode</label>
          <div className="input-wrapper">
            <MapPin className="input-icon" />
            <input
              type="text"
              id={`${prefix}Pincode`}
              name={`${prefix}Pincode`}
              placeholder="400001"
              value={getVal('Pincode')}
              onChange={onChange}
              onBlur={() => onBlur(`${prefix}Pincode`)}
            />
          </div>
          {isTouched('Pincode') && getErr('Pincode') && (
            <span className="error-message">{getErr('Pincode')}</span>
          )}
        </div>
      </div>

      {/* Street Address */}
      <div className="form-row">
        <div className={getFieldClass('Address')} style={{ gridColumn: 'span 2' }}>
          <label htmlFor={`${prefix}Address`}>Street Address</label>
          <div className="input-wrapper">
            <MapPin className="input-icon" />
            <input
              type="text"
              id={`${prefix}Address`}
              name={`${prefix}Address`}
              placeholder="Flat / Building / Street Details"
              value={getVal('Address')}
              onChange={onChange}
              onBlur={() => onBlur(`${prefix}Address`)}
            />
          </div>
          {isTouched('Address') && getErr('Address') && (
            <span className="error-message">{getErr('Address')}</span>
          )}
        </div>
      </div>

      {/* City */}
      <div className="form-row">
        <div className={getFieldClass('City')} style={{ gridColumn: 'span 2' }}>
          <label htmlFor={`${prefix}City`}>City</label>
          <div className="input-wrapper">
            <MapPin className="input-icon" />
            <input
              type="text"
              id={`${prefix}City`}
              name={`${prefix}City`}
              placeholder="Mumbai"
              value={getVal('City')}
              onChange={onChange}
              onBlur={() => onBlur(`${prefix}City`)}
            />
          </div>
          {isTouched('City') && getErr('City') && (
            <span className="error-message">{getErr('City')}</span>
          )}
        </div>
      </div>

      {/* Same Address Checkbox (Optional injection for Shipping page) */}
      {checkbox && <div className="checkbox-wrapper">{checkbox}</div>}
    </section>
  );
}

export default AddressSection;
