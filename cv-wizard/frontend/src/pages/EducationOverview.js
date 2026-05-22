import React from 'react';
import WizardLayout from '../components/WizardLayout';
import { useCVContext } from '../context/CVContext';

const EducationOverview = () => {
  const { cvData, deleteEducation, nextStep, prevStep, goToStep } = useCVContext();
  const { educations } = cvData;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <WizardLayout
      title="Education Overview"
      subtitle="Review your educational background"
    >
      <div className="overview-container">
        {educations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎓</div>
            <h3>No education added yet</h3>
            <p>Add your educational background</p>
            <button className="btn-primary" onClick={() => goToStep(5)}>
              + Add Education
            </button>
          </div>
        ) : (
          <>
            <div className="experience-cards">
              {educations.map((edu) => (
                <div key={edu.id} className="experience-card">
                  <div className="card-left">
                    <div className="company-logo" style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)'
                    }}>
                      🎓
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <div>
                        <h3 className="job-title">{edu.degree}</h3>
                        <p className="company-info">
                          <span>{edu.school}</span>
                          {edu.location && (
                            <>
                              <span className="dot">·</span>
                              <span>{edu.location}</span>
                            </>
                          )}
                          {edu.gpa && (
                            <>
                              <span className="dot">·</span>
                              <span>GPA: {edu.gpa}</span>
                            </>
                          )}
                        </p>
                        <p className="date-range">
                          {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                        </p>
                      </div>
                      <div className="card-actions">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => goToStep(5)}
                          title="Edit"
                        >
                          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => deleteEducation(edu.id)}
                          title="Delete"
                        >
                          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="add-more-btn" onClick={() => goToStep(5)}>
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add Another Education
            </button>
          </>
        )}
      </div>

      <div className="wizard-nav">
        <button className="btn-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button className="btn-primary" onClick={nextStep}>
          Next: Skills →
        </button>
      </div>
    </WizardLayout>
  );
};

export default EducationOverview;
