import { createSlice } from '@reduxjs/toolkit';
import { getTheme, defaultTheme } from '../../styles/themes';

// 로컬 스토리지에서 테마 설정 불러오기
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
    return savedTheme;
  }
  
  // 시스템 테마 감지
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

const initialState = {
  currentTheme: getInitialTheme(),
  theme: getTheme(getInitialTheme()),
  isSystemTheme: !localStorage.getItem('theme'),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const themeName = action.payload;
      state.currentTheme = themeName;
      state.theme = getTheme(themeName);
      state.isSystemTheme = false;
      
      // 로컬 스토리지에 저장
      localStorage.setItem('theme', themeName);
    },
    toggleTheme: (state) => {
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      state.currentTheme = newTheme;
      state.theme = getTheme(newTheme);
      state.isSystemTheme = false;
      
      // 로컬 스토리지에 저장
      localStorage.setItem('theme', newTheme);
    },
    setSystemTheme: (state) => {
      const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
      
      state.currentTheme = systemTheme;
      state.theme = getTheme(systemTheme);
      state.isSystemTheme = true;
      
      // 로컬 스토리지에서 제거
      localStorage.removeItem('theme');
    },
    resetTheme: (state) => {
      state.currentTheme = 'light';
      state.theme = defaultTheme;
      state.isSystemTheme = false;
      
      // 로컬 스토리지에 저장
      localStorage.setItem('theme', 'light');
    },
  },
});

export const { setTheme, toggleTheme, setSystemTheme, resetTheme } = themeSlice.actions;

// 선택자
export const selectCurrentTheme = (state) => state.theme.currentTheme;
export const selectTheme = (state) => state.theme.theme;
export const selectIsSystemTheme = (state) => state.theme.isSystemTheme;

export default themeSlice.reducer;