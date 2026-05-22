import React from 'react';
import { useCVContext } from '../context/CVContext';
import './Dashboard.css';

const Dashboard = () => {
  const { cvData, user, goToStep } = useCVContext();
  const { personalInfo } = cvData;

  const displayName = personalInfo.firstName
    ? `${personalInfo.firstName} ${personalInfo.lastName}`
    : user?.name || 'User';

  const stats = [
    { label: 'CVs Created', value: '1', icon: '📄' },
    { label: 'Downloads', value: '0', icon: '📥' },
    { label: 'Views', value: '0', icon: '👁️' },
    { label: 'Template', value: cvData.template || 'Free', icon: '🎨' }
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="dash-sidebar">
        <div className="dash-logo">
          <div className="logo-icon-sm">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span>CV<b>Wizard</b></span>
        </div>

        <nav className="dash-nav">
          <div className="dash-nav-item active">
            <span>🏠</span> Dashboard
          </div>
          <div className="dash-nav-item" onClick={() => goToStep(10)}>
            <span>📄</span> My CVs
          </div>
          <div className="dash-nav-item">
            <span>⚙️</span> Settings
          </div>
          <div className="dash-nav-item">
            <span>💬</span> Support
          </div>
        </nav>

        <div className="dash-sidebar-bottom">
          <div className="user-avatar">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <p className="user-name">{displayName}</p>
            <p className="user-plan">Pro Plan</p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="dash-main">
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Welcome back, {personalInfo.firstName || 'User'}! 👋</h1>
            <p className="dash-subtitle">Manage your professional CVs</p>
          </div>
          <button className="btn-primary" onClick={() => goToStep(0)}>
            + Create New CV
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CV List */}
        <div className="dash-section">
          <div className="section-header">
            <h2>Your CVs</h2>
            <span className="cv-count">1 CV</span>
          </div>

          <div className="cv-cards">
            <div className="cv-card">
              <div className="cv-card-preview">
                <div className="cv-mini-preview">
                  <div className="mini-header-bar"></div>
                  <div className="mini-lines-group">
                    <div className="mini-l"></div>
                    <div className="mini-l short"></div>
                    <div className="mini-l"></div>
                    <div className="mini-l medium"></div>
                  </div>
                </div>
              </div>
              <div className="cv-card-info">
                <h3 className="cv-card-name">
                  {personalInfo.firstName ? `${personalInfo.firstName} ${personalInfo.lastName}'s CV` : 'My CV'}
                </h3>
                <p className="cv-card-template">
                  {cvData.template ? cvData.template.charAt(0).toUpperCase() + cvData.template.slice(1) : 'Free'} Template
                </p>
                <p className="cv-card-date">
                  Created {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className="cv-card-actions">
                <button className="cv-action-btn primary" onClick={() => goToStep(10)}>
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Download
                </button>
                <button className="cv-action-btn" onClick={() => goToStep(2)}>
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Edit
                </button>
              </div>
            </div>

            {/* Create New CTA */}
            <div className="cv-card new-cv-card" onClick={() => goToStep(0)}>
              <div className="new-cv-content">
                <div className="new-cv-icon">
                  <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
                    <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round"/>
                  </svg>
                </div>
                <p>Create New CV</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="dash-section">
          <h2>Quick Tips</h2>
          <div className="tips-grid">
            {[
              { icon: '🎯', title: 'Tailor Your CV', desc: 'Customize your CV for each job application' },
              { icon: '📊', title: 'Use Keywords', desc: 'Include keywords from job descriptions' },
              { icon: '⚡', title: 'Keep it Concise', desc: '1-2 pages max for most positions' },
            ].map((tip, i) => (
              <div key={i} className="tip-card">
                <span className="tip-icon">{tip.icon}</span>
                <h4>{tip.title}</h4>
                <p>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
