import React from 'react';
import './CVPreview.css';

const CVPreview = ({ cvData, spellCheck }) => {
  const { personalInfo, experiences, educations, skills, summary,
    certifications, languages, hobbies, design } = cvData;

  const accentColor = design?.color || '#7c3aed';
  const fontFamily = design?.fontStyle || 'Inter';

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="cv-document" style={{
      fontFamily: `${fontFamily}, sans-serif`,
      '--accent': accentColor,
      '--accent-light': `${accentColor}22`,
      '--accent-mid': `${accentColor}55`
    }}>
      {/* Header */}
      <div className="cv-header" style={{ borderBottomColor: accentColor }}>
        <div className="cv-header-left">
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Profile" className="cv-photo" />
          )}
          <div className="cv-name-block">
            <h1 className="cv-name" style={{ color: accentColor }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.jobTitle && (
              <p className="cv-job-title">{personalInfo.jobTitle}</p>
            )}
          </div>
        </div>
        <div className="cv-header-right">
          {personalInfo.email && (
            <div className="cv-contact-item">
              <span>📧</span> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="cv-contact-item">
              <span>📞</span> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="cv-contact-item">
              <span>📍</span> {personalInfo.location}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="cv-contact-item">
              <span>💼</span> {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.website && (
            <div className="cv-contact-item">
              <span>🌐</span> {personalInfo.website}
            </div>
          )}
        </div>
      </div>

      <div className="cv-body">
        {/* Summary */}
        {summary && (
          <div className="cv-section">
            <h2 className="cv-section-title" style={{ color: accentColor, borderBottomColor: accentColor }}>
              Professional Summary
            </h2>
            <p className="cv-summary">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="cv-section">
            <h2 className="cv-section-title" style={{ color: accentColor, borderBottomColor: accentColor }}>
              Work Experience
            </h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="cv-entry">
                <div className="cv-entry-header">
                  <div>
                    <h3 className="cv-entry-title">{exp.jobTitle}</h3>
                    <p className="cv-entry-org" style={{ color: accentColor }}>
                      {exp.company}{exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <span className="cv-entry-date">
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <p className="cv-entry-desc">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {educations.length > 0 && (
          <div className="cv-section">
            <h2 className="cv-section-title" style={{ color: accentColor, borderBottomColor: accentColor }}>
              Education
            </h2>
            {educations.map((edu) => (
              <div key={edu.id} className="cv-entry">
                <div className="cv-entry-header">
                  <div>
                    <h3 className="cv-entry-title">{edu.degree}</h3>
                    <p className="cv-entry-org" style={{ color: accentColor }}>
                      {edu.school}{edu.location && ` • ${edu.location}`}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <span className="cv-entry-date">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="cv-section">
            <h2 className="cv-section-title" style={{ color: accentColor, borderBottomColor: accentColor }}>
              Skills
            </h2>
            <div className="cv-skills-grid">
              {skills.map((skill) => (
                <div key={skill.id} className="cv-skill-tag" style={{
                  background: `${accentColor}18`,
                  borderColor: `${accentColor}44`,
                  color: accentColor
                }}>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="cv-section">
            <h2 className="cv-section-title" style={{ color: accentColor, borderBottomColor: accentColor }}>
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="cv-entry-small">
                <strong>{cert.name}</strong>
                {cert.issuer && <span> — {cert.issuer}</span>}
                {cert.date && <span className="cv-entry-date"> • {formatDate(cert.date)}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="cv-section">
            <h2 className="cv-section-title" style={{ color: accentColor, borderBottomColor: accentColor }}>
              Languages
            </h2>
            <div className="cv-languages">
              {languages.map((lang) => (
                <div key={lang.id} className="cv-language-item">
                  <span className="cv-lang-name">{lang.language}</span>
                  <span className="cv-lang-level" style={{ color: accentColor }}>{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {hobbies.length > 0 && (
          <div className="cv-section">
            <h2 className="cv-section-title" style={{ color: accentColor, borderBottomColor: accentColor }}>
              Interests
            </h2>
            <div className="cv-hobbies">
              {hobbies.map((hobby) => (
                <span key={hobby.id} className="cv-hobby-tag">
                  {hobby.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVPreview;
