---
title: "Korean Typing Practice - Task 3: 타이핑 연습 텍스트 표시 컴포넌트 개발"
description: "사용자가 화면에 표시된 한글 텍스트를 따라 입력할 수 있도록 연습 텍스트를 렌더링하는 UI 컴포넌트를 개발합니다. 입력 상태에 따라 텍스트의 각 문자를 동적으로 표시하는 기능을 포함합니다."
---

# 태스크 3: 타이핑 연습 텍스트 표시 컴포넌트 개발

## 개요

사용자가 화면에 표시된 한글 텍스트를 따라 입력할 수 있도록 연습 텍스트를 렌더링하는 UI 컴포넌트를 개발합니다. 입력 상태에 따라 텍스트의 각 문자를 동적으로 표시하는 기능을 포함합니다.

**완료 상태**: ✅ 완료됨 (5/5 서브태스크)

## 서브태스크 목록

### 서브태스크 3-1: TypingTextDisplay 컴포넌트 초기 설정 및 기본 텍스트 렌더링

**설명**: TypingTextDisplay 컴포넌트를 생성하고, 텍스트를 개별 문자로 분리하여 화면에 표시하는 기본 기능을 구현합니다.

**학습 주제**:
- React 함수형 컴포넌트 생성
- 텍스트 props 처리
- 문자열 split() 메서드 활용
- 개별 문자 렌더링
- key prop을 통한 리스트 최적화
- 기본 스타일 적용

**코드 예제**:

#### TypingTextDisplay 컴포넌트 기본 구조
```javascript
const TypingTextDisplay = ({ text }) => {
  return (
    <div className="text-display">
      {text.split('').map((char, index) => (
        <span key={index} className="character">
          {char}
        </span>
      ))}
    </div>
  );
};
```

#### 개별 문자 컴포넌트
```javascript
const CharacterSpan = styled.span\`
  display: inline-block;
  font-size: 1.2rem;
  line-height: 1.5;
  margin: 0.1rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  transition: all 0.2s ease;
\`;
```

#### 컴포넌트 사용 예시
```javascript
<TypingTextDisplay text="안녕하세요! 타이핑 연습을 시작합니다." />
```

### 서브태스크 3-2: 입력 상태 및 오류 추적을 위한 상태 관리 구현

**설명**: 사용자의 입력 상태, 현재 위치, 오류 위치 등을 추적하기 위한 React 상태 관리를 구현합니다.

**학습 주제**:
- useState 훅 활용
- 입력된 텍스트 상태 관리
- 커서 위치 추적
- 오류 위치 배열 관리
- 상태 초기화 로직
- 상태 업데이트 패턴

**코드 예제**:

#### 상태 변수 정의
```javascript
const TypingTextDisplay = ({ text }) => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorIndices, setErrorIndices] = useState([]);

  // 상태 초기화 함수
  const resetTyping = () => {
    setTypedText('');
    setCurrentIndex(0);
    setErrorIndices([]);
  };

  return (
    <div className="text-display">
      {/* 텍스트 렌더링 로직 */}
    </div>
  );
};
```

#### 입력 처리 함수
```javascript
const handleInput = (inputChar) => {
  const expectedChar = text[currentIndex];

  if (inputChar === expectedChar) {
    // 올바른 입력
    setTypedText(prev => prev + inputChar);
    setCurrentIndex(prev => prev + 1);
  } else {
    // 오류 발생
    setErrorIndices(prev => [...prev, currentIndex]);
    setTypedText(prev => prev + inputChar);
    setCurrentIndex(prev => prev + 1);
  }
};
```

#### 백스페이스 처리
```javascript
const handleBackspace = () => {
  if (typedText.length > 0) {
    const newTypedText = typedText.slice(0, -1);
    const removedIndex = typedText.length - 1;

    setTypedText(newTypedText);
    setCurrentIndex(newTypedText.length);

    // 오류 인덱스에서도 제거
    setErrorIndices(prev => prev.filter(index => index !== removedIndex));
  }
};
```

