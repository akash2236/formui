import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

function SuccessModal({
  isOpen,
  submittedData,
  onClose
}) {
  if (!isOpen || !submittedData) return null;

  return (
    <div className="modal-overlay active">
      <div className="modal-card">
        <div className="success-ring animate-ring">
          <Check className="check-mark animate-check" />
        </div>
        <h2>Message Dispatched!</h2>
        <p>Your glassmorphic contact form successfully validated and sent the transaction payload.</p>
        
        <div className="modal-details">
          <div className="detail-row">
            <span className="detail-label">Full Name:</span>
            <span className="detail-val">{submittedData.fullname}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email Address:</span>
            <span className="detail-val">{submittedData.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Indian Phone:</span>
            <span className="detail-val">{submittedData.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Subject:</span>
            <span className="detail-val">{submittedData.subject}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Priority:</span>
            <span className="detail-val priority-tag">{submittedData.priority}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Newsletter Subscription:</span>
            <span className="detail-val">{submittedData.newsletter ? 'Subscribed' : 'No'}</span>
          </div>
        </div>
        
        <button className="modal-close-btn" onClick={onClose}>
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
