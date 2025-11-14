import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle.js';
import { store } from './store/store.js';
import App from './App.jsx';
import { useSelector } from 'react-redux';
import { selectTheme } from './store/slices/themeSlice';
import { useSystemThemeDetection } from './hooks/useSystemThemeDetection';

// 테마 프로바이더 컴포넌트
/* eslint-disable react-refresh/only-export-components */
const ThemeProviderWrapper = ({ children }) => {
  const theme = useSelector(selectTheme);
  
  // 시스템 테마 변경 감지
  useSystemThemeDetection();
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
    </Provider>
  </StrictMode>
);