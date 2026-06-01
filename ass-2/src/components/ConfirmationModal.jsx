import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

function ConfirmationModal({
  isOpen,
  orderId,
  finalTotal,
  customerName,
  paymentMethod,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay active">
      <div className="modal-card">
        <div className="success-ring">
          <Check className="check-mark" />
        </div>
        <h2>Order Placed Successfully!</h2>
        <p>Your order has been processed through our secure gateway. We dispatched the JSON payload.</p>
        
        <div className="modal-details">
          <div className="detail-row">
            <span className="detail-label">Order ID:</span>
            <span className="detail-val" style={{ color: 'var(--color-accent)', fontFamily: 'monospace', fontWeight: 'bold' }}>
              {orderId}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Grand Total:</span>
            <span className="detail-val" style={{ color: 'var(--color-valid)', fontWeight: 'bold' }}>
              ${finalTotal}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Deliver To:</span>
            <span className="detail-val">{customerName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Method:</span>
            <span className="detail-val" style={{ textTransform: 'uppercase', fontSize: '11px', background: 'var(--color-primary-glow)', padding: '2px 8px', borderRadius: '8px' }}>
              {paymentMethod}
            </span>
          </div>
        </div>

        <button className="modal-close-btn" onClick={onClose}>
          Continue Shopping <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
