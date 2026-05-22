import React, { useState } from 'react';
import { useCVContext } from '../context/CVContext';
import CVPreview from '../components/CVPreview';
import './Preview.css';

const Preview = () => {
  const { cvData, updateDesign, goToStep, prevStep } = useCVContext();
  const { design } = cvData;
  const [activeTab, setActiveTab] = useState('design');
  const [spellCheck, setSpellCheck] = useState(false);

  const COLORS = [
    { label: 'Purple', value: '#7c3aed' },
    { label: 'Blue', value: '#3b82f6' },
    { label: 'Green', value: '#10b981' },
    { label: 'Red', value: '#ef4444' },
    { label: 'Orange', value: '#f97316' },
    { label: 'Teal', value: '#06b6d4' },
    { label: 'Pink', value: '#ec4899' },
    { label: 'Dark', value: '#1e293b' },
  ];

  const FONTS = ['Inter', 'Georgia', 'Roboto', 'Merriweather', 'Playfair Display'];
  const LAYOUTS = [
    { id: 'standard', label: 'Standard' },
    { id: 'sidebar', label: 'Sidebar' },
    { id: 'compact', label: 'Compact' }
  ];
  const LANGUAGES = ['English', 'Turkish', 'German', 'French', 'Spanish', 'Arabic'];

  const TEMPLATES = [
    { id: 'free', name: 'Free', color: '#3b82f6' },
    { id: 'artistic', name: 'Artistic', color: '#ec4899' },
    { id: 'bloom', name: 'Bloom', color: '#10b981' },
    { id: 'expert', name: 'Expert', color: '#8b5cf6' },
    { id: 'impact', name: 'Impact', color: '#f97316' },
    { id: 'creative', name: 'Creative', color: '#06b6d4' },
    { id: 'elite', name: 'Elite', color: '#f59e0b' },
    { id: 'business', name: 'Business', color: '#64748b' },
    { id: 'tech', name: 'Tech', color: '#22d3ee' }
  ];

  const handleAction = (action) => {
    // Download, Print, Email - all go to Sign Up first
    goToStep(11);
  };

  return (
    <div className="preview-layout">
      {/* Left: CV Preview */}
      <div className="preview-left">
        <div className="preview-toolbar">
          <div className="preview-logo" onClick={() => goToStep(0)}>
            <div className="logo-icon-sm">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span>CV<b>Wizard</b></span>
          </div>
          <button className="toolbar-btn" onClick={prevStep}>
            ← Edit
          </button>
        </div>

        <div className="cv-preview-wrapper">
          <CVPreview cvData={cvData} spellCheck={spellCheck} />
        </div>
      </div>

      {/* Right: Controls */}
      <div className="preview-right">
        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn-large primary" onClick={() => handleAction('download')}>
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Download PDF
          </button>
          <button className="action-btn-large" onClick={() => handleAction('print')}>
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Print
          </button>
          <button className="action-btn-large" onClick={() => handleAction('email')}>
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Email
          </button>
        </div>

        {/* Tabs */}
        <div className="control-tabs">
          <button
            className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
            onClick={() => setActiveTab('design')}
          >
            Design
          </button>
          <button
            className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            Templates
          </button>
        </div>

        {/* Design Tab */}
        {activeTab === 'design' && (
          <div className="control-panel">
            {/* Layout */}
            <div className="control-group">
              <label className="control-label">Layout</label>
              <div className="layout-options">
                {LAYOUTS.map(l => (
                  <button
                    key={l.id}
                    className={`layout-option ${design.layout === l.id ? 'active' : ''}`}
                    onClick={() => updateDesign('layout', l.id)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="control-group">
              <label className="control-label">Accent Color</label>
              <div className="color-swatches">
                {COLORS.map(c => (
                  <button
                    key={c.value}
                    className={`color-swatch ${design.color === c.value ? 'selected' : ''}`}
                    style={{ background: c.value }}
                    title={c.label}
                    onClick={() => updateDesign('color', c.value)}
                  >
                    {design.color === c.value && (
                      <svg viewBox="0 0 24 24" fill="none" width="12" height="12">
                        <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5"
                          strokeLinecap="round"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Font */}
            <div className="control-group">
              <label className="control-label">Font Style</label>
              <select
                className="form-input"
                value={design.fontStyle}
                onChange={e => updateDesign('fontStyle', e.target.value)}
              >
                {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            {/* Language */}
            <div className="control-group">
              <label className="control-label">Language</label>
              <select
                className="form-input"
                value={design.language}
                onChange={e => updateDesign('language', e.target.value)}
              >
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="control-panel">
            <div className="mini-templates">
              {TEMPLATES.map(t => (
                <div
                  key={t.id}
                  className={`mini-template ${cvData.template === t.id ? 'selected' : ''}`}
                  onClick={() => updateDesign('template', t.id)}
                >
                  <div className="mini-template-preview" style={{
                    background: `${t.color}22`
                  }}>
                    <div className="mini-bar" style={{ background: t.color }}></div>
                    <div className="mini-lines">
                      <div></div><div></div><div></div>
                    </div>
                  </div>
                  <span>{t.name}</span>
                  {cvData.template === t.id && (
                    <div className="mini-selected">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spell Check */}
        <div className="spell-check-row">
          <div className="spell-check-info">
            <span className="spell-icon">🔍</span>
            <div>
              <p className="spell-title">AI Spell Check</p>
              <p className="spell-desc">Highlight spelling errors</p>
            </div>
          </div>
          <div
            className={`toggle ${spellCheck ? 'on' : ''}`}
            onClick={() => setSpellCheck(!spellCheck)}
          >
            <div className="toggle-thumb"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
