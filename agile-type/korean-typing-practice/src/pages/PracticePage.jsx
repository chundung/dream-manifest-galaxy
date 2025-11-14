import React from 'react';
import { Container, Title, Card } from '../components/common/UI';
import {
  TypingContainer,
  TypingText,
  TypingChar,
  TypingInput,
  StatsContainer,
  StatCard,
  StatLabel,
  StatValue,
} from '../components/typing/TypingStyles';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  fetchTypingTexts,
  updateTypedText,
  startTyping,
  resetTyping,
} from '../store/slices/typingSlice';

const PracticePage = () => {
  const dispatch = useAppDispatch();
  const {
    currentText,
    typedText,
    currentIndex,
    isActive,
    isCompleted,
    wpm,
    accuracy,
    loading,
    error,
  } = useAppSelector(state => state.typing);

  React.useEffect(() => {
    // Fetch initial texts
    dispatch(fetchTypingTexts('medium'));
  }, [dispatch]);

  const handleInputChange = e => {
    const value = e.target.value;

    if (!isActive && value.length > 0) {
      dispatch(startTyping());
    }

    dispatch(updateTypedText(value));
  };

  const handleReset = () => {
    dispatch(resetTyping());
  };

  const handleNewText = () => {
    dispatch(fetchTypingTexts('medium'));
  };

  if (loading) {
    return (
      <Container>
        <Title>로딩 중...</Title>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>오류 발생</Title>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title size="3xl">타이핑 연습</Title>

      <TypingContainer>
        <TypingText>
          {currentText.split('').map((char, index) => (
            <TypingChar
              key={index}
              status={
                index < currentIndex
                  ? typedText[index] === char
                    ? 'correct'
                    : 'incorrect'
                  : 'untyped'
              }
              className={index === currentIndex ? 'current' : ''}
            >
              {char}
            </TypingChar>
          ))}
        </TypingText>

        <TypingInput
          placeholder="여기에 타이핑하세요..."
          value={typedText}
          onChange={handleInputChange}
          disabled={isCompleted}
        />

        <StatsContainer>
          <StatCard>
            <StatLabel>속도 (WPM)</StatLabel>
            <StatValue>{wpm || 0}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>정확성</StatLabel>
            <StatValue>{accuracy}%</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>진행률</StatLabel>
            <StatValue>
              {currentIndex}/{currentText.length}
            </StatValue>
          </StatCard>
        </StatsContainer>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            onClick={handleNewText}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            새 텍스트
          </button>
          <button
            onClick={handleReset}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            초기화
          </button>
        </div>
      </TypingContainer>
    </Container>
  );
};

export default PracticePage;
