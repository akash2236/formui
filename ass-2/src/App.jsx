import React from 'react';
import { Lock } from 'lucide-react';

// Custom Controller Hook Import
import useCheckoutForm from './hooks/useCheckoutForm';

// Reusable UI Components Imports
import GlowBackground from './components/GlowBackground';
import AddressSection from './components/AddressSection';
import PaymentSection from './components/PaymentSection';
import OrderSummary from './components/OrderSummary';
import ConfirmationModal from './components/ConfirmationModal';

function App() {
  // Bind form controllers directly from custom React hook
  const {
    formData,
    touched,
    errors,
    isFormValid,
    showModal,
    orderId,
    finalTotal,
    subtotal,
    discountVal,
    shippingFee,
    grandTotal,
    CART_ITEMS,
    handleInputChange,
    handleBlur,
    handleCardNumberChange,
    handleCardExpiryChange,
    handleCardCVVChange,
    handleSubmit,
    handleCloseModal,
    getSectionClass,
    setFormData
  } = useCheckoutForm();

  return (
    <>
      <GlowBackground />

      <div className="app-container">
        
        {/* Header Block */}
        <header className="checkout-header">
          <div className="logo-badge">
            <Lock />
          </div>
          <h1>Secure E-Commerce Checkout</h1>
          <p className="subtitle">Assignment 2 • Decoupled Stepper Architecture</p>
        </header>

        {/* E-Commerce Grid */}
        <div className="checkout-grid">
          
          {/* Left Column: Form Steppers */}
          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            
            {/* Step 1: Shipping Address */}
            <AddressSection
              title="Shipping Address Details"
              stepNumber={1}
              prefix="shipping"
              formData={formData}
              onChange={handleInputChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              getSectionClass={getSectionClass}
              checkbox={
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="useSameForBilling"
                    name="useSameForBilling"
                    checked={formData.useSameForBilling}
                    onChange={handleInputChange}
                  />
                  <span className="custom-checkbox"></span>
                  <span>My Billing Address is the same as Shipping</span>
                </label>
              }
            />

            {/* Step 2: Billing Address (Conditionally Rendered) */}
            {!formData.useSameForBilling && (
              <AddressSection
                title="Billing Address Details"
                stepNumber={2}
                prefix="billing"
                formData={formData}
                onChange={handleInputChange}
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                getSectionClass={getSectionClass}
              />
            )}

            {/* Step 3: Payment Method selection */}
            <PaymentSection
              stepNumber={formData.useSameForBilling ? 2 : 3}
              formData={formData}
              onChange={handleInputChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              onCardNumberChange={handleCardNumberChange}
              onCardExpiryChange={handleCardExpiryChange}
              onCardCVVChange={handleCardCVVChange}
              setFormData={setFormData}
              getSectionClass={getSectionClass}
            />

          </form>

          {/* Right Column: Sticky Order Summary */}
          <OrderSummary
            cartItems={CART_ITEMS}
            subtotal={subtotal}
            discountVal={discountVal}
            shippingFee={shippingFee}
            grandTotal={grandTotal}
            isFormValid={isFormValid}
            onSubmit={handleSubmit}
          />

        </div>

      </div>

      <ConfirmationModal
        isOpen={showModal}
        orderId={orderId}
        finalTotal={finalTotal}
        customerName={formData.shippingName}
        paymentMethod={formData.paymentMethod}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default App;
