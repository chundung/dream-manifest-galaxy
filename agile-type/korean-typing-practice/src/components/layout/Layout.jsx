import React from 'react';
import {
  Header,
  HeaderContainer,
  Logo,
  Nav,
  NavLink,
  Footer,
  FooterContainer,
  LayoutContainer,
} from './LayoutStyles';
import ThemeToggle from '../common/ThemeToggle';

const Layout = ({ children, currentPage, onNavClick }) => {
  return (
    <LayoutContainer>
      <Header>
        <HeaderContainer>
          <Logo>한글 타이핑 연습</Logo>
          <Nav>
            <NavLink
              href="#practice"
              className={currentPage === 'practice' ? 'active' : ''}
              onClick={e => {
                e.preventDefault();
                onNavClick('practice');
              }}
            >
              연습
            </NavLink>
            <NavLink
              href="#stats"
              className={currentPage === 'stats' ? 'active' : ''}
              onClick={e => {
                e.preventDefault();
                onNavClick('stats');
              }}
            >
              통계
            </NavLink>
            <NavLink
              href="#profile"
              className={currentPage === 'profile' ? 'active' : ''}
              onClick={e => {
                e.preventDefault();
                onNavClick('profile');
              }}
            >
              프로필
            </NavLink>
            <NavLink
              href="#tutorial"
              className={currentPage === 'tutorial' ? 'active' : ''}
              onClick={e => {
                e.preventDefault();
                onNavClick('tutorial');
              }}
            >
              개발 튜토리얼
            </NavLink>
            <ThemeToggle />
          </Nav>
        </HeaderContainer>
      </Header>

      {children}

      <Footer>
        <FooterContainer>
          <p>&copy; 2024 한글 타이핑 연습. All rights reserved.</p>
        </FooterContainer>
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;
