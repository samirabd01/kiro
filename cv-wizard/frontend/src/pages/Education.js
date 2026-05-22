import React, { useState } from 'react';
import WizardLayout from '../components/WizardLayout';
import { useCVContext } from '../context/CVContext';

const Education = () => {
  const { addEducation, nextStep, prevStep, goToStep } = useCVContext();
  const [form, setForm] = useState({
    degree: '',
    school: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: ''
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (form.degree && form.school) {
      addEducation(form);
    }
    goToStep(6); // Education Overview
  };

  return (
    <WizardLayout
      title="Education"
      subtitle="Add your educational background"
    >
      <div className="experience-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Degree / Certificate *</label>
            <input
              type="text"
              className="form-input"
              placeholder="B.S. Computer Science"
              value={form.degree}
              onChange={(e) => handleChange('degree', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">School / University *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Harvard University"
              value={form.school}
              onChange={(e) => handleChange('school', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-input"
              placeholder="Cambridge, MA"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">GPA (optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="3.9 / 4.0"
              value={form.gpa}
              onChange={(e) => handleChange('gpa', e.target.value)}
            />
          </div>
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
            <label className="form-label">End Date (or Expected)</label>
            <input
              type="month"
              className="form-input"
              value={form.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description (optional)</label>
          <textarea
            className="form-input"
            placeholder="Relevant coursework, honors, activities..."
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
          />
        </div>
      </div>

      <div className="wizard-nav">
        <button className="btn-secondary" onClick={prevStep}>
          ← Back
        </button>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-secondary" onClick={() => goToStep(6)}>
            Skip
          </button>
          <button
            className="btn-primary"
            onClick={handleNext}
            disabled={!form.degree || !form.school}
            style={{
              opacity: !form.degree || !form.school ? 0.5 : 1,
              cursor: !form.degree || !form.school ? 'not-allowed' : 'pointer'
            }}
          >
            Add Education →
          </button>
        </div>
      </div>
    </WizardLayout>
  );
};

export default Education;
