import { useState, useEffect } from 'react';

export default function useContactForm() {
  // --- Form Input States ---
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: '',
    terms: false,
    newsletter: false
  });

  // --- Touched / Blur Tracker ---
  const [touched, setTouched] = useState({
    fullname: false,
    email: false,
    phone: false,
    subject: false,
    message: false,
    priority: false,
    terms: false
  });

  // --- Validation Errors ---
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: '',
    terms: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // --- Run Validation Logic on Input Changes ---
  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let currentErrors = { ...errors };

    // 1. Full Name: min 3, max 50, letters/spaces only
    const nameTrimmed = formData.fullname.trim();
    if (nameTrimmed.length === 0) {
      currentErrors.fullname = 'Full Name is required';
    } else if (nameTrimmed.length < 3) {
      currentErrors.fullname = 'Name must be at least 3 characters';
    } else if (nameTrimmed.length > 50) {
      currentErrors.fullname = 'Name must not exceed 50 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(nameTrimmed)) {
      currentErrors.fullname = 'Name can only contain alphabets and spaces';
    } else {
      currentErrors.fullname = '';
    }

    // 2. Email Address
    const emailLower = formData.email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (emailLower.length === 0) {
      currentErrors.email = 'Email is required';
    } else if (!emailRegex.test(emailLower)) {
      currentErrors.email = 'Please enter a valid email address';
    } else {
      currentErrors.email = '';
    }

    // 3. Indian Phone Format: +91-XXXXX-XXXXX
    const phoneVal = formData.phone;
    const phoneRegex = /^\+91-[0-9]{5}-[0-9]{5}$/;
    if (phoneVal.length === 0) {
      currentErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phoneVal)) {
      currentErrors.phone = 'Must match Indian format: +91-XXXXX-XXXXX';
    } else {
      currentErrors.phone = '';
    }

    // 4. Subject: Min 5 chars, Max 100 words
    const subjVal = formData.subject.trim();
    const words = subjVal.split(/\s+/).filter(w => w.length > 0);
    if (subjVal.length === 0) {
      currentErrors.subject = 'Subject is required';
    } else if (subjVal.length < 5) {
      currentErrors.subject = 'Subject must be at least 5 characters';
    } else if (words.length > 100) {
      currentErrors.subject = 'Subject cannot exceed 100 words';
    } else {
      currentErrors.subject = '';
    }

    // 5. Message: Min 20, Max 500 chars
    const msgVal = formData.message;
    if (msgVal.length === 0) {
      currentErrors.message = 'Message is required';
    } else if (msgVal.length < 20) {
      currentErrors.message = `Message is too short (min 20 chars required)`;
    } else if (msgVal.length > 500) {
      currentErrors.message = `Message cannot exceed 500 characters`;
    } else {
      currentErrors.message = '';
    }

    // 6. Priority level
    if (formData.priority === '') {
      currentErrors.priority = 'Please select a priority level';
    } else {
      currentErrors.priority = '';
    }

    // 7. Terms & Conditions Checkbox
    if (!formData.terms) {
      currentErrors.terms = 'You must agree to the terms to proceed';
    } else {
      currentErrors.terms = '';
    }

    setErrors(currentErrors);

    // Final Validity
    const valid = 
      currentErrors.fullname === '' &&
      currentErrors.email === '' &&
      currentErrors.phone === '' &&
      currentErrors.subject === '' &&
      currentErrors.message === '' &&
      currentErrors.priority === '' &&
      currentErrors.terms === '';
    
    setIsFormValid(valid);
  };

  // --- Dynamic Input Change Handlers ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  // --- Dynamic Indian Phone Formatter (+91-XXXXX-XXXXX) ---
  const handlePhoneInputChange = (e) => {
    let val = e.target.value;
    let digits = val.replace(/\D/g, '');

    if (digits.startsWith('91') && digits.length > 2) {
      digits = digits.substring(2);
    }

    digits = digits.substring(0, 10);

    let formatted = '';
    if (digits.length > 0) {
      formatted = '+91-';
      if (digits.length <= 5) {
        formatted += digits;
      } else {
        formatted += digits.substring(0, 5) + '-' + digits.substring(5);
      }
    }

    setFormData(prev => ({
      ...prev,
      phone: formatted
    }));
  };

  // --- Form submission dispatcher ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setTouched({
      fullname: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
      priority: true,
      terms: true
    });

    if (isFormValid) {
      setSubmittedData({ ...formData });
      setShowSuccessModal(true);
    }
  };

  // --- Reset forms upon modal closure ---
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setFormData({
      fullname: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      priority: '',
      terms: false,
      newsletter: false
    });
    setTouched({
      fullname: false,
      email: false,
      phone: false,
      subject: false,
      message: false,
      priority: false,
      terms: false
    });
    setSubmittedData(null);
  };

  // Derived word counts and character counts
  const subjectWordCount = formData.subject.trim().split(/\s+/).filter(w => w.length > 0).length;
  const messageCharCount = formData.message.length;

  return {
    formData,
    touched,
    errors,
    isFormValid,
    showSuccessModal,
    submittedData,
    subjectWordCount,
    messageCharCount,
    handleInputChange,
    handleBlur,
    handlePhoneInputChange,
    handleSubmit,
    handleCloseModal
  };
}
