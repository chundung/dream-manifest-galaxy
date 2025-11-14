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
          <circle
            cx="12"
            cy="12"
            r="5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SunIcon>
        <MoonIcon
          $isVisible={isDark}
          viewBox="0 0 24 24"
          fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="currentColor"
          />
        </MoonIcon>
      </IconWrapper>
    </ThemeToggleContainer>
  );
};

export default ThemeToggle;