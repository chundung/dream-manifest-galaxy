import { lightTheme } from './light.js';
import { darkTheme } from './dark.js';

// 테마 맵
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

// 기본 테마
export const defaultTheme = lightTheme;

// 테마 유틸리티 함수
export const getTheme = (themeName) => {
  return themes[themeName] || defaultTheme;
};

// 테마 이름 목록
export const themeNames = Object.keys(themes);