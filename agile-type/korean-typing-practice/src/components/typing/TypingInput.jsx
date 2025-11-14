import React, { forwardRef, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { TypingInput } from './TypingStyles';

const TypingInputField = forwardRef((props, ref) => {
  const { theme } = useSelector(state => state.theme);
  const { 
    currentText, 
    typedText, 
    isActive, 
    isCompleted,
    currentIndex,
    errors,
  } = useSelector(state => state.typing);

  const localRef = useRef(null);
  const inputRef = ref || localRef;

  // Handle input change (controlled component)
  const handleChange = (event) => {
    // This is handled by the useTypingInput hook
    // We keep this as a no-op to prevent React warnings
  };

  // Get placeholder text based on state
  const getPlaceholder = () => {
    if (!currentText) return 'Loading text...';
    if (isCompleted) return 'Completed! Press Escape to try again.';
    if (typedText.length === 0) return 'Start typing here...';
    return 'Continue typing...';
  };

  // Get aria-label for accessibility
  const getAriaLabel = () => {
    if (!currentText) return 'Typing practice text loading';
    if (isCompleted) return 'Typing practice completed';
    return `Typing practice: ${typedText.length} of ${currentText.length} characters typed`;
  };

  // Get validation message for accessibility
  const getValidationMessage = () => {
    if (errors.length > 0) {
      return `${errors.length} error${errors.length === 1 ? '' : 's'} found`;
    }
    if (typedText.length > 0 && typedText.length === currentText.length) {
      return 'All characters typed correctly';
    }
    return null;
  };

  // Announce important changes to screen readers
  useEffect(() => {
    if (!inputRef.current) return;

    // Announce when typing is completed
    if (isCompleted) {
      const announcement = `Typing completed! ${errors.length} error${errors.length === 1 ? '' : 's'}. Press Escape to try again.`;
      const announcementElement = document.getElementById('typing-announcement');
      if (announcementElement) {
        announcementElement.textContent = announcement;
      }
    }

    // Announce significant errors
    if (errors.length > 0 && errors.length % 5 === 0) {
      const announcement = `${errors.length} errors encountered. Please slow down and focus on accuracy.`;
      const announcementElement = document.getElementById('typing-announcement');
      if (announcementElement) {
        announcementElement.textContent = announcement;
      }
    }
  }, [isCompleted, errors.length]);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (event) => {
    // Prevent default behavior for certain keys to maintain accessibility
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        // Prevent arrow keys from scrolling the page
        event.preventDefault();
        break;
      case 'PageUp':
      case 'PageDown':
        // Prevent page navigation
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <InputWrapper>
      <TypingInput
        ref={inputRef}
        value={typedText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={getPlaceholder()}
        disabled={!currentText || isCompleted}
        aria-label={getAriaLabel()}
        aria-describedby="typing-instructions typing-validation"
        aria-invalid={errors.length > 0}
        aria-errormessage={errors.length > 0 ? 'typing-validation' : undefined}
        aria-live="polite"
        aria-atomic="true"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        role="textbox"
        aria-multiline="true"
        inputMode="text"
        enterKeyHint="done"
        theme={theme}
        $isActive={isActive}
        $isCompleted={isCompleted}
        {...props}
      />
      
      <Instructions id="typing-instructions">
        Type the text displayed above. Use Backspace to correct mistakes. 
        Press Escape to reset. Ctrl+R to restart.
      </Instructions>
      
      {getValidationMessage() && (
        <ValidationMessage 
          id="typing-validation"
          hasError={errors.length > 0}
          theme={theme}
        >
          {getValidationMessage()}
        </ValidationMessage>
      )}
    </InputWrapper>
  );
});

const InputWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  position: relative;
`;

const Instructions = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 0.5rem;
  text-align: center;
  font-style: italic;
  line-height: 1.4;
`;

const ValidationMessage = styled.div`
  font-size: 0.85rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  
  ${props => props.hasError ? `
    color: ${props.theme.colors.error};
    background: ${props.theme.colors.error}10;
    border: 1px solid ${props.theme.colors.error}30;
  ` : `
    color: ${props.theme.colors.success};
    background: ${props.theme.colors.success}10;
    border: 1px solid ${props.theme.colors.success}30;
  `}
`;

TypingInputField.displayName = 'TypingInputField';

export default TypingInputField;