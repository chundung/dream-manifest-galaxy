import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  TextDisplayContainer,
  CharacterSpan,
  StatsBar,
  TextContainer,
  ProgressBar,
  ProgressFill,
} from './TypingStyles';

const TypingTextDisplay = () => {
  const { theme } = useSelector(state => state.theme);
  const { 
    currentText, 
    typedText, 
    currentIndex, 
    charStates, 
    errors 
  } = useSelector(state => state.typing);

  // Memoize character rendering for performance
  const renderCharacters = useMemo(() => {
    if (!currentText) return null;

    return currentText.split('').map((char, index) => {
      // Get character state from Redux, fallback to calculation
      let charState = charStates[index] || 'untyped';
      
      // Fallback calculation if charStates is not populated
      if (!charStates.length) {
        if (index < typedText.length) {
          charState = typedText[index] === char ? 'correct' : 'incorrect';
        } else if (index === typedText.length) {
          charState = 'current';
        } else {
          charState = 'untyped';
        }
      }

      const hasError = errors.includes(index);
      const isCurrent = index === currentIndex;
      
      // Enhanced state determination with additional context
      let enhancedState = charState;
      if (isCurrent && charState === 'untyped') {
        enhancedState = 'current';
      }

      return (
        <CharacterSpan
          key={index}
          theme={theme}
          state={enhancedState}
          hasError={hasError}
          data-index={index}
          data-state={enhancedState}
          data-error={hasError}
          aria-label={`Character ${index + 1}: ${char} (${enhancedState})`}
          role="text"
        >
          {char}
        </CharacterSpan>
      );
    });
  }, [currentText, typedText, currentIndex, charStates, errors, theme]);

  // Memoize stats calculation for performance
  const enhancedStats = useMemo(() => {
    const total = currentText.length;
    const typed = typedText.length;
    const correct = charStates.filter(state => state === 'correct').length;
    const incorrect = charStates.filter(state => state === 'incorrect').length;
    const untyped = charStates.filter(state => state === 'untyped').length;
    const current = charStates.filter(state => state === 'current').length;
    const progress = total > 0 ? Math.round((typed / total) * 100) : 0;
    const accuracy = typed > 0 ? Math.round((correct / typed) * 100) : 0;

    return { 
      total, 
      typed, 
      correct, 
      incorrect, 
      untyped, 
      current, 
      progress, 
      accuracy,
      wpm: 0, // Will be calculated from Redux state
    };
  }, [currentText.length, typedText.length, charStates]);

  // Accessibility announcement for screen readers
  const getAccessibilityAnnouncement = useCallback(() => {
    if (!currentText) return 'No text loaded';
    
    const progress = enhancedStats.progress;
    const accuracy = enhancedStats.accuracy;
    const errors = enhancedStats.incorrect;
    
    if (enhancedStats.total === enhancedStats.typed) {
      return `Typing completed. Accuracy: ${accuracy}%. Errors: ${errors}.`;
    }
    
    return `Progress: ${progress}%. Accuracy: ${accuracy}%. Errors: ${errors}. Current position: character ${currentIndex + 1} of ${currentText.length}.`;
  }, [currentText, enhancedStats, currentIndex]);

  return (
    <TextDisplayContainer theme={theme}>
      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        style={{ position: 'absolute', left: '-10000px' }}
      >
        {getAccessibilityAnnouncement()}
      </div>

      {/* Stats bar with accessibility */}
      <StatsBar 
        theme={theme}
        role="status"
        aria-label="Typing statistics"
      >
        <div className="stat">
          <span className="label">Progress:</span>
          <span className="value" aria-label={`Progress: ${enhancedStats.progress} percent`}>
            {enhancedStats.progress}%
          </span>
        </div>
        <div className="stat">
          <span className="label">Accuracy:</span>
          <span 
            className="value correct" 
            aria-label={`Accuracy: ${enhancedStats.accuracy} percent`}
          >
            {enhancedStats.accuracy}%
          </span>
        </div>
        <div className="stat">
          <span className="label">Correct:</span>
          <span 
            className="value correct" 
            aria-label={`${enhancedStats.correct} correct characters`}
          >
            {enhancedStats.correct}
          </span>
        </div>
        <div className="stat">
          <span className="label">Errors:</span>
          <span 
            className="value incorrect" 
            aria-label={`${enhancedStats.incorrect} errors`}
          >
            {enhancedStats.incorrect}
          </span>
        </div>
      </StatsBar>
      
      {/* Main text display with enhanced accessibility */}
      <TextContainer 
        theme={theme}
        role="textbox"
        aria-multiline="true"
        aria-label="Typing practice text"
        tabIndex={0}
      >
        {renderCharacters}
      </TextContainer>
      
      {/* Progress bar with accessibility */}
      <ProgressBar 
        theme={theme}
        role="progressbar"
        aria-valuenow={enhancedStats.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Typing progress: ${enhancedStats.progress} percent`}
      >
        <ProgressFill 
          theme={theme} 
          progress={enhancedStats.progress}
        />
      </ProgressBar>
    </TextDisplayContainer>
  );
};

export default TypingTextDisplay;