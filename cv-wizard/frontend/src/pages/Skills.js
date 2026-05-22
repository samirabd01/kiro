import React, { useState } from 'react';
import WizardLayout from '../components/WizardLayout';
import { useCVContext } from '../context/CVContext';
import './Skills.css';

const SUGGESTED_SKILLS = [
  'JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'SQL',
  'Java', 'Docker', 'AWS', 'Git', 'CSS', 'HTML', 'MongoDB', 'GraphQL',
  'Vue.js', 'Angular', 'PHP', 'C++', 'Swift', 'Kotlin', 'Redux', 'REST API',
  'Agile', 'Scrum', 'Leadership', 'Communication', 'Problem Solving'
];

const Skills = () => {
  const { cvData, addSkill, deleteSkill, nextStep, prevStep } = useCVContext();
  const { skills } = cvData;
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.find(s => s.name.toLowerCase() === trimmed.toLowerCase())) {
      addSkill(trimmed);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleSuggestClick = (skill) => {
    if (!skills.find(s => s.name.toLowerCase() === skill.toLowerCase())) {
      addSkill(skill);
    }
  };

  const usedSuggestions = SUGGESTED_SKILLS.filter(
    s => !skills.find(sk => sk.name.toLowerCase() === s.toLowerCase())
  );

  return (
    <WizardLayout
      title="Skills"
      subtitle="Add your technical and soft skills"
    >
      <div className="skills-container">
        {/* Input */}
        <div className="skills-input-row">
          <input
            type="text"
            className="form-input"
            placeholder="Add a skill (e.g., React, Python, Leadership)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn-primary"
            onClick={handleAdd}
            disabled={!input.trim()}
            style={{ flexShrink: 0, opacity: !input.trim() ? 0.5 : 1 }}
          >
            + Add
          </button>
        </div>

        {/* Added Skills */}
        {skills.length > 0 && (
          <div className="skills-section">
            <h4 className="skills-section-title">Your Skills ({skills.length})</h4>
            <div className="skills-tags">
              {skills.map((skill) => (
                <div key={skill.id} className="skill-tag">
                  <span>{skill.name}</span>
                  <button
                    className="tag-remove"
                    onClick={() => deleteSkill(skill.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {usedSuggestions.length > 0 && (
          <div className="skills-section">
            <h4 className="skills-section-title">Suggested Skills</h4>
            <div className="suggestions-grid">
              {usedSuggestions.slice(0, 18).map((skill) => (
                <button
                  key={skill}
                  className="suggestion-btn"
                  onClick={() => handleSuggestClick(skill)}
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="wizard-nav">
        <button className="btn-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button className="btn-primary" onClick={nextStep}>
          Next: Summary →
        </button>
      </div>
    </WizardLayout>
  );
};

export default Skills;
