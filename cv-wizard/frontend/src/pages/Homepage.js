import React, { useRef } from 'react';
import { useCVContext } from '../context/CVContext';
import './Homepage.css';

const Homepage = () => {
  const { nextStep, setUploadedFile, setIsFileUploaded, setCvData } = useCVContext();
  const fileInputRef = useRef(null);

  const handleCreateNew = () => {
    nextStep(); // go to step 1: Select Template
  };

  const handleUploadCV = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setIsFileUploaded(true);
      // In real app: send to backend for AI parsing
      // For now, simulate AI parsing with placeholder data
      simulateAIParsing(file);
    } else {
      alert('Please select a PDF file.');
    }
  };

  const simulateAIParsing = (file) => {
    // Simulate AI parsing - in production this would call the backend
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
      nextStep(); // go to step 1
    }, 1000);
  };

  return (
    <div className="homepage">
      <div className="homepage-bg">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-dots"></div>
      </div>

      <div className="homepage-content">
        {/* Logo */}
        <div className="homepage-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">CV<span>Wizard</span></span>
        </div>

        {/* Headline */}
        <div className="homepage-hero">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            AI-Powered CV Builder
          </div>
          <h1 className="hero-title">
            Create Your Professional
            <br />
            <span className="gradient-text">CV in Minutes</span>
          </h1>
          <p className="hero-subtitle">
            Choose from 9 stunning templates and let our AI help you craft
            the perfect resume that gets you hired.
          </p>
        </div>

        {/* Action Cards */}
        <div className="homepage-actions">
          <div className="action-card" onClick={handleCreateNew}>
            <div className="action-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="action-content">
              <h3>Create a New CV</h3>
              <p>Start from scratch and build your perfect CV step by step</p>
            </div>
            <div className="action-arrow">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className="action-card action-card-outline" onClick={handleUploadCV}>
            <div className="action-icon action-icon-outline">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="action-content">
              <h3>Upload an Existing CV</h3>
              <p>Import your PDF and let AI extract and improve your information</p>
            </div>
            <div className="action-tag">PDF</div>
          </div>
        </div>

        {/* Features */}
        <div className="homepage-features">
          <div className="feature-item">
            <div className="feature-icon">✨</div>
            <span>9 Templates</span>
          </div>
          <div className="feature-divider"></div>
          <div className="feature-item">
            <div className="feature-icon">🤖</div>
            <span>AI-Powered</span>
          </div>
          <div className="feature-divider"></div>
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <span>5 Min Setup</span>
          </div>
          <div className="feature-divider"></div>
          <div className="feature-item">
            <div className="feature-icon">📄</div>
            <span>PDF Export</span>
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
