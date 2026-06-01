import { useState, useEffect } from 'react';

// Mock Cart Items
const CART_ITEMS = [
  { id: 1, name: 'Aura Glassmorphic Keyboard', qty: 1, price: 149.99, thumb: '⌨️' },
  { id: 2, name: 'Quantum Glow Desk Pad', qty: 1, price: 29.99, thumb: '🌌' },
  { id: 3, name: 'Nebula Ergonomic Wrist Rest', qty: 1, price: 19.99, thumb: '🧼' }
];

export default function useCheckoutForm() {
  // --- Form Input States ---
  const [formData, setFormData] = useState({
    // Step 1: Shipping
    shippingName: '',
    shippingPhone: '',
    shippingEmail: '',
    shippingAddress: '',
    shippingCity: '',
    shippingPincode: '',
    useSameForBilling: true,

    // Step 2: Billing (Conditional)
    billingName: '',
    billingPhone: '',
    billingEmail: '',
    billingAddress: '',
    billingCity: '',
    billingPincode: '',

    // Step 3: Payment Method
    paymentMethod: 'card', // card, debit, wallet, upi
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    walletProvider: '',
    upiId: ''
  });

  // --- Touched States ---
  const [touched, setTouched] = useState({});

  // --- Form Validation Errors ---
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  
  // --- Modal & Confirmation States ---
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [finalTotal, setFinalTotal] = useState(0);

  // --- Price Calculations ---
  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price, 0);
  const discountRate = 0.15; // 15% off GLASSY15
  const discountVal = subtotal * discountRate;
  const shippingFee = 9.99;
  const grandTotal = subtotal - discountVal + shippingFee;

  // --- Trigger Validations ---
  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let currentErrors = {};

    const nameRegex = /^[a-zA-Z\s]{3,50}$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const phoneRegex = /^[6-9]\d{9}$/; // 10 digit Indian phone
    const pincodeRegex = /^[1-9][0-9]{5}$/; // 6 digit Indian pincode

    // --- 1. Shipping Address Validation ---
    if (!formData.shippingName.trim()) {
      currentErrors.shippingName = 'Name is required';
    } else if (!nameRegex.test(formData.shippingName.trim())) {
      currentErrors.shippingName = 'Name must be 3-50 letters only';
    }

    if (!formData.shippingPhone.trim()) {
      currentErrors.shippingPhone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.shippingPhone.trim())) {
      currentErrors.shippingPhone = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!formData.shippingEmail.trim()) {
      currentErrors.shippingEmail = 'Email is required';
    } else if (!emailRegex.test(formData.shippingEmail.trim())) {
      currentErrors.shippingEmail = 'Enter a valid email address';
    }

    if (!formData.shippingAddress.trim()) {
      currentErrors.shippingAddress = 'Shipping address is required';
    } else if (formData.shippingAddress.trim().length < 6) {
      currentErrors.shippingAddress = 'Address must be at least 6 characters';
    }

    if (!formData.shippingCity.trim()) {
      currentErrors.shippingCity = 'City is required';
    } else if (formData.shippingCity.trim().length < 2) {
      currentErrors.shippingCity = 'City name is too short';
    }

    if (!formData.shippingPincode.trim()) {
      currentErrors.shippingPincode = 'Pincode is required';
    } else if (!pincodeRegex.test(formData.shippingPincode.trim())) {
      currentErrors.shippingPincode = 'Must be a valid 6-digit Indian Pincode';
    }

    // --- 2. Billing Address Validation (Conditional) ---
    if (!formData.useSameForBilling) {
      if (!formData.billingName.trim()) {
        currentErrors.billingName = 'Billing Name is required';
      } else if (!nameRegex.test(formData.billingName.trim())) {
        currentErrors.billingName = 'Name must be 3-50 letters only';
      }

      if (!formData.billingPhone.trim()) {
        currentErrors.billingPhone = 'Billing Phone is required';
      } else if (!phoneRegex.test(formData.billingPhone.trim())) {
        currentErrors.billingPhone = 'Enter a valid 10-digit mobile number';
      }

      if (!formData.billingEmail.trim()) {
        currentErrors.billingEmail = 'Billing Email is required';
      } else if (!emailRegex.test(formData.billingEmail.trim())) {
        currentErrors.billingEmail = 'Enter a valid email address';
      }

      if (!formData.billingAddress.trim()) {
        currentErrors.billingAddress = 'Billing address is required';
      } else if (formData.billingAddress.trim().length < 6) {
        currentErrors.billingAddress = 'Address must be at least 6 characters';
      }

      if (!formData.billingCity.trim()) {
        currentErrors.billingCity = 'Billing City is required';
      } else if (formData.billingCity.trim().length < 2) {
        currentErrors.billingCity = 'City name is too short';
      }

      if (!formData.billingPincode.trim()) {
        currentErrors.billingPincode = 'Billing Pincode is required';
      } else if (!pincodeRegex.test(formData.billingPincode.trim())) {
        currentErrors.billingPincode = 'Must be a valid 6-digit Pincode';
      }
    }

    // --- 3. Payment Method Validations ---
    if (formData.paymentMethod === 'card' || formData.paymentMethod === 'debit') {
      const cleanCard = formData.cardNumber.replace(/\s/g, '');
      if (!formData.cardNumber) {
        currentErrors.cardNumber = 'Card number is required';
      } else if (cleanCard.length !== 16 || !/^\d+$/.test(cleanCard)) {
        currentErrors.cardNumber = 'Must be exactly 16 digits';
      }

      const expiryRegex = /^(0[1-9]|1[0-2])\/?([2-9][6-9]|[3-9][0-9])$/; // MM/YY
      if (!formData.cardExpiry) {
        currentErrors.cardExpiry = 'Expiry is required';
      } else if (!expiryRegex.test(formData.cardExpiry)) {
        currentErrors.cardExpiry = 'Must match MM/YY (valid future date)';
      }

      if (!formData.cardCVV) {
        currentErrors.cardCVV = 'CVV is required';
      } else if (formData.cardCVV.length !== 3 || !/^\d+$/.test(formData.cardCVV)) {
        currentErrors.cardCVV = 'Must be a 3-digit number';
      }
    } else if (formData.paymentMethod === 'wallet') {
      if (!formData.walletProvider) {
        currentErrors.walletProvider = 'Please select a wallet provider';
      }
    } else if (formData.paymentMethod === 'upi') {
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      if (!formData.upiId) {
        currentErrors.upiId = 'UPI ID is required';
      } else if (!upiRegex.test(formData.upiId.trim())) {
        currentErrors.upiId = 'Enter a valid UPI ID (e.g. user@okaxis)';
      }
    }

    setErrors(currentErrors);

    // Form validity check
    const valid = Object.keys(currentErrors).length === 0;
    setIsFormValid(valid);
  };

  // --- Dynamic Input Handlers ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // --- Card Formatters ---
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, ''); // Digits only
    val = val.substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleCardExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.substring(0, 4);
    let formatted = val;
    if (val.length > 2) {
      formatted = val.substring(0, 2) + '/' + val.substring(2);
    }
    setFormData(prev => ({ ...prev, cardExpiry: formatted }));
  };

  const handleCardCVVChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.substring(0, 3);
    setFormData(prev => ({ ...prev, cardCVV: val }));
  };

  // --- Form submission dispatcher ---
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    let allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (isFormValid) {
      const orderPayload = {
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: CART_ITEMS,
        financials: {
          subtotal,
          discount: discountVal,
          shipping: shippingFee,
          grandTotal
        },
        shippingAddress: {
          name: formData.shippingName,
          phone: formData.shippingPhone,
          email: formData.shippingEmail,
          address: formData.shippingAddress,
          city: formData.shippingCity,
          pincode: formData.shippingPincode
        },
        billingAddress: formData.useSameForBilling ? 'Same as Shipping' : {
          name: formData.billingName,
          phone: formData.billingPhone,
          email: formData.billingEmail,
          address: formData.billingAddress,
          city: formData.billingCity,
          pincode: formData.billingPincode
        },
        payment: {
          method: formData.paymentMethod,
          details: formData.paymentMethod === 'card' || formData.paymentMethod === 'debit' ? {
            cardNumber: formData.cardNumber.replace(/\s/g, '').replace(/.(?=.{4})/g, '*'),
            expiry: formData.cardExpiry
          } : formData.paymentMethod === 'wallet' ? {
            provider: formData.walletProvider
          } : {
            upiId: formData.upiId
          }
        },
        timestamp: new Date().toISOString()
      };

      console.log('====================================');
      console.log('ORDER PLACEMENT PAYLOAD DISPATCHED:', orderPayload);
      console.log('====================================');

      setOrderId(orderPayload.orderId);
      setFinalTotal(grandTotal.toFixed(2));
      setShowModal(true);
    }
  };

  // --- Reset Forms ---
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      shippingName: '',
      shippingPhone: '',
      shippingEmail: '',
      shippingAddress: '',
      shippingCity: '',
      shippingPincode: '',
      useSameForBilling: true,
      billingName: '',
      billingPhone: '',
      billingEmail: '',
      billingAddress: '',
      billingCity: '',
      billingPincode: '',
      paymentMethod: 'card',
      cardNumber: '',
      cardExpiry: '',
      cardCVV: '',
      walletProvider: '',
      upiId: ''
    });
    setTouched({});
    setOrderId('');
  };

  // Stepper Section Checker
  const isSectionValid = (section) => {
    if (section === 1) {
      return (
        formData.shippingName && !errors.shippingName &&
        formData.shippingPhone && !errors.shippingPhone &&
        formData.shippingEmail && !errors.shippingEmail &&
        formData.shippingAddress && !errors.shippingAddress &&
        formData.shippingCity && !errors.shippingCity &&
        formData.shippingPincode && !errors.shippingPincode
      );
    }
    if (section === 2) {
      if (formData.useSameForBilling) return true;
      return (
        formData.billingName && !errors.billingName &&
        formData.billingPhone && !errors.billingPhone &&
        formData.billingEmail && !errors.billingEmail &&
        formData.billingAddress && !errors.billingAddress &&
        formData.billingCity && !errors.billingCity &&
        formData.billingPincode && !errors.billingPincode
      );
    }
    if (section === 3) {
      if (formData.paymentMethod === 'card' || formData.paymentMethod === 'debit') {
        return formData.cardNumber && !errors.cardNumber && formData.cardExpiry && !errors.cardExpiry && formData.cardCVV && !errors.cardCVV;
      }
      if (formData.paymentMethod === 'wallet') {
        return formData.walletProvider && !errors.walletProvider;
      }
      if (formData.paymentMethod === 'upi') {
        return formData.upiId && !errors.upiId;
      }
    }
    return false;
  };

  const getSectionClass = (section) => {
    const valid = isSectionValid(section);
    let base = 'checkout-section';
    if (valid) base += ' valid-step';
    
    // Focus active steps based on flow
    if (section === 1 && !valid) base += ' active-step';
    else if (section === 2 && isSectionValid(1) && !valid) base += ' active-step';
    else if (section === 3 && isSectionValid(1) && isSectionValid(2) && !valid) base += ' active-step';
    
    return base;
  };

  return {
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
  };
}
