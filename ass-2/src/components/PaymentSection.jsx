import React from 'react';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';

function PaymentSection({
  stepNumber,
  formData,
  onChange,
  onBlur,
  errors,
  touched,
  onCardNumberChange,
  onCardExpiryChange,
  onCardCVVChange,
  setFormData,
  getSectionClass
}) {
  const getFieldClass = (fieldName) => {
    if (!touched[fieldName]) return 'form-group';
    return errors[fieldName] ? 'form-group invalid' : 'form-group valid';
  };

  const selectPaymentMethod = (method) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  return (
    <section className={getSectionClass(stepNumber)}>
      <h2 className="section-title">
        <span className="step-num">{stepNumber}</span>
        Choose Payment Method
      </h2>

      {/* Selector Cards Grid */}
      <div className="payment-selector">
        <div 
          className={`payment-method-card ${formData.paymentMethod === 'card' ? 'selected' : ''}`}
          onClick={() => selectPaymentMethod('card')}
        >
          <CreditCard />
          <span>Credit Card</span>
        </div>

        <div 
          className={`payment-method-card ${formData.paymentMethod === 'debit' ? 'selected' : ''}`}
          onClick={() => selectPaymentMethod('debit')}
        >
          <CreditCard />
          <span>Debit Card</span>
        </div>

        <div 
          className={`payment-method-card ${formData.paymentMethod === 'wallet' ? 'selected' : ''}`}
          onClick={() => selectPaymentMethod('wallet')}
        >
          <Wallet />
          <span>Wallet</span>
        </div>

        <div 
          className={`payment-method-card ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}
          onClick={() => selectPaymentMethod('upi')}
        >
          <Smartphone />
          <span>UPI ID</span>
        </div>
      </div>

      {/* Conditionally Render Payment Fields */}
      {(formData.paymentMethod === 'card' || formData.paymentMethod === 'debit') && (
        <div className="payment-fields">
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <div className={getFieldClass('cardNumber')}>
              <label htmlFor="cardNumber">Card Number</label>
              <div className="input-wrapper">
                <CreditCard className="input-icon" />
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="4321 8765 0912 3456"
                  value={formData.cardNumber}
                  onChange={onCardNumberChange}
                  onBlur={() => onBlur('cardNumber')}
                />
              </div>
              {touched.cardNumber && errors.cardNumber && (
                <span className="error-message">{errors.cardNumber}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className={getFieldClass('cardExpiry')}>
              <label htmlFor="cardExpiry">Expiration Date</label>
              <div className="input-wrapper">
                <CreditCard className="input-icon" />
                <input
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={onCardExpiryChange}
                  onBlur={() => onBlur('cardExpiry')}
                />
              </div>
              {touched.cardExpiry && errors.cardExpiry && (
                <span className="error-message">{errors.cardExpiry}</span>
              )}
            </div>

            <div className={getFieldClass('cardCVV')}>
              <label htmlFor="cardCVV">CVV Code</label>
              <div className="input-wrapper">
                <CreditCard className="input-icon" />
                <input
                  type="password"
                  id="cardCVV"
                  name="cardCVV"
                  placeholder="***"
                  value={formData.cardCVV}
                  onChange={onCardCVVChange}
                  onBlur={() => onBlur('cardCVV')}
                />
              </div>
              {touched.cardCVV && errors.cardCVV && (
                <span className="error-message">{errors.cardCVV}</span>
              )}
            </div>
          </div>
        </div>
      )}

      {formData.paymentMethod === 'wallet' && (
        <div className="payment-fields">
          <div className={getFieldClass('walletProvider')}>
            <label htmlFor="walletProvider">Select Wallet Provider</label>
            <div className="select-wrapper">
              <Wallet className="input-icon" style={{ zIndex: 2 }} />
              <select
                id="walletProvider"
                name="walletProvider"
                value={formData.walletProvider}
                onChange={onChange}
                onBlur={() => onBlur('walletProvider')}
              >
                <option value="" disabled>Select provider...</option>
                <option value="paytm">Paytm Wallet</option>
                <option value="phonepe">PhonePe Wallet</option>
                <option value="amazon">Amazon Pay Wallet</option>
              </select>
              <span className="select-chevron">▼</span>
            </div>
            {touched.walletProvider && errors.walletProvider && (
              <span className="error-message">{errors.walletProvider}</span>
            )}
          </div>
        </div>
      )}

      {formData.paymentMethod === 'upi' && (
        <div className="payment-fields">
          <div className={getFieldClass('upiId')}>
            <label htmlFor="upiId">Enter UPI Address</label>
            <div className="input-wrapper">
              <Smartphone className="input-icon" />
              <input
                type="text"
                id="upiId"
                name="upiId"
                placeholder="john@okaxis"
                value={formData.upiId}
                onChange={onChange}
                onBlur={() => onBlur('upiId')}
              />
            </div>
            {touched.upiId && errors.upiId ? (
              <span className="error-message">{errors.upiId}</span>
            ) : (
              <small className="helper-text">Format: username@bankname (e.g. johndoe@paytm)</small>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default PaymentSection;
