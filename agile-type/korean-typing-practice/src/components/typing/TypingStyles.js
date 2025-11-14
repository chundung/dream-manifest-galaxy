import styled, { keyframes } from 'styled-components';

// Animations
export const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
`;

export const blinkAnimation = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
`;

export const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const slideInAnimation = keyframes`
  from { 
    opacity: 0;
    transform: translateY(-10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

// Base character styling
export const getCharacterStyles = (theme, state, hasError = false) => {
  const baseStyles = {
    position: 'relative',
    transition: 'all 0.2s ease',
    borderRadius: '2px',
    padding: '2px 1px',
    display: 'inline-block',
  };

  const stateStyles = {
    correct: {
      color: theme.colors.success,
      backgroundColor: `${theme.colors.success}15`,
      fontWeight: '500',
    },
    incorrect: {
      color: theme.colors.error,
      backgroundColor: `${theme.colors.error}20`,
      animation: `${shakeAnimation} 0.3s ease-in-out`,
      fontWeight: '600',
    },
    current: {
      backgroundColor: `${theme.colors.primary}20`,
      borderBottom: `3px solid ${theme.colors.primary}`,
      animation: `${blinkAnimation} 1s infinite`,
      fontWeight: '500',
    },
    untyped: {
      color: theme.colors.textSecondary,
      opacity: '0.7',
    },
  };

  const errorStyles = hasError ? {
    boxShadow: `0 0 0 1px ${theme.colors.error}`,
    backgroundColor: `${theme.colors.error}10`,
  } : {};

  return {
    ...baseStyles,
    ...stateStyles[state],
    ...errorStyles,
  };
};

// Text container styles
export const getTextContainerStyles = (theme) => ({
  fontFamily: "'Noto Sans KR', sans-serif",
  fontSize: '1.5rem',
  lineHeight: '2rem',
  padding: '1.5rem',
  background: theme.colors.surface,
  borderRadius: '8px',
  border: `2px solid ${theme.colors.border}`,
  boxShadow: `0 2px 8px ${theme.colors.shadow}`,
  letterSpacing: '0.05em',
  wordBreak: 'break-all',
  overflowWrap: 'break-word',
  minHeight: '120px',
  position: 'relative',
  transition: 'border-color 0.3s ease',
});

// Progress bar styles
export const getProgressBarStyles = (theme) => ({
  height: '8px',
  background: theme.colors.border,
  borderRadius: '4px',
  overflow: 'hidden',
  marginTop: '1rem',
});

export const getProgressFillStyles = (theme, progress) => ({
  height: '100%',
  background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
  transition: 'width 0.3s ease',
  borderRadius: '4px',
  width: `${progress}%`,
});

// Stats bar styles
export const getStatsBarStyles = (theme) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',
  padding: '0.75rem',
  background: theme.colors.surface,
  borderRadius: '8px',
  border: `1px solid ${theme.colors.border}`,
  fontSize: '0.9rem',
});

// Responsive styles
export const getResponsiveStyles = () => ({
  tablet: {
    textContainer: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      padding: '1rem',
      minHeight: '100px',
    },
    statsBar: {
      flexDirection: 'column',
      gap: '0.5rem',
      fontSize: '0.8rem',
    },
  },
  mobile: {
    textContainer: {
      fontSize: '1.1rem',
      lineHeight: '1.5rem',
      padding: '0.75rem',
      minHeight: '80px',
    },
  },
});

// Styled components
export const TextDisplayContainer = styled.div`
  .stats-bar {
    ${props => getStatsBarStyles(props.theme)}
  }

  .text-container {
    ${props => getTextContainerStyles(props.theme)}
    
    &:focus-within {
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
    }
  }

  .character {
    ${props => getCharacterStyles(props.theme, props.state, props.hasError)}
  }

  .progress-bar {
    ${props => getProgressBarStyles(props.theme)}
  }

  .progress-fill {
    ${props => getProgressFillStyles(props.theme, props.progress)}
  }

  @media (max-width: 768px) {
    .stats-bar {
      ${getResponsiveStyles().tablet.statsBar}
    }

    .text-container {
      ${getResponsiveStyles().tablet.textContainer}
    }
  }

  @media (max-width: 480px) {
    .text-container {
      ${getResponsiveStyles().mobile.textContainer}
    }
  }
`;

export const CharacterSpan = styled.span`
  ${props => getCharacterStyles(props.theme, props.state, props.hasError)}
`;

export const TextContainer = styled.div`
  ${props => getTextContainerStyles(props.theme)}
`;

export const ProgressBar = styled.div`
  ${props => getProgressBarStyles(props.theme)}
`;

export const ProgressFill = styled.div`
  ${props => getProgressFillStyles(props.theme, props.progress)}
`;

export const StatsBar = styled.div`
  ${props => getStatsBarStyles(props.theme)}
`;

// Legacy components for backward compatibility
export const TypingContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

export const TypingText = styled.div`
  font-family: ${({ theme }) => theme.fonts.monospace};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  letter-spacing: 0.05em;
`;

export const TypingChar = styled.span`
  position: relative;
  color: ${({ theme, status = 'untyped' }) => theme.colors.typing[status]};
  transition: ${({ theme }) => theme.transitions.fast};

  &.current {
    background-color: ${({ theme }) => theme.colors.typing.current};
    color: white;
    border-radius: 2px;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0.3;
    }
  }
`;

export const TypingInput = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.text.muted};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.monospace};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.6;
  resize: vertical;
  transition: ${({ theme }) => theme.transitions.fast};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.background};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-style: italic;
  }

  ${({ $isActive, theme }) => $isActive && `
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}15;
  `}

  ${({ $isCompleted, theme }) => $isCompleted && `
    border-color: ${theme.colors.success};
    background: ${theme.colors.success}10;
  `}
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.text.muted};
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

// Additional styles for TypingPractice component
export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const DifficultySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }

  select {
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
  }
`;

export const TextNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .text-counter {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    min-width: 60px;
    text-align: center;
  }
`;

export const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.colors.error}dd;
    transform: translateY(-1px);
  }
`;

export const DetailedStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  .stat-label {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
  }

  .stat-value {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};

    &.active {
      color: ${({ theme }) => theme.colors.primary};
    }

    &.inactive {
      color: ${({ theme }) => theme.colors.textSecondary};
    }

    &.error {
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 1rem;
`;