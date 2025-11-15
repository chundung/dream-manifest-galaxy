# Development Tutorial: Task 3 - 타이핑 연습 텍스트 표시 컴포넌트 개발

이 튜토리얼에서는 Task 3에서 구현된 타이핑 연습 텍스트 표시 컴포넌트를 단계별로 설명합니다. 실시간 문자 상태 표시, 통계 계산, 접근성 지원 등의 기능을 다룹니다.

## 1. 컴포넌트 구조 개요

Task 3의 타이핑 텍스트 표시 컴포넌트는 다음과 같은 구조를 가집니다:

```
components/typing/
├── TypingTextDisplay.jsx (메인 텍스트 표시 컴포넌트)
├── TypingStyles.js (스타일 컴포넌트 및 유틸리티)
├── TypingInput.jsx (입력 처리 컴포넌트)
├── TypingPractice.jsx (메인 타이핑 연습 컴포넌트)
```

## 2. 메인 텍스트 표시 컴포넌트 구현

`src/components/typing/TypingTextDisplay.jsx`에서 텍스트 표시 로직을 구현합니다:

```javascript
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
```

### 주요 특징

- **실시간 문자 상태 표시**: 각 문자의 정확성에 따라 색상과 스타일 변경
- **성능 최적화**: `useMemo`를 사용한 메모이제이션
- **접근성 지원**: ARIA 속성과 스크린 리더 지원
- **통계 계산**: 진행률, 정확성, 오류 수 실시간 계산

## 3. 스타일 컴포넌트 및 애니메이션

`src/components/typing/TypingStyles.js`에서 스타일과 애니메이션을 정의합니다:

```javascript
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

// Styled components
export const TextDisplayContainer = styled.div`
  // Container styles...
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
```

### 애니메이션 특징

- **shakeAnimation**: 오타 시 흔들림 효과
- **blinkAnimation**: 현재 입력 위치 깜빡임
- **부드러운 전환**: 모든 상태 변경에 트랜지션 적용

## 4. Redux 상태 관리

타이핑 상태를 관리하기 위한 Redux 슬라이스를 구현합니다:

```javascript
// src/store/slices/typingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentText: '',
  typedText: '',
  currentIndex: 0,
  charStates: [],
  errors: [],
  startTime: null,
  endTime: null,
  isActive: false,
  isCompleted: false,
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setText: (state, action) => {
      state.currentText = action.payload;
      state.charStates = new Array(action.payload.length).fill('untyped');
    },
    startTyping: (state) => {
      state.isActive = true;
      state.startTime = Date.now();
    },
    typeCharacter: (state, action) => {
      const { char, index } = action.payload;
      const expectedChar = state.currentText[index];
      
      state.typedText += char;
      state.currentIndex = index + 1;
      
      if (char === expectedChar) {
        state.charStates[index] = 'correct';
      } else {
        state.charStates[index] = 'incorrect';
        state.errors.push(index);
      }
      
      // Update current position
      if (state.currentIndex < state.currentText.length) {
        state.charStates[state.currentIndex] = 'current';
      }
    },
    completeTyping: (state) => {
      state.isActive = false;
      state.isCompleted = true;
      state.endTime = Date.now();
    },
    resetTyping: (state) => {
      return initialState;
    },
  },
});

export const { setText, startTyping, typeCharacter, completeTyping, resetTyping } = typingSlice.actions;
export default typingSlice.reducer;
```

## 5. 입력 처리 컴포넌트

`src/components/typing/TypingInput.jsx`에서 사용자 입력을 처리합니다:

```javascript
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typeCharacter, completeTyping } from '../../store/slices/typingSlice';

const TypingInput = () => {
  const dispatch = useDispatch();
  const { currentIndex, currentText, isActive } = useSelector(state => state.typing);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && isActive) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleKeyDown = (e) => {
    if (!isActive || currentIndex >= currentText.length) return;

    const char = e.key;
    
    if (char.length === 1) { // Single character
      dispatch(typeCharacter({ char, index: currentIndex }));
      
      if (currentIndex + 1 >= currentText.length) {
        dispatch(completeTyping());
      }
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      onKeyDown={handleKeyDown}
      style={{ position: 'absolute', left: '-9999px' }}
      aria-hidden="true"
    />
  );
};

export default TypingInput;
```

## 6. 메인 타이핑 연습 컴포넌트

`src/components/typing/TypingPractice.jsx`에서 모든 컴포넌트를 통합합니다:

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TypingTextDisplay from './TypingTextDisplay';
import TypingInput from './TypingInput';
import { setText, startTyping } from '../../store/slices/typingSlice';

const TypingPractice = () => {
  const dispatch = useDispatch();
  const { isActive, isCompleted } = useSelector(state => state.typing);

  useEffect(() => {
    // Load initial text
    const initialText = "안녕하세요. 한글 타이핑 연습을 시작합니다.";
    dispatch(setText(initialText));
    dispatch(startTyping());
  }, [dispatch]);

  return (
    <div>
      <TypingTextDisplay />
      <TypingInput />
      {isCompleted && <div>연습 완료!</div>}
    </div>
  );
};

export default TypingPractice;
```

## 7. 접근성 및 성능 최적화

### 접근성 기능

- **ARIA 속성**: `role`, `aria-label`, `aria-live` 등
- **키보드 네비게이션**: 탭 인덱스와 포커스 관리
- **스크린 리더 지원**: 실시간 상태 발표

### 성능 최적화

- **메모이제이션**: `useMemo`를 사용한 렌더링 최적화
- **효율적인 상태 업데이트**: 필요한 경우에만 리렌더링
- **가상화 고려**: 긴 텍스트의 경우 성능 향상

이 튜토리얼을 따라 Task 3의 타이핑 텍스트 표시 컴포넌트를 구현할 수 있습니다. 다음 단계에서는 입력 처리와 통계 계산을 확장합니다.