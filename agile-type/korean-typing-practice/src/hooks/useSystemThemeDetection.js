import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSystemTheme } from '../store/slices/themeSlice';

export const useSystemThemeDetection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 시스템 테마 변경 감지
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // 사용자가 명시적으로 테마를 설정하지 않은 경우에만 시스템 테마 따르기
      const hasUserTheme = localStorage.getItem('theme');
      if (!hasUserTheme) {
        dispatch(setSystemTheme());
      }
    };

    // 초기 설정
    handleChange(mediaQuery);

    // 이벤트 리스너 등록
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // 레거시 브라우저 지원
      mediaQuery.addListener(handleChange);
    }

    // 클린업
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [dispatch]);
};