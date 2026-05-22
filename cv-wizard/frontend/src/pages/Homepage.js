import React, { useRef } from 'react';
import { useCVContext } from '../context/CVContext';
import './Homepage.css';

const Homepage = () => {
  const { nextStep, setUploadedFile, setIsFileUploaded, setCvData } = useCVContext();
  const fileInputRef = useRef(null);

  const handleCreateNew = () => {
    nextStep();
  };

  const handleUploadCV = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setIsFileUploaded(true);
      simulateAIParsing(file);
    } else {
      alert('Please select a PDF file.');
    }
  };

  const simulateAIParsing = (file) => {
    setTimeout(() => {
      setCvData(prev => ({
        ...prev,
        personalInfo: {
          firstName: 'John',
          lastName: 'Doe',
          jobTitle: 'Software Engineer',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          location: 'New York, NY',
          website: 'johndoe.com',
          linkedin: 'linkedin.com/in/johndoe',
          summary: 'Experienced software engineer with 5+ years in full-stack development.',
          photo: null
        },
        experiences: [
          {
            id: 1,
            jobTitle: 'Senior Software Engineer',
            company: 'Tech Corp',
            location: 'New York, NY',
            startDate: '2020-01',
            endDate: '',
            current: true,
            description: 'Led development of microservices architecture, improved performance by 40%.'
          }
        ],
        educations: [
          {
            id: 1,
            degree: 'B.S. Computer Science',
            school: 'MIT',
            location: 'Cambridge, MA',
            startDate: '2015-09',
            endDate: '2019-06',
            gpa: '3.9'
          }
        ],
        skills: [
          { id: 1, name: 'JavaScript', level: 90 },
          { id: 2, name: 'React', level: 85 },
          { id: 3, name: 'Node.js', level: 80 }
        ]
      }));
      nextStep();
    }, 1000);
  };

  return (
    <div className="homepage">
      <div className="homepage-bg">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-dots"></div>
      </div>

      {/* Top Navigation */}
      <nav className="homepage-nav">
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="nav-logo-text">CV<span>Wizard</span></span>
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#templates" className="nav-link">Templates</a>
          <a href="#pricing" className="nav-link">Pricing</a>
        </div>
        <div className="nav-actions">
          <button className="nav-btn-ghost">Sign In</button>
          <button className="nav-btn-primary" onClick={handleCreateNew}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section - Two Column Layout */}
      <div className="homepage-hero">
        {/* Left Column */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>AI-Powered CV Builder</span>
          </div>

          <h1 className="hero-title">
            Create Your Professional
            <span className="gradient-text"> CV in Minutes</span>
          </h1>

          <p className="hero-subtitle">
            Build a standout CV with our AI-powered tool. Choose from 9 stunning
            templates and get hired faster.
          </p>

          <div className="hero-buttons">
            <button className="hero-btn-primary" onClick={handleCreateNew}>
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Create a New CV
            </button>
            <button className="hero-btn-secondary" onClick={handleUploadCV}>
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload Existing CV
              <span className="btn-badge">PDF</span>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">50K+</span>
              <span className="stat-label">CVs Created</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">9</span>
              <span className="stat-label">Templates</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">5 min</span>
              <span className="stat-label">To Complete</span>
            </div>
          </div>
        </div>

        {/* Right Column - CV Preview Card */}
        <div className="hero-right">
          <div className="cv-preview-card">
            <div className="cv-card-header">
              <div className="cv-card-avatar">
                <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="cv-card-info">
                <div className="cv-card-name-bar"></div>
                <div className="cv-card-title-bar"></div>
                <div className="cv-card-contact-bar"></div>
              </div>
            </div>

            <div className="cv-card-section-label">Work Experience</div>
            <div className="cv-card-exp">
              <div className="cv-card-exp-title"></div>
              <div className="cv-card-exp-company"></div>
              <div className="cv-card-exp-line"></div>
              <div className="cv-card-exp-line short"></div>
            </div>

            <div className="cv-card-section-label">Education</div>
            <div className="cv-card-exp">
              <div className="cv-card-exp-title"></div>
              <div className="cv-card-exp-company"></div>
            </div>

            <div className="cv-card-section-label">Skills</div>
            <div className="cv-card-skills">
              <div className="cv-skill-tag"></div>
              <div className="cv-skill-tag medium"></div>
              <div className="cv-skill-tag short"></div>
              <div className="cv-skill-tag medium"></div>
            </div>

            {/* Floating badges */}
            <div className="cv-float-badge badge-ai">
              <span>✨</span> AI-Powered
            </div>
            <div className="cv-float-badge badge-download">
              <span>📄</span> PDF Ready
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Homepage;
