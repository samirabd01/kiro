import React, { useState } from 'react';
import WizardLayout from '../components/WizardLayout';
import { useCVContext } from '../context/CVContext';
import './Summary.css';

const EXAMPLES = [
  "Results-driven software engineer with 5+ years of experience building scalable web applications using React and Node.js. Passionate about clean code and delivering exceptional user experiences.",
  "Dynamic marketing professional with expertise in digital marketing, SEO, and content strategy. Track record of driving 40% increase in organic traffic and improving conversion rates.",
  "Innovative product manager with 8+ years leading cross-functional teams to deliver high-impact products. Skilled in agile methodologies and data-driven decision making."
];

const Summary = () => {
  const { cvData, updateCVData, nextStep, prevStep } = useCVContext();
  const [summary, setSummary] = useState(cvData.summary || '');
  const [showExamples, setShowExamples] = useState(false);

  const handleNext = () => {
    updateCVData('summary', summary);
    nextStep();
  };

  const wordCount = summary.trim().split(/\s+/).filter(Boolean).length;

  return (
    <WizardLayout
      title="Professional Summary"
      subtitle="Write a compelling summary that highlights your key strengths"
    >
      <div className="summary-container">
        <div className="summary-header">
          <div className="summary-tips">
            <div className="tip-item">
              <span className="tip-icon">🎯</span>
              <span>Keep it 2-4 sentences</span>
            </div>
            <div className="tip-item">
              <span className="tip-icon">💡</span>
              <span>Highlight key achievements</span>
            </div>
            <div className="tip-item">
              <span className="tip-icon">⚡</span>
              <span>Tailor to the job role</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="summary-label-row">
            <label className="form-label">Professional Summary</label>
            <span className={`word-count ${wordCount > 80 ? 'over' : ''}`}>
              {wordCount} words
            </span>
          </div>
          <textarea
            className="form-input summary-textarea"
            placeholder="Write a professional summary that describes who you are, your key experience, and what value you bring..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={6}
          />
        </div>

        {/* Examples */}
        <div className="examples-section">
          <button
            className="examples-toggle"
            onClick={() => setShowExamples(!showExamples)}
          >
            {showExamples ? '▼' : '▶'} View Examples
          </button>

          {showExamples && (
            <div className="examples-list">
              {EXAMPLES.map((example, i) => (
                <div
                  key={i}
                  className="example-card"
                  onClick={() => setSummary(example)}
                >
                  <p>{example}</p>
                  <span className="example-use">Use this →</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="wizard-nav">
        <button className="btn-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button className="btn-primary" onClick={handleNext}>
          Next: Other Sections →
        </button>
      </div>
    </WizardLayout>
  );
};

export default Summary;
