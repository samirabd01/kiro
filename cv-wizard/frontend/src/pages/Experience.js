import React, { useState } from 'react';
import WizardLayout from '../components/WizardLayout';
import { useCVContext } from '../context/CVContext';
import './Experience.css';

const Experience = () => {
  const { addExperience, nextStep, prevStep, goToStep } = useCVContext();
  const [form, setForm] = useState({
    jobTitle: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const handleChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'current' && value ? { endDate: '' } : {})
    }));
  };

  const handleNext = () => {
    if (form.jobTitle && form.company) {
      addExperience(form);
    }
    goToStep(4); // Go to Experience Overview
  };

  const handleSkip = () => {
    goToStep(4); // Skip to overview
  };

  return (
    <WizardLayout
      title="Work Experience"
      subtitle="Add your most recent job first"
    >
      <div className="experience-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Job Title *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Senior Software Engineer"
              value={form.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Company *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Google, Meta, etc."
              value={form.company}
              onChange={(e) => handleChange('company', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-input"
            placeholder="New York, NY / Remote"
            value={form.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input
              type="month"
              className="form-input"
              value={form.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              type="month"
              className="form-input"
              value={form.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              disabled={form.current}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="current-job-label">
            <input
              type="checkbox"
              checked={form.current}
              onChange={(e) => handleChange('current', e.target.checked)}
            />
            <span>I currently work here</span>
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-input"
            placeholder="Describe your responsibilities and achievements... Use bullet points for better readability."
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={5}
          />
          <p className="form-hint">
            💡 Tip: Start each point with action verbs like "Led", "Built", "Improved", "Managed"
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="wizard-nav">
        <button className="btn-secondary" onClick={prevStep}>
          ← Back
        </button>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-secondary" onClick={handleSkip}>
            Skip
          </button>
          <button
            className="btn-primary"
            onClick={handleNext}
            disabled={!form.jobTitle || !form.company}
            style={{
              opacity: !form.jobTitle || !form.company ? 0.5 : 1,
              cursor: !form.jobTitle || !form.company ? 'not-allowed' : 'pointer'
            }}
          >
            Add Experience →
          </button>
        </div>
      </div>
    </WizardLayout>
  );
};

export default Experience;
