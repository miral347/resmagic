import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ResumeBuilder } from './components/ResumeBuilder';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'builder'>('home');

  const handleGetStarted = () => {
    setCurrentPage('builder');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  return (
    <>
      {currentPage === 'home' ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <ResumeBuilder onBackToHome={handleBackToHome} />
      )}
    </>
  );
}

export default App;