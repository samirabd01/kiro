import React, { useState, useRef } from 'react';
import WizardLayout from '../components/WizardLayout';
import { useCVContext } from '../context/CVContext';
import './PersonalInfo.css';

const PersonalInfo = () => {
  const { cvData, updatePersonalInfo, nextStep, prevStep } = useCVContext();
  const { personalInfo } = cvData;
  const photoRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(personalInfo.photo || null);

  const handleChange = (field, value) => {
    updatePersonalInfo(field, value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotoPreview(ev.target.result);
        updatePersonalInfo('photo', ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    updatePersonalInfo('photo', null);
  };

  const handleNext = () => {
    nextStep();
  };

  return (
    <WizardLayout
      title="Personal Information"
      subtitle="Tell us about yourself — this will appear at the top of your CV"
    >
      <div className="personal-info-container">
        {/* Photo Upload */}
        <div className="photo-section">
          <div
            className="photo-upload"
            onClick={() => !photoPreview && photoRef.current?.click()}
          >
            {photoPreview ? (
              <div className="photo-preview-container">
                <img src={photoPreview} alt="Profile" className="photo-preview" />
                <div className="photo-actions">
                  <button className="photo-btn" onClick={() => photoRef.current?.click()} title="Change photo">
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button className="photo-btn photo-btn-danger" onClick={handleRemovePhoto} title="Remove photo">
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="photo-placeholder">
                <div className="photo-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="photo-text">Upload Photo</span>
                <span className="photo-subtext">Optional</span>
              </div>
            )}
          </div>
          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
        </div>

        {/* Form Fields */}
        <div className="form-grid">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="John"
                value={personalInfo.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Doe"
                value={personalInfo.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Job Title / Position</label>
            <input
              type="text"
              className="form-input"
              placeholder="Senior Software Engineer"
              value={personalInfo.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-input"
                placeholder="john.doe@example.com"
                value={personalInfo.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+1 (555) 123-4567"
                value={personalInfo.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-input"
                placeholder="New York, NY"
                value={personalInfo.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Website</label>
              <input
                type="url"
                className="form-input"
                placeholder="www.johndoe.com"
                value={personalInfo.website}
                onChange={(e) => handleChange('website', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label className="form-label">LinkedIn Profile</label>
            <input
              type="text"
              className="form-input"
              placeholder="linkedin.com/in/johndoe"
              value={personalInfo.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="wizard-nav">
        <button className="btn-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button className="btn-primary" onClick={handleNext}>
          Next: Experience →
        </button>
      </div>
    </WizardLayout>
  );
};

export default PersonalInfo;
