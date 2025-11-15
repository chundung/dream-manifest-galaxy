# Development Tutorial: Task 1 - 프로젝트 초기 설정 및 기본 스택 통합

이 튜토리얼에서는 Task 1에서 구현된 React 애플리케이션의 초기 설정과 기본 스택 통합 방법을 단계별로 설명합니다. Redux Toolkit, Styled-components, 테마 시스템 등의 설정을 다룹니다.

## 1. 프로젝트 구조 개요

Task 1 완료 후의 프로젝트 구조는 다음과 같습니다:

```
src/
├── components/
│   ├── common/
│   │   ├── ThemeToggle.jsx
│   │   └── UI.js
│   └── layout/
│       ├── Layout.jsx
│       └── LayoutStyles.js
├── hooks/
├── pages/
├── store/
│   ├── slices/
│   │   ├── statsSlice.js
│   │   ├── themeSlice.js
│   │   ├── typingSlice.js
│   │   └── userSlice.js
│   ├── hooks.js
│   └── store.js
├── styles/
│   ├── themes/
│   │   ├── dark.js
│   │   ├── index.js
│   │   └── light.js
│   └── GlobalStyle.js
├── App.jsx
├── main.jsx
└── index.css
```

## 2. Redux Toolkit 스토어 설정

### 스토어 구성

`src/store/store.js`에서 Redux 스토어를 구성합니다:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import typingReducer from './slices/typingSlice';
import userReducer from './slices/userSlice';
import statsReducer from './slices/statsSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    typing: typingReducer,
    user: userReducer,
    stats: statsReducer,
    theme: themeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
```

### Redux 슬라이스 생성

각 기능별로 슬라이스를 생성합니다. 예를 들어 `themeSlice.js`:

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTheme: 'light',
  systemTheme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
    setSystemTheme: (state, action) => {
      state.systemTheme = action.payload;
    },
  },
});

export const { setTheme, setSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
```

### Redux Provider 설정

`src/main.jsx`에서 Provider를 설정합니다:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
```

## 3. 테마 시스템 구현

### 테마 정의

`src/styles/themes/light.js`와 `dark.js`에서 테마 객체를 정의합니다:

```javascript
// light.js
export const lightTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#212529',
    textSecondary: '#6c757d',
    border: '#dee2e6',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  // 기타 스타일 속성들...
};
```

### 테마 통합

`src/styles/themes/index.js`에서 테마를 관리합니다:

```javascript
import { lightTheme } from './light.js';
import { darkTheme } from './dark.js';

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const defaultTheme = lightTheme;

export const getTheme = (themeName) => {
  return themes[themeName] || defaultTheme;
};

export const themeNames = Object.keys(themes);
```

### Styled-components 테마 제공자

`src/components/layout/Layout.jsx`에서 ThemeProvider를 사용합니다:

```javascript
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { getTheme } from '../../styles/themes';

const Layout = ({ children, ...props }) => {
  const currentTheme = useSelector(state => state.theme.currentTheme);
  const theme = getTheme(currentTheme);

  return (
    <ThemeProvider theme={theme}>
      {/* 레이아웃 컴포넌트 */}
    </ThemeProvider>
  );
};
```

## 4. 글로벌 스타일 적용

`src/styles/GlobalStyle.js`에서 글로벌 스타일을 정의합니다:

```javascript
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  // 기타 글로벌 스타일들...
`;

export default GlobalStyle;
```

## 5. 컴포넌트 구조화

### 레이아웃 컴포넌트

`src/components/layout/Layout.jsx`에서 기본 레이아웃을 구현합니다:

```javascript
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { getTheme } from '../../styles/themes';
import GlobalStyle from '../../styles/GlobalStyle';
import { Container, Header, Main, Footer } from './LayoutStyles';

const Layout = ({ children, currentPage, onNavClick }) => {
  const currentTheme = useSelector(state => state.theme.currentTheme);
  const theme = getTheme(currentTheme);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Header>
          {/* 헤더 내용 */}
        </Header>
        <Main>
          {children}
        </Main>
        <Footer>
          {/* 푸터 내용 */}
        </Footer>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
```

### 스타일 컴포넌트

`src/components/layout/LayoutStyles.js`에서 스타일을 정의합니다:

```javascript
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.medium};
`;

export const Main = styled.main`
  flex: 1;
  padding: ${props => props.theme.spacing.large};
`;

export const Footer = styled.footer`
  background-color: ${props => props.theme.colors.surface};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.medium};
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
`;
```

## 6. 애플리케이션 라우팅

`src/App.jsx`에서 간단한 라우팅을 구현합니다:

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
      case 'stats':
        return <StatsPage />;
      // 기타 케이스들...
      default:
        return <PracticePage />;
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

## 7. 개발 환경 설정

### ESLint 및 Prettier

프로젝트 루트에 `.eslintrc.js`와 `.prettierrc.js`를 추가합니다.

### 빌드 스크립트

`package.json`에 스크립트를 추가합니다:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src --ext .js,.jsx",
    "format": "prettier --write src/**/*.{js,jsx,css}"
  }
}
```

이 튜토리얼을 따라 Task 1의 초기 설정을 완료할 수 있습니다. 다음 단계에서는 레이아웃 컴포넌트와 반응형 디자인을 구현합니다.