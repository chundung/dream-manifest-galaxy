import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import PracticePage from './pages/PracticePage';
import StatsPage from './pages/StatsPage';
import ProfilePage from './pages/ProfilePage';
import TutorialPage from './pages/TutorialPage';
import SubtaskDetailPage from './pages/SubtaskDetailPage';
import { Main } from './components/layout/LayoutStyles';

function App() {
  const [currentPage, setCurrentPage] = useState('practice');
  const [tutorialState, setTutorialState] = useState({ view: 'overview', subtaskId: null });

  const renderPage = () => {
    if (currentPage === 'tutorial') {
      if (tutorialState.view === 'detail' && tutorialState.subtaskId) {
        return (
          <SubtaskDetailPage
            subtaskId={tutorialState.subtaskId}
            onBack={() => setTutorialState({ view: 'overview', subtaskId: null })}
          />
        );
      }
      return <TutorialPage onSubtaskClick={(subtaskId) => setTutorialState({ view: 'detail', subtaskId })} />;
    }
    
    switch (currentPage) {
      case 'practice':
        return <PracticePage />;
      case 'stats':
        return <StatsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <PracticePage />;
    }
  };

  const handleNavClick = page => {
    if (page !== 'tutorial') {
      setTutorialState({ view: 'overview', subtaskId: null });
    }
    setCurrentPage(page);
  };

  return (
    <Layout currentPage={currentPage} onNavClick={handleNavClick}>
      <Main>{renderPage()}</Main>
    </Layout>
  );
}

export default App;
