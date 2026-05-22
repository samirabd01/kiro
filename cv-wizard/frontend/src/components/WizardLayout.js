import React from 'react';
import { useCVContext } from '../context/CVContext';
import './WizardLayout.css';

const STEPS = [
  { id: 1, label: 'Template', icon: '🎨' },
  { id: 2, label: 'Personal Info', icon: '👤' },
  { id: 3, label: 'Experience', icon: '💼' },
  { id: 4, label: 'Education', icon: '🎓' },
  { id: 5, label: 'Skills', icon: '⚡' },
  { id: 6, label: 'Summary', icon: '📝' },
  { id: 7, label: 'Other', icon: '📋' },
];

const WizardLayout = ({ children, title, subtitle, currentWizardStep, totalSteps }) => {
  const { goToStep, currentStep } = useCVContext();

  // Map main step to wizard step index (1-7)
  const wizardStepMap = {
    1: 1, // template
    2: 2, // personal info
    3: 3, // experience
    4: 3, // exp overview
    5: 4, // education
    6: 4, // edu overview
    7: 5, // skills
    8: 6, // summary
    9: 7, // other sections
  };

  const activeWizardStep = wizardStepMap[currentStep] || 1;

  return (
    <div className="wizard-layout">
      {/* Sidebar */}
      <div className="wizard-sidebar">
        <div className="sidebar-logo" onClick={() => goToStep(0)}>
          <div className="logo-icon-sm">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>CV<b>Wizard</b></span>
        </div>

        <div className="sidebar-steps">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`sidebar-step ${activeWizardStep === step.id ? 'active' : ''} 
                          ${activeWizardStep > step.id ? 'completed' : ''}`}
            >
              <div className="step-indicator">
                {activeWizardStep > step.id ? (
                  <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-progress">
            <div className="progress-label">
              <span>Progress</span>
              <span>{Math.round((activeWizardStep / STEPS.length) * 100)}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(activeWizardStep / STEPS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="wizard-main">
        <div className="wizard-header">
          {title && (
            <div className="wizard-title-block">
              <h1 className="wizard-title">{title}</h1>
              {subtitle && <p className="wizard-subtitle">{subtitle}</p>}
            </div>
          )}
        </div>

        <div className="wizard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WizardLayout;
