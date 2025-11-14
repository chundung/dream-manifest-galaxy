import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import PracticePage from './pages/PracticePage';
import StatsPage from './pages/StatsPage';
import ProfilePage from './pages/ProfilePage';
import { Main } from './components/layout/LayoutStyles';

function App() {
  const [currentPage, setCurrentPage] = useState('practice');

  const renderPage = () => {
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
    setCurrentPage(page);
  };

  return (
    <Layout currentPage={currentPage} onNavClick={handleNavClick}>
      <Main>{renderPage()}</Main>
    </Layout>
  );
}

export default App;
