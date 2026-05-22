import React from 'react';
import WizardLayout from '../components/WizardLayout';
import { useCVContext } from '../context/CVContext';
import './ExperienceOverview.css';

const ExperienceOverview = () => {
  const { cvData, deleteExperience, nextStep, prevStep, goToStep } = useCVContext();
  const { experiences } = cvData;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <WizardLayout
      title="Experience Overview"
      subtitle="Review your work experience entries"
    >
      <div className="overview-container">
        {experiences.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💼</div>
            <h3>No experience added yet</h3>
            <p>Add your work experience to make your CV stand out</p>
            <button className="btn-primary" onClick={() => goToStep(3)}>
              + Add Experience
            </button>
          </div>
        ) : (
          <>
            <div className="experience-cards">
              {experiences.map((exp) => (
                <div key={exp.id} className="experience-card">
                  <div className="card-left">
                    <div className="company-logo">
                      {exp.company.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <div>
                        <h3 className="job-title">{exp.jobTitle}</h3>
                        <p className="company-info">
                          <span>{exp.company}</span>
                          {exp.location && (
                            <>
                              <span className="dot">·</span>
                              <span>{exp.location}</span>
                            </>
                          )}
                        </p>
                        <p className="date-range">
                          {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                          {exp.current && <span className="current-badge">Current</span>}
                        </p>
                      </div>
                      <div className="card-actions">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => goToStep(3)}
                          title="Edit"
                        >
                          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => deleteExperience(exp.id)}
                          title="Delete"
                        >
                          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="card-description">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="add-more-btn" onClick={() => goToStep(3)}>
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round"/>
              </svg>
              Add Another Job
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="wizard-nav">
        <button className="btn-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button className="btn-primary" onClick={nextStep}>
          Next: Education →
        </button>
      </div>
    </WizardLayout>
  );
};

export default ExperienceOverview;