### 서브태스크 3-3: 입력 상태에 따른 문자별 동적 스타일링 로직 구현

**설명**: 입력 상태에 따라 각 문자의 색상과 스타일을 동적으로 변경하는 로직을 구현합니다.

**학습 주제**:
- 조건부 스타일링
- 문자 상태 분류 (correct, incorrect, current, untyped)
- CSS 클래스 동적 적용
- 색상 시스템 활용
- 애니메이션 효과
- 시각적 피드백

**코드 예제**:

#### 문자 상태 계산 함수
```javascript
const getCharacterState = (index) => {
  if (index < typedText.length) {
    // 이미 입력된 문자
    return typedText[index] === text[index] ? 'correct' : 'incorrect';
  } else if (index === typedText.length) {
    // 현재 입력 위치
    return 'current';
  } else {
    // 아직 입력하지 않은 문자
    return 'untyped';
  }
};
```

#### 동적 스타일링 적용
```javascript
const renderCharacters = () => {
  return text.split('').map((char, index) => {
    const state = getCharacterState(index);
    const hasError = errorIndices.includes(index);

    return (
      <CharacterSpan
        key={index}
        state={state}
        hasError={hasError}
        className={state}
      >
        {char}
      </CharacterSpan>
    );
  });
};
```

#### 스타일드 컴포넌트 상태별 스타일
```javascript
const CharacterSpan = styled.span\`
  display: inline-block;
  font-size: 1.2rem;
  line-height: 1.5;
  margin: 0.1rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  transition: all 0.2s ease;

  /* 올바른 입력 */
  &.correct {
    color: #28a745;
    background-color: rgba(40, 167, 69, 0.1);
  }

  /* 잘못된 입력 */
  &.incorrect {
    color: #dc3545;
    background-color: rgba(220, 53, 69, 0.1);
    animation: shake 0.3s ease-in-out;
  }

  /* 현재 입력 위치 */
  &.current {
    background-color: rgba(0, 123, 255, 0.2);
    border-bottom: 2px solid #007bff;
    animation: blink 1s infinite;
  }

  /* 미입력 */
  &.untyped {
    color: #6c757d;
    opacity: 0.7;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0.3; }
  }
\`;
```

### 서브태스크 3-4: 외부 입력 이벤트 처리 및 TypingTextDisplay 상태 업데이트 함수 구현

**설명**: 부모 컴포넌트로부터 입력 이벤트를 받아 상태를 업데이트하는 인터페이스를 구현합니다.

**학습 주제**:
- props를 통한 이벤트 처리
- 콜백 함수 패턴
- 부모-자식 컴포넌트 통신
- 이벤트 핸들러 바인딩
- 상태 동기화
- 컴포넌트 재사용성

**코드 예제**:

#### 컴포넌트 인터페이스 정의
```javascript
const TypingTextDisplay = ({
  text,
  typedText,
  currentIndex,
  errorIndices,
  onInput,
  onBackspace,
  onReset
}) => {
  // 상태를 props로 받아서 사용
  const renderCharacters = () => {
    return text.split('').map((char, index) => {
      let state = 'untyped';

      if (index < typedText.length) {
        state = typedText[index] === text[index] ? 'correct' : 'incorrect';
      } else if (index === typedText.length) {
        state = 'current';
      }

      const hasError = errorIndices.includes(index);

      return (
        <CharacterSpan
          key={index}
          state={state}
          hasError={hasError}
          role="text"
        >
          {char}
        </CharacterSpan>
      );
    });
  };

  return (
    <div className="text-display">
      {renderCharacters()}
    </div>
  );
};
```

