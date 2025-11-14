import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateTypedText,
  startTyping,
  resetTyping,
  recordKeystroke,
  addError,
  removeError,
} from '../store/slices/typingSlice';

export const useTypingInput = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const {
    currentText,
    typedText,
    currentIndex,
    isActive,
    isCompleted,
    errors,
  } = useSelector(state => state.typing);

  // Handle individual keystrokes
  const handleKeystroke = useCallback((event) => {
    const { key, ctrlKey, metaKey, shiftKey } = event;
    
    // Prevent default for typing-related keys
    if (!ctrlKey && !metaKey && key.length === 1) {
      event.preventDefault();
    }

    // Handle backspace
    if (key === 'Backspace') {
      event.preventDefault();
      handleBackspace();
      return;
    }

    // Handle escape key to reset
    if (key === 'Escape') {
      handleReset();
      return;
    }

    // Handle tab key (prevent default behavior)
    if (key === 'Tab') {
      event.preventDefault();
      return;
    }

    // Handle regular character input
    if (key.length === 1 && !ctrlKey && !metaKey) {
      handleCharacterInput(key);
    }
  }, [currentText, typedText, currentIndex]);

  // Handle character input
  const handleCharacterInput = useCallback((character) => {
    if (!currentText || isCompleted) return;

    // Start typing if not active
    if (!isActive) {
      dispatch(startTyping());
    }

    // Calculate new typed text
    const newTypedText = typedText + character;
    
    // Check if character is correct
    const expectedChar = currentText[currentIndex];
    const isCorrect = character === expectedChar;
    
    // Record keystroke for analytics
    dispatch(recordKeystroke({
      charIndex: currentIndex,
      character,
      expected: expectedChar,
      isCorrect,
      timestamp: Date.now(),
    }));

    // Update error tracking
    if (!isCorrect && currentIndex < currentText.length) {
      dispatch(addError(currentIndex));
    } else if (isCorrect && errors.includes(currentIndex)) {
      dispatch(removeError(currentIndex));
    }

    // Update typed text
    dispatch(updateTypedText(newTypedText));
  }, [currentText, typedText, currentIndex, isActive, isCompleted, errors, dispatch]);

  // Handle backspace
  const handleBackspace = useCallback(() => {
    if (typedText.length === 0) return;

    const newTypedText = typedText.slice(0, -1);
    
    // Remove error if backspacing from incorrect character
    const removedIndex = typedText.length - 1;
    if (errors.includes(removedIndex)) {
      dispatch(removeError(removedIndex));
    }

    dispatch(updateTypedText(newTypedText));
  }, [typedText, errors, dispatch]);

  // Handle reset
  const handleReset = useCallback(() => {
    dispatch(resetTyping());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [dispatch]);

  // Handle paste events
  const handlePaste = useCallback((event) => {
    event.preventDefault();
    
    // Get pasted text
    const pastedText = event.clipboardData.getData('text');
    
    // Only allow paste if it matches the expected text
    if (pastedText === currentText.substring(currentIndex, currentIndex + pastedText.length)) {
      const newTypedText = typedText + pastedText;
      dispatch(updateTypedText(newTypedText));
    }
  }, [currentText, typedText, currentIndex, dispatch]);

  // Handle focus and blur events
  const handleFocus = useCallback(() => {
    // Auto-start typing when user focuses on input
    if (!isActive && currentText && typedText.length === 0) {
      dispatch(startTyping());
    }
  }, [isActive, currentText, typedText, dispatch]);

  const handleBlur = useCallback(() => {
    // Could implement pause logic here if needed
  }, []);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((event) => {
    // Ctrl/Cmd + R: Reset typing
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
      event.preventDefault();
      handleReset();
      return;
    }

    // Ctrl/Cmd + Enter: Submit/complete
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      // Could implement submit logic here
      return;
    }
  }, [handleReset]);

  // Setup event listeners
  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    // Add event listeners
    inputElement.addEventListener('keydown', handleKeyDown);
    inputElement.addEventListener('keypress', handleKeystroke);
    inputElement.addEventListener('paste', handlePaste);
    inputElement.addEventListener('focus', handleFocus);
    inputElement.addEventListener('blur', handleBlur);

    // Cleanup
    return () => {
      inputElement.removeEventListener('keydown', handleKeyDown);
      inputElement.removeEventListener('keypress', handleKeystroke);
      inputElement.removeEventListener('paste', handlePaste);
      inputElement.removeEventListener('focus', handleFocus);
      inputElement.removeEventListener('blur', handleBlur);
    };
  }, [handleKeystroke, handleKeyDown, handlePaste, handleFocus, handleBlur]);

  // Auto-focus when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Focus management for accessibility
  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Get typing statistics (memoized for performance)
  const getTypingStats = useCallback(() => {
    const accuracy = typedText.length > 0 
      ? Math.round(((typedText.length - errors.length) / typedText.length) * 100)
      : 0;
    const progress = currentText.length > 0 
      ? Math.round((typedText.length / currentText.length) * 100)
      : 0;

    return {
      currentText,
      typedText,
      currentIndex,
      isActive,
      isCompleted,
      errors: errors.length,
      accuracy,
      progress,
      wpm: 0, // Will be calculated from Redux state
      cpm: typedText.length, // Characters per minute
    };
  }, [currentText, typedText, currentIndex, isActive, isCompleted, errors]);

  // Debounced announcement for screen readers to avoid spam
  const announceToScreenReader = useCallback((message) => {
    if (!inputRef.current) return;
    
    // Create or get announcement element
    let announcement = document.getElementById('typing-announcement');
    if (!announcement) {
      announcement = document.createElement('div');
      announcement.id = 'typing-announcement';
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.style.position = 'absolute';
      announcement.style.left = '-10000px';
      document.body.appendChild(announcement);
    }
    
    announcement.textContent = message;
  }, []);

  // Performance monitoring
  const performanceMetrics = useMemo(() => {
    return {
      keystrokesPerSecond: 0, // Will be calculated based on keystrokes array
      averageResponseTime: 0, // Will be calculated from keystroke timestamps
      errorRate: typedText.length > 0 ? errors.length / typedText.length : 0,
    };
  }, [typedText.length, errors.length]);

  return {
    inputRef,
    handleCharacterInput,
    handleBackspace,
    handleReset,
    handlePaste,
    focusInput,
    getTypingStats,
    announceToScreenReader,
    performanceMetrics,
    // Expose current state for external components
    currentText,
    typedText,
    currentIndex,
    isActive,
    isCompleted,
    errors,
  };
};

export default useTypingInput;