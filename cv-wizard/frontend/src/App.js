import React from 'react';
import { CVProvider, useCVContext } from './context/CVContext';
import Homepage from './pages/Homepage';
import SelectTemplate from './pages/SelectTemplate';
import PersonalInfo from './pages/PersonalInfo';
import Experience from './pages/Experience';
import ExperienceOverview from './pages/ExperienceOverview';
import Education from './pages/Education';
import EducationOverview from './pages/EducationOverview';
import Skills from './pages/Skills';
import Summary from './pages/Summary';
import OtherSections from './pages/OtherSections';
import Preview from './pages/Preview';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Payment from './pages/Payment';
import SuccessPage from './pages/SuccessPage';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

const STEPS = [
  'homepage',       // 0
  'select-template', // 1
  'personal-info',   // 2
  'experience',      // 3
  'exp-overview',    // 4
  'education',       // 5
  'edu-overview',    // 6
  'skills',          // 7
  'summary',         // 8
  'other-sections',  // 9
  'preview',         // 10
  'signup',          // 11
  'login',           // 12
  'payment',         // 13
  'success',         // 14
  'dashboard'        // 15
];

function AppContent() {
  const { currentStep } = useCVContext();

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Homepage />;
      case 1: return <SelectTemplate />;
      case 2: return <PersonalInfo />;
      case 3: return <Experience />;
      case 4: return <ExperienceOverview />;
      case 5: return <Education />;
      case 6: return <EducationOverview />;
      case 7: return <Skills />;
      case 8: return <Summary />;
      case 9: return <OtherSections />;
      case 10: return <Preview />;
      case 11: return <SignUp />;
      case 12: return <Login />;
      case 13: return <Payment />;
      case 14: return <SuccessPage />;
      case 15: return <Dashboard />;
      default: return <Homepage />;
    }
  };

  return (
    <div className="app" style={{ minHeight: '100vh', background: '#0f172a' }}>
      {renderStep()}
    </div>
  );
}

function App() {
  return (
    <CVProvider>
      <AppContent />
    </CVProvider>
  );
}

export default App;