#### 부모 컴포넌트에서의 사용
```javascript
const TypingPractice = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorIndices, setErrorIndices] = useState([]);

  const handleInput = (char) => {
    const expectedChar = text[currentIndex];

    if (char === expectedChar) {
      setTypedText(prev => prev + char);
      setCurrentIndex(prev => prev + 1);
    } else {
      setErrorIndices(prev => [...prev, currentIndex]);
      setTypedText(prev => prev + char);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleBackspace = () => {
    if (typedText.length > 0) {
      const newTypedText = typedText.slice(0, -1);
      setTypedText(newTypedText);
      setCurrentIndex(newTypedText.length);
      setErrorIndices(prev => prev.filter(index => index !== typedText.length - 1));
    }
  };

  return (
    <TypingTextDisplay
      text={text}
      typedText={typedText}
      currentIndex={currentIndex}
      errorIndices={errorIndices}
      onInput={handleInput}
      onBackspace={handleBackspace}
      onReset={() => {
        setTypedText('');
        setCurrentIndex(0);
        setErrorIndices([]);
      }}
    />
  );
};
```

#### 키보드 이벤트 통합
```javascript
const TypingPractice = () => {
  // ... 상태 관리

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace') {
        event.preventDefault();
        handleBackspace();
      } else if (event.key.length === 1) {
        event.preventDefault();
        handleInput(event.key);
      } else if (event.key === 'Escape') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedText, currentIndex]);

  return (
    <TypingTextDisplay
      text={text}
      typedText={typedText}
      currentIndex={currentIndex}
      errorIndices={errorIndices}
    />
  );
};
```

### 서브태스크 3-5: 컴포넌트 접근성 및 성능 최적화

**설명**: 화면 리더기 지원과 성능 최적화를 통해 컴포넌트를 개선합니다.

**학습 주제**:
- ARIA 속성 활용
- 스크린 리더기 지원
- React.memo를 통한 최적화
- useCallback을 통한 함수 메모이제이션
- 접근성 테스트
- 성능 모니터링

**코드 예제**:

#### 접근성 향상
```javascript
const TypingTextDisplay = ({ text, typedText, currentIndex, errorIndices }) => {
  const renderCharacters = useMemo(() => {
    return text.split('').map((char, index) => {
      let state = 'untyped';
      let ariaLabel = '';

      if (index < typedText.length) {
        state = typedText[index] === text[index] ? 'correct' : 'incorrect';
        ariaLabel = state === 'correct' ? '올바르게 입력됨' : '오류로 입력됨';
      } else if (index === typedText.length) {
        state = 'current';
        ariaLabel = '현재 입력 위치';
      } else {
        ariaLabel = '아직 입력하지 않음';
      }

      const hasError = errorIndices.includes(index);

      return (
        <CharacterSpan
          key={index}
          state={state}
          hasError={hasError}
          role="text"
          aria-label={ariaLabel}
        >
          {char}
        </CharacterSpan>
      );
    });
  }, [text, typedText, currentIndex, errorIndices]);

  return (
    <div
      className="text-display"
      role="textbox"
      aria-label="타이핑 연습 텍스트"
      aria-readonly="true"
    >
      {renderCharacters}
    </div>
  );
};
```

#### 성능 최적화
```javascript
const TypingTextDisplay = React.memo(({
  text,
  typedText,
  currentIndex,
  errorIndices
}) => {
  const renderCharacters = useCallback(() => {
    return text.split('').map((char, index) => {
      // ... 렌더링 로직
    });
  }, [text, typedText, currentIndex, errorIndices]);

  return (
    <div className="text-display">
      {renderCharacters()}
    </div>
  );
});
```

#### 진행률 표시 및 통계
```javascript
const TypingStats = ({ text, typedText, errorIndices }) => {
  const stats = useMemo(() => {
    const totalChars = text.length;
    const typedChars = typedText.length;
    const correctChars = typedText.split('').filter((char, index) =>
      char === text[index]
    ).length;
    const accuracy = typedChars > 0 ? (correctChars / typedChars) * 100 : 0;
    const progress = (typedChars / totalChars) * 100;

    return { accuracy, progress, correctChars, totalChars };
  }, [text, typedText]);

  return (
    <div className="stats" role="status" aria-label="타이핑 통계">
      <div>정확도: {stats.accuracy.toFixed(1)}%</div>
      <div>진행률: {stats.progress.toFixed(1)}%</div>
      <div>오류: {errorIndices.length}개</div>
    </div>
  );
};
```