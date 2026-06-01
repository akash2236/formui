import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Bookmark, 
  MessageSquare, 
  ShieldCheck,
  Send
} from 'lucide-react';

// Custom Controller Hook Import
import useContactForm from './hooks/useContactForm';

// Reusable UI Components Imports
import GlowBackground from './components/GlowBackground';
import InputField from './components/InputField';
import TextAreaField from './components/TextAreaField';
import SelectField from './components/SelectField';
import CheckboxField from './components/CheckboxField';
import SuccessModal from './components/SuccessModal';

function App() {
  // Bind form controllers directly from custom React hook
  const {
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
  } = useContactForm();

  return (
    <>
      <GlowBackground />

      <div className="app-container">
        <main className="glass-panel">
          <header className="form-header">
            <div className="logo-badge">
              <ShieldCheck />
            </div>
            <h1>Advanced Contact Form</h1>
            <p className="subtitle">Assignment 1 • Decoupled MVVM Architecture</p>
          </header>

          <form onSubmit={handleSubmit} noValidate>
            
            {/* Grid Row: Full Name & Email */}
            <div className="form-row">
              <InputField
                id="fullname"
                name="fullname"
                label="Full Name"
                placeholder="John Doe"
                value={formData.fullname}
                onChange={handleInputChange}
                onBlur={() => handleBlur('fullname')}
                error={errors.fullname}
                touched={touched.fullname}
                icon={User}
              />

              <InputField
                id="email"
                name="email"
                label="Email Address"
                type="email"
                placeholder="john.doe@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                icon={Mail}
                helperText="Gmail addresses are fully supported alongside business domains."
              />
            </div>

            {/* Grid Row: Indian Phone & Subject */}
            <div className="form-row">
              <InputField
                id="phone"
                name="phone"
                label="Phone Number"
                placeholder="+91-XXXXX-XXXXX"
                value={formData.phone}
                onChange={handlePhoneInputChange}
                onBlur={() => handleBlur('phone')}
                error={errors.phone}
                touched={touched.phone}
                icon={Phone}
                helperText="Format: +91-XXXXX-XXXXX (Indian format required)"
              />

              <TextAreaField
                id="subject"
                name="subject"
                label="Subject"
                placeholder="Brief reason for your inquiry..."
                value={formData.subject}
                onChange={handleInputChange}
                onBlur={() => handleBlur('subject')}
                error={errors.subject}
                touched={touched.subject}
                icon={Bookmark}
                charCount={subjectWordCount}
                maxChars={100}
              />
            </div>

            {/* Message Area */}
            <TextAreaField
              id="message"
              name="message"
              label="Message"
              placeholder="Provide a detailed message here (min 20 chars, max 500)..."
              value={formData.message}
              onChange={handleInputChange}
              onBlur={() => handleBlur('message')}
              error={errors.message}
              touched={touched.message}
              icon={MessageSquare}
              charCount={messageCharCount}
              maxChars={500}
            />

            {/* Dropdown Priority */}
            <SelectField
              id="priority"
              name="priority"
              label="Priority Level"
              value={formData.priority}
              onChange={handleInputChange}
              onBlur={() => handleBlur('priority')}
              error={errors.priority}
              touched={touched.priority}
              icon={ShieldCheck}
              options={[
                { value: 'low', label: 'Low Priority' },
                { value: 'medium', label: 'Medium Priority' },
                { value: 'high', label: 'High Priority' }
              ]}
            />

            {/* Checkboxes Wrapper */}
            <div className="checkbox-container">
              <CheckboxField
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                error={errors.terms}
                touched={touched.terms}
                label={
                  <>
                    I agree to the <a href="#" className="inline-link" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="#" className="inline-link" onClick={(e) => e.preventDefault()}>Privacy Policy</a> *
                  </>
                }
              />

              <CheckboxField
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                error=""
                touched={false}
                label="Subscribe to our corporate weekly newsletter (Optional)"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={!isFormValid}
            >
              <span>Send Message</span>
              <Send className="btn-icon" />
            </button>
          </form>
        </main>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        submittedData={submittedData}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default App;
