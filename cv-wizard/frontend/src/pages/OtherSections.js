import React, { useState } from 'react';
import WizardLayout from '../components/WizardLayout';
import { useCVContext } from '../context/CVContext';
import './OtherSections.css';

// Sub-forms for each section
const CertificationForm = ({ onAdd, onClose }) => {
  const [form, setForm] = useState({ name: '', issuer: '', date: '', url: '' });
  return (
    <div className="subsection-form">
      <h3 className="subsection-title">Add Certification</h3>
      <div className="form-group">
        <label className="form-label">Certificate Name *</label>
        <input className="form-input" placeholder="AWS Solutions Architect"
          value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Issuing Organization</label>
          <input className="form-input" placeholder="Amazon Web Services"
            value={form.issuer} onChange={e => setForm(p => ({...p, issuer: e.target.value}))} />
        </div>
        <div className="form-group">
          <label className="form-label">Date</label>
          <input className="form-input" type="month"
            value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Credential URL</label>
        <input className="form-input" placeholder="https://..."
          value={form.url} onChange={e => setForm(p => ({...p, url: e.target.value}))} />
      </div>
      <div className="subsection-actions">
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" disabled={!form.name}
          onClick={() => { if(form.name) { onAdd(form); onClose(); } }}
          style={{ opacity: !form.name ? 0.5 : 1 }}>Add</button>
      </div>
    </div>
  );
};

const AccomplishmentForm = ({ onAdd, onClose }) => {
  const [form, setForm] = useState({ title: '', description: '' });
  return (
    <div className="subsection-form">
      <h3 className="subsection-title">Add Accomplishment</h3>
      <div className="form-group">
        <label className="form-label">Title *</label>
        <input className="form-input" placeholder="Employee of the Year 2023"
          value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea className="form-input" rows={3} placeholder="Brief description..."
          value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} />
      </div>
      <div className="subsection-actions">
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" disabled={!form.title}
          onClick={() => { if(form.title) { onAdd(form); onClose(); } }}
          style={{ opacity: !form.title ? 0.5 : 1 }}>Add</button>
      </div>
    </div>
  );
};

const LanguageForm = ({ onAdd, onClose }) => {
  const [form, setForm] = useState({ language: '', level: 'Professional' });
  const levels = ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic'];
  return (
    <div className="subsection-form">
      <h3 className="subsection-title">Add Language</h3>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Language *</label>
          <input className="form-input" placeholder="English, Spanish..."
            value={form.language} onChange={e => setForm(p => ({...p, language: e.target.value}))} />
        </div>
        <div className="form-group">
          <label className="form-label">Proficiency</label>
          <select className="form-input" value={form.level}
            onChange={e => setForm(p => ({...p, level: e.target.value}))}>
            {levels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="subsection-actions">
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" disabled={!form.language}
          onClick={() => { if(form.language) { onAdd(form); onClose(); } }}
          style={{ opacity: !form.language ? 0.5 : 1 }}>Add</button>
      </div>
    </div>
  );
};

const HobbiesForm = ({ onAdd, onClose }) => {
  const [input, setInput] = useState('');
  const SUGGESTIONS = ['Reading', 'Photography', 'Hiking', 'Cooking', 'Music', 'Gaming',
    'Travel', 'Sports', 'Painting', 'Yoga', 'Chess', 'Coding'];
  return (
    <div className="subsection-form">
      <h3 className="subsection-title">Add Hobbies & Interests</h3>
      <div className="skills-input-row">
        <input className="form-input" placeholder="e.g., Photography"
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if(e.key === 'Enter' && input.trim()) { onAdd({ name: input.trim() }); setInput(''); }}} />
        <button className="btn-primary" disabled={!input.trim()}
          onClick={() => { if(input.trim()) { onAdd({ name: input.trim() }); setInput(''); }}}
          style={{ flexShrink: 0, opacity: !input.trim() ? 0.5 : 1 }}>+ Add</button>
      </div>
      <div style={{ marginTop: 12 }}>
        <p style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Suggestions:</p>
        <div className="suggestions-grid">
          {SUGGESTIONS.map(s => (
            <button key={s} className="suggestion-btn" onClick={() => onAdd({ name: s })}>+ {s}</button>
          ))}
        </div>
      </div>
      <div className="subsection-actions">
        <button className="btn-secondary" onClick={onClose}>Done</button>
      </div>
    </div>
  );
};

