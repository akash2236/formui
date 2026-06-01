import React from 'react';
import { Lock, BadgePercent } from 'lucide-react';

function OrderSummary({
  cartItems,
  subtotal,
  discountVal,
  shippingFee,
  grandTotal,
  isFormValid,
  onSubmit
}) {
  return (
    <div className="order-summary-sticky">
      <aside className="summary-card">
        <h2 className="summary-title">Order Summary</h2>

        {/* Cart items thumbnail list */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-thumb">{item.thumb}</div>
              <div className="item-info">
                <h4 className="item-name">{item.name}</h4>
                <span className="item-qty">Qty: {item.qty}</span>
              </div>
              <span className="item-price">${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Coupon Code badge */}
        <div className="promo-badge">
          <span className="badge-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BadgePercent size={16} /> Promo Coupon Applied
          </span>
          <span className="promo-code">GLASSY15 (-15%)</span>
        </div>

        {/* Financial calculations matrices */}
        <div className="price-matrix">
          <div className="price-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="price-row discount-row">
            <span>Glassy Discount</span>
            <span>-${discountVal.toFixed(2)}</span>
          </div>
          <div className="price-row">
            <span>Shipping Fee</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="price-row grand-total">
            <span>Total Amount</span>
            <span className="total-amt">${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* CTA secure checkout trigger */}
        <button
          type="button"
          className="checkout-btn"
          disabled={!isFormValid}
          onClick={onSubmit}
        >
          <span>Place Secure Order</span>
          <Lock size={15} />
        </button>
      </aside>
    </div>
  );
}

export default OrderSummary;
