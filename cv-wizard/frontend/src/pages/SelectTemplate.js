import React, { useState } from 'react';
import WizardLayout from '../components/WizardLayout';
import { useCVContext } from '../context/CVContext';
import './SelectTemplate.css';

const TEMPLATES = [
  {
    id: 'free',
    name: 'Free',
    badge: 'FREE',
    badgeType: 'free',
    description: 'Clean and minimal design',
    image: '/template-free.png',
    colors: ['#3b82f6', '#1e40af']
  },
  {
    id: 'artistic',
    name: 'Artistic',
    badge: 'PRO',
    badgeType: 'pro',
    description: 'Creative and modern layout',
    image: '/template-artistic.png',
    colors: ['#ec4899', '#be185d']
  },
  {
    id: 'bloom',
    name: 'Bloom',
    badge: 'PRO',
    badgeType: 'pro',
    description: 'Elegant floral design',
    image: '/template-bloom.png',
    colors: ['#10b981', '#059669']
  },
  {
    id: 'expert',
    name: 'Expert',
    badge: 'PRO',
    badgeType: 'pro',
    description: 'Professional dark style',
    image: '/template-expert.png',
    colors: ['#8b5cf6', '#7c3aed']
  },
  {
    id: 'impact',
    name: 'Impact',
    badge: 'PRO',
    badgeType: 'pro',
    description: 'Bold and impactful',
    image: '/template-impact.png',
    colors: ['#f97316', '#ea580c']
  },
  {
    id: 'creative',
    name: 'Creative',
    badge: 'PRO',
    badgeType: 'pro',
    description: 'Unique creative layout',
    image: '/template-creative.png',
    colors: ['#06b6d4', '#0891b2']
  },
  {
    id: 'elite',
    name: 'Elite',
    badge: 'PRO',
    badgeType: 'pro',
    description: 'Premium luxury design',
    image: '/template-elite.png',
    colors: ['#f59e0b', '#d97706']
  },
  {
    id: 'business',
    name: 'Business',
    badge: 'PRO',
    badgeType: 'pro',
    description: 'Corporate professional',
    image: '/template-business.png',
    colors: ['#64748b', '#475569']
  },
  {
    id: 'tech',
    name: 'Tech',
    badge: 'PRO',
    badgeType: 'pro',
    description: 'Modern tech-focused',
    image: '/template-tech.png',
    colors: ['#22d3ee', '#06b6d4']
  }
];

const SelectTemplate = () => {
  const { cvData, updateCVData, nextStep, prevStep } = useCVContext();
  const [selected, setSelected] = useState(cvData.template || null);

  const handleSelect = (templateId) => {
    setSelected(templateId);
  };

  const handleNext = () => {
    if (selected) {
      updateCVData('template', selected);
      nextStep();
    }
  };

  return (
    <WizardLayout
      title="Choose Your Template"
      subtitle="Select a template that best represents your professional style"
    >
      <div className="template-grid">
        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            className={`template-card ${selected === template.id ? 'selected' : ''}`}
            onClick={() => handleSelect(template.id)}
          >
            {/* Template Preview */}
            <div className="template-preview" style={{
              background: `linear-gradient(135deg, ${template.colors[0]}22, ${template.colors[1]}11)`
            }}>
              <div className="template-preview-inner">
                {/* Mini CV preview */}
                <div className="mini-cv">
                  <div className="mini-header" style={{ background: template.colors[0] }}>
                    <div className="mini-avatar"></div>
                    <div className="mini-info">
                      <div className="mini-name"></div>
                      <div className="mini-title"></div>
                    </div>
                  </div>
                  <div className="mini-body">
                    <div className="mini-line"></div>
                    <div className="mini-line short"></div>
                    <div className="mini-line"></div>
                    <div className="mini-line medium"></div>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className={`template-badge ${template.badgeType}`}>
                {template.badge}
              </div>

              {/* Selected overlay */}
              {selected === template.id && (
                <div className="template-selected-overlay">
                  <div className="selected-check">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="template-info">
              <h4 className="template-name">{template.name}</h4>
              <p className="template-desc">{template.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="wizard-nav">
        <button className="btn-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button
          className="btn-primary"
          onClick={handleNext}
          disabled={!selected}
          style={{ opacity: selected ? 1 : 0.5, cursor: selected ? 'pointer' : 'not-allowed' }}
        >
          Next: Personal Info →
        </button>
      </div>
    </WizardLayout>
  );
};

export default SelectTemplate;
