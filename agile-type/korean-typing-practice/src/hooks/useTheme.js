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