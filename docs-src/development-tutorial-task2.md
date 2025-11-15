# Development Tutorial: Task 2 - 기본 레이아웃 및 반응형 디자인 컴포넌트 구현

이 튜토리얼에서는 Task 2에서 구현된 기본 레이아웃 컴포넌트와 반응형 디자인 시스템을 단계별로 설명합니다. 테마 토글 기능과 모바일 친화적인 UI를 다룹니다.

## 1. 레이아웃 컴포넌트 구조

Task 2의 레이아웃 컴포넌트는 다음과 같은 구조를 가집니다:

```
Layout/
├── Layout.jsx (메인 레이아웃 컴포넌트)
├── LayoutStyles.js (스타일 컴포넌트)
└── ThemeToggle.jsx (테마 전환 컴포넌트)
```

## 2. 메인 레이아웃 컴포넌트 구현

`src/components/layout/Layout.jsx`에서 기본 레이아웃을 구현합니다:

```javascript
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
```

### 주요 특징

- **헤더**: 로고와 네비게이션 메뉴를 포함
- **메인 컨텐츠 영역**: `children` prop을 통해 동적 컨텐츠 렌더링
- **푸터**: 저작권 정보 표시
- **테마 토글**: 다크/라이트 모드 전환 기능

## 3. 반응형 스타일 컴포넌트

`src/components/layout/LayoutStyles.js`에서 반응형 디자인을 구현합니다:

```javascript
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 480px) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

export const Logo = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.sm};
    width: 100%;
    justify-content: space-around;
  }
`;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover,
  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    flex: 1;
    text-align: center;
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg} 0;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md} 0;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm} 0;
  }
`;

export const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  margin-top: auto;
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;

  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
```

### 반응형 브레이크포인트

- **데스크탑**: 1200px 이상
- **태블릿**: 768px 이하
- **모바일**: 480px 이하

각 브레이크포인트에서 패딩, 폰트 크기, 레이아웃 방향 등을 조정합니다.

## 4. 테마 토글 컴포넌트

`src/components/common/ThemeToggle.jsx`에서 테마 전환 기능을 구현합니다:

```javascript
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggleContainer = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
`;

const SunIcon = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: rotate(${({ $isVisible }) => ($isVisible ? '0deg' : '180deg')});
  transition: all ${({ theme }) => theme.transitions.normal};
`;

const MoonIcon = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: rotate(${({ $isVisible }) => ($isVisible ? '0deg' : '-180deg')});
  transition: all ${({ theme }) => theme.transitions.normal};
`;

const ThemeToggle = () => {
  const { currentTheme, toggle } = useTheme();
  const isDark = currentTheme === 'dark';

  const handleToggle = () => {
    toggle();
  };

  return (
    <ThemeToggleContainer
      onClick={handleToggle}
      title={`${isDark ? '라이트 모드로' : '다크 모드로'} 전환`}
      aria-label={`현재 ${isDark ? '다크' : '라이트'} 모드. 클릭하여 ${isDark ? '라이트' : '다크'} 모드로 전환`}
    >
      <IconWrapper>
        <SunIcon
          $isVisible={!isDark}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sun icon SVG paths */}
        </SunIcon>
        <MoonIcon
          $isVisible={isDark}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Moon icon SVG paths */}
        </MoonIcon>
      </IconWrapper>
    </ThemeToggleContainer>
  );
};

export default ThemeToggle;
```

### 주요 특징

- **접근성**: ARIA 레이블과 키보드 네비게이션 지원
- **애니메이션**: 아이콘 전환 시 부드러운 회전과 투명도 애니메이션
- **호버 효과**: 버튼에 스케일과 그림자 효과

## 5. 테마 관리 훅

`src/hooks/useTheme.js`에서 테마 상태 관리를 위한 커스텀 훅을 구현합니다:

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  setTheme,
  toggleTheme,
  setSystemTheme,
  resetTheme,
  selectCurrentTheme,
  selectTheme,
  selectIsSystemTheme,
} from '../store/slices/themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectCurrentTheme);
  const theme = useSelector(selectTheme);
  const isSystemTheme = useSelector(selectIsSystemTheme);

  const changeTheme = useCallback((themeName) => {
    dispatch(setTheme(themeName));
  }, [dispatch]);

  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const useSystemTheme = useCallback(() => {
    dispatch(setSystemTheme());
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch(resetTheme());
  }, [dispatch]);

  return {
    currentTheme,
    theme,
    isSystemTheme,
    changeTheme,
    toggle,
    useSystemTheme,
    reset,
  };
};
```

## 6. 테마 슬라이스 구현

`src/store/slices/themeSlice.js`에서 Redux 슬라이스를 구현합니다:

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTheme: 'light',
  systemTheme: 'light',
  isSystemTheme: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
      state.isSystemTheme = false;
    },
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      state.isSystemTheme = false;
    },
    setSystemTheme: (state) => {
      state.currentTheme = state.systemTheme;
      state.isSystemTheme = true;
    },
    setSystemThemeValue: (state, action) => {
      state.systemTheme = action.payload;
      if (state.isSystemTheme) {
        state.currentTheme = action.payload;
      }
    },
    resetTheme: (state) => {
      state.currentTheme = 'light';
      state.isSystemTheme = false;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setSystemTheme,
  setSystemThemeValue,
  resetTheme,
} = themeSlice.actions;

// Selectors
export const selectCurrentTheme = (state) => state.theme.currentTheme;
export const selectTheme = (state) => getTheme(state.theme.currentTheme);
export const selectIsSystemTheme = (state) => state.theme.isSystemTheme;

export default themeSlice.reducer;
```

## 7. 레이아웃 컴포넌트 통합

`src/App.jsx`에서 레이아웃을 통합합니다:

```javascript
import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import PracticePage from './pages/PracticePage';
// 기타 페이지들...

function App() {
  const [currentPage, setCurrentPage] = useState('practice');

  const renderPage = () => {
    switch (currentPage) {
      case 'practice':
        return <PracticePage />;
      // 기타 케이스들...
    }
  };

  return (
    <Layout currentPage={currentPage} onNavClick={setCurrentPage}>
      <Main>{renderPage()}</Main>
    </Layout>
  );
}

export default App;
```

이 튜토리얼을 따라 Task 2의 레이아웃과 반응형 디자인을 구현할 수 있습니다. 다음 단계에서는 타이핑 텍스트 표시 컴포넌트를 개발합니다.