import React, { createContext, useContext, useState } from 'react';

const CVContext = createContext();

export const useCVContext = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCVContext must be used within CVProvider');
  }
  return context;
};

export const CVProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const [cvData, setCvData] = useState({
    template: null,
    personalInfo: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      summary: '',
      photo: null
    },
    experiences: [],
    educations: [],
    skills: [],
    summary: '',
    certifications: [],
    accomplishments: [],
    languages: [],
    hobbies: [],
    // Design settings
    design: {
      layout: 'standard',
      color: '#7c3aed',
      language: 'English',
      fontStyle: 'Inter'
    }
  });

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateCVData = (section, data) => {
    setCvData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = (experience) => {
    setCvData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { ...experience, id: Date.now() }]
    }));
  };

  const updateExperience = (id, data) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, ...data } : exp
      )
    }));
  };

  const deleteExperience = (id) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = (education) => {
    setCvData(prev => ({
      ...prev,
      educations: [...prev.educations, { ...education, id: Date.now() }]
    }));
  };

  const updateEducation = (id, data) => {
    setCvData(prev => ({
      ...prev,
      educations: prev.educations.map(edu =>
        edu.id === id ? { ...edu, ...data } : edu
      )
    }));
  };

  const deleteEducation = (id) => {
    setCvData(prev => ({
      ...prev,
      educations: prev.educations.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = (skill) => {
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: skill, level: 80, id: Date.now() }]
    }));
  };

  const deleteSkill = (id) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  const addCertification = (cert) => {
    setCvData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { ...cert, id: Date.now() }]
    }));
  };

  const deleteCertification = (id) => {
    setCvData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  const addAccomplishment = (acc) => {
    setCvData(prev => ({
      ...prev,
      accomplishments: [...prev.accomplishments, { ...acc, id: Date.now() }]
    }));
  };

  const deleteAccomplishment = (id) => {
    setCvData(prev => ({
      ...prev,
      accomplishments: prev.accomplishments.filter(a => a.id !== id)
    }));
  };

  const addLanguage = (lang) => {
    setCvData(prev => ({
      ...prev,
      languages: [...prev.languages, { ...lang, id: Date.now() }]
    }));
  };

  const deleteLanguage = (id) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l.id !== id)
    }));
  };

  const addHobby = (hobby) => {
    setCvData(prev => ({
      ...prev,
      hobbies: [...prev.hobbies, { name: hobby, id: Date.now() }]
    }));
  };

  const deleteHobby = (id) => {
    setCvData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(h => h.id !== id)
    }));
  };

  const updateDesign = (field, value) => {
    setCvData(prev => ({
      ...prev,
      design: {
        ...prev.design,
        [field]: value
      }
    }));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  return (
    <CVContext.Provider value={{
      currentStep,
      setCurrentStep,
      cvData,
      setCvData,
      updateCVData,
      updatePersonalInfo,
      addExperience,
      updateExperience,
      deleteExperience,
      addEducation,
      updateEducation,
      deleteEducation,
      addSkill,
      deleteSkill,
      addCertification,
      deleteCertification,
      addAccomplishment,
      deleteAccomplishment,
      addLanguage,
      deleteLanguage,
      addHobby,
      deleteHobby,
      updateDesign,
      goToStep,
      nextStep,
      prevStep,
      uploadedFile,
      setUploadedFile,
      isFileUploaded,
      setIsFileUploaded,
      user,
      setUser,
      isAuthenticated,
      setIsAuthenticated
    }}>
      {children}
    </CVContext.Provider>
  );
};