const SECTIONS = [
  {
    id: 'certifications',
    icon: '🏆',
    title: 'Certifications',
    description: 'Professional certificates and licenses',
    color: '#f97316'
  },
  {
    id: 'accomplishments',
    icon: '⭐',
    title: 'Accomplishments',
    description: 'Awards, honors, and achievements',
    color: '#eab308'
  },
  {
    id: 'languages',
    icon: '🌐',
    title: 'Languages',
    description: 'Languages you speak or write',
    color: '#06b6d4'
  },
  {
    id: 'hobbies',
    icon: '🎯',
    title: 'Hobbies & Interests',
    description: 'Personal interests and activities',
    color: '#10b981'
  }
];

const OtherSections = () => {
  const {
    cvData, addCertification, deleteCertification,
    addAccomplishment, deleteAccomplishment,
    addLanguage, deleteLanguage,
    addHobby, deleteHobby,
    nextStep, prevStep
  } = useCVContext();

  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const getCount = (sectionId) => {
    switch (sectionId) {
      case 'certifications': return cvData.certifications.length;
      case 'accomplishments': return cvData.accomplishments.length;
      case 'languages': return cvData.languages.length;
      case 'hobbies': return cvData.hobbies.length;
      default: return 0;
    }
  };

  const renderForm = (sectionId) => {
    switch (sectionId) {
      case 'certifications':
        return <CertificationForm onAdd={addCertification} onClose={() => setActiveSection(null)} />;
      case 'accomplishments':
        return <AccomplishmentForm onAdd={addAccomplishment} onClose={() => setActiveSection(null)} />;
      case 'languages':
        return <LanguageForm onAdd={addLanguage} onClose={() => setActiveSection(null)} />;
      case 'hobbies':
        return <HobbiesForm onAdd={addHobby} onClose={() => setActiveSection(null)} />;
      default: return null;
    }
  };

  const renderItems = (sectionId) => {
    switch (sectionId) {
      case 'certifications':
        return cvData.certifications.map(c => (
          <div key={c.id} className="mini-item">
            <span>{c.name} {c.issuer && `— ${c.issuer}`}</span>
            <button className="mini-delete" onClick={() => deleteCertification(c.id)}>×</button>
          </div>
        ));
      case 'accomplishments':
        return cvData.accomplishments.map(a => (
          <div key={a.id} className="mini-item">
            <span>{a.title}</span>
            <button className="mini-delete" onClick={() => deleteAccomplishment(a.id)}>×</button>
          </div>
        ));
      case 'languages':
        return cvData.languages.map(l => (
          <div key={l.id} className="mini-item">
            <span>{l.language} — {l.level}</span>
            <button className="mini-delete" onClick={() => deleteLanguage(l.id)}>×</button>
          </div>
        ));
      case 'hobbies':
        return cvData.hobbies.map(h => (
          <div key={h.id} className="mini-item">
            <span>{h.name}</span>
            <button className="mini-delete" onClick={() => deleteHobby(h.id)}>×</button>
          </div>
        ));
      default: return null;
    }
  };

  return (
    <WizardLayout
      title="Other Sections"
      subtitle="Enhance your CV with additional information"
    >
      <div className="other-sections-container">
        <div className="sections-grid">
          {SECTIONS.map((section) => {
            const count = getCount(section.id);
            const isActive = activeSection === section.id;

            return (
              <div key={section.id} className={`section-block ${isActive ? 'active' : ''}`}>
                <div
                  className="section-card"
                  onClick={() => handleSectionClick(section.id)}
                >
                  <div className="section-icon-wrap" style={{
                    background: `${section.color}22`,
                    border: `1px solid ${section.color}44`
                  }}>
                    <span>{section.icon}</span>
                  </div>
                  <div className="section-info">
                    <h3 className="section-name">{section.title}</h3>
                    <p className="section-desc">{section.description}</p>
                  </div>
                  <div className="section-right">
                    {count > 0 && (
                      <span className="section-count">{count}</span>
                    )}
                    <span className={`section-chevron ${isActive ? 'open' : ''}`}>▼</span>
                  </div>
                </div>

                {isActive && (
                  <div className="section-expanded">
                    {renderItems(section.id)}
                    {renderForm(section.id)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="wizard-nav">
        <button className="btn-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button className="btn-primary" onClick={nextStep}>
          Preview CV →
        </button>
      </div>
    </WizardLayout>
  );
};

export default OtherSections;
