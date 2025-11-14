import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypingTexts, setCurrentText } from '../store/slices/typingSlice';
import TypingTextDisplay from './TypingTextDisplay';
import TypingInput from './TypingInput';
import useTypingInput from '../../hooks/useTypingInput';
import { 
  TypingContainer,
  Controls,
  DifficultySelector,
  TextNavigation,
  RetryButton,
  DetailedStats,
  StatItem,
  LoadingMessage,
  ErrorMessage,
} from './TypingStyles';

const TypingPractice = ({ difficulty = 'medium' }) => {
  const dispatch = useDispatch();
  const { 
    currentText, 
    texts, 
    loading, 
    error, 
    difficulty: currentDifficulty 
  } = useSelector(state => state.typing);
  
  const {
    inputRef,
    handleReset,
    focusInput,
    getTypingStats,
  } = useTypingInput();

  // Fetch texts on component mount
  useEffect(() => {
    if (texts.length === 0) {
      dispatch(fetchTypingTexts(difficulty));
    }
  }, [dispatch, difficulty, texts.length]);

  // Set current text when texts are loaded
  useEffect(() => {
    if (texts.length > 0 && !currentText) {
      dispatch(setCurrentText(texts[0]));
    }
  }, [texts, currentText, dispatch]);

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty) => {
    dispatch(fetchTypingTexts(newDifficulty));
  };

  // Handle text change (next/previous text)
  const handleTextChange = (direction) => {
    if (texts.length === 0) return;
    
    const currentIndex = texts.indexOf(currentText);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % texts.length;
    } else {
      newIndex = currentIndex === 0 ? texts.length - 1 : currentIndex - 1;
    }
    
    dispatch(setCurrentText(texts[newIndex]));
  };

  // Handle retry
  const handleRetry = () => {
    handleReset();
    focusInput();
  };

  if (loading) {
    return (
      <TypingContainer>
        <LoadingMessage>Loading typing practice...</LoadingMessage>
      </TypingContainer>
    );
  }

  if (error) {
    return (
      <TypingContainer>
        <ErrorMessage>Error: {error}</ErrorMessage>
        <button onClick={() => dispatch(fetchTypingTexts(difficulty))}>
          Retry
        </button>
      </TypingContainer>
    );
  }

  const stats = getTypingStats();

  return (
    <TypingContainer>
      {/* Controls */}
      <Controls>
        <DifficultySelector>
          <label>Difficulty:</label>
          <select 
            value={currentDifficulty} 
            onChange={(e) => handleDifficultyChange(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </DifficultySelector>
        
        <TextNavigation>
          <button 
            onClick={() => handleTextChange('previous')}
            disabled={texts.length <= 1}
          >
            ← Previous
          </button>
          <span className="text-counter">
            {texts.indexOf(currentText) + 1} / {texts.length}
          </span>
          <button 
            onClick={() => handleTextChange('next')}
            disabled={texts.length <= 1}
          >
            Next →
          </button>
        </TextNavigation>
        
        <RetryButton onClick={handleRetry}>
          Reset (Esc)
        </RetryButton>
      </Controls>

      {/* Main typing area */}
      <div className="typing-area">
        <TypingTextDisplay />
        <TypingInput ref={inputRef} />
      </div>

      {/* Additional stats */}
      <DetailedStats>
        <StatItem>
          <span className="stat-label">Status:</span>
          <span className={`stat-value ${stats.isActive ? 'active' : 'inactive'}`}>
            {stats.isCompleted ? 'Completed!' : stats.isActive ? 'Typing...' : 'Ready'}
          </span>
        </StatItem>
        <StatItem>
          <span className="stat-label">Characters:</span>
          <span className="stat-value">
            {stats.currentIndex} / {currentText.length}
          </span>
        </StatItem>
        <StatItem>
          <span className="stat-label">Errors:</span>
          <span className="stat-value error">{stats.errors}</span>
        </StatItem>
      </DetailedStats>
    </TypingContainer>
  );
};

export default TypingPractice;