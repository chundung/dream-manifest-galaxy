import React from 'react';
import { Container, Title, Card } from '../components/common/UI';
import { useAppSelector } from '../store/hooks';

const TutorialPage = ({ onSubtaskClick }) => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  const task1Summary = {
    title: "태스크 1: 프로젝트 초기 설정 및 기본 스택 통합",
    description: "React.js 애플리케이션을 초기화하고, Redux Toolkit, Styled-components, Chart.js, Framer Motion 등 핵심 프론트엔드 기술 스택을 통합합니다. 개발 환경을 설정하고 빌드 프로세스를 최적화합니다.",
    totalSubtasks: 5,
    completedSubtasks: 5,
    status: "completed"
  };

  const task2Summary = {
    title: "태스크 2: 기본 레이아웃 및 반응형 디자인 컴포넌트 구현",
    description: "애플리케이션의 전반적인 UI/UX 고려사항에 따라 깔끔하고 미니멀하며 반응형인 기본 레이아웃 컴포넌트를 설계하고 구현합니다. 다크/라이트 모드 지원을 위한 토글 기능을 포함합니다.",
    totalSubtasks: 5,
    completedSubtasks: 5,
    status: "completed"
  };

  const task3Summary = {
    title: "태스크 3: 타이핑 연습 텍스트 표시 컴포넌트 개발",
    description: "사용자가 화면에 표시된 한글 텍스트를 따라 입력할 수 있도록 연습 텍스트를 렌더링하는 UI 컴포넌트를 개발합니다. 입력 상태에 따라 텍스트의 각 문자를 동적으로 표시하는 기능을 포함합니다.",
    totalSubtasks: 5,
    completedSubtasks: 5,
    status: "completed"
  };

  const subtasks = [
    {
      id: 1,
      title: "React 프로젝트 초기화 및 핵심 의존성 설치",
      description: "Vite를 사용하여 React 프로젝트를 생성하고 핵심 라이브러리를 설치합니다.",
      topics: [
        "Vite로 React 프로젝트 생성",
        "핵심 의존성 설치 (Redux Toolkit, Styled-components 등)",
        "package.json 구성 이해",
        "개발 서버 실행 및 테스트"
      ],
      codeExamples: [
        {
          title: "Vite 프로젝트 생성",
          code: `npm create vite@latest korean-typing-practice -- --template react`
        },
        {
          title: "핵심 의존성 설치",
          code: `npm install @reduxjs/toolkit react-redux styled-components framer-motion react-router-dom chart.js recharts`
        }
      ]
    },
    {
      id: 2,
      title: "Styled-components 환경 설정 및 전역 스타일 정의",
      description: "Styled-components를 설정하고 전역 스타일과 테마 시스템을 구축합니다.",
      topics: [
        "Styled-components 기본 개념",
        "ThemeProvider 설정",
        "전역 스타일 (GlobalStyle) 정의",
        "테마 객체 구성",
        "CSS-in-JS 장점 이해"
      ],
      codeExamples: [
        {
          title: "테마 객체 정의",
          code: `export const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    typing: {
      correct: '#28a745',
      incorrect: '#dc3545',
      untyped: '#6c757d',
    }
  },
  fonts: {
    primary: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    monospace: "'Fira Code', 'Courier New', monospace",
  }
};`
        },
        {
          title: "전역 스타일 정의",
          code: `export const GlobalStyle = createGlobalStyle\`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: \${({ theme }) => theme.fonts.primary};
    background-color: \${({ theme }) => theme.colors.background};
  }
\`;`
        }
      ]
    },
    {
      id: 3,
      title: "Redux Toolkit 스토어 및 기본 예제 슬라이스 구성",
      description: "Redux Toolkit을 사용하여 상태 관리 시스템을 구축합니다.",
      topics: [
        "Redux Toolkit 기본 개념",
        "configureStore로 스토어 설정",
        "createSlice로 슬라이스 생성",
        "useSelector와 useDispatch 사용법",
        "비동기 액션 (createAsyncThunk)"
      ],
      codeExamples: [
        {
          title: "스토어 설정",
          code: `export const store = configureStore({
  reducer: {
    typing: typingReducer,
    user: userReducer,
    stats: statsReducer,
  },
});`
        },
        {
          title: "슬라이스 생성",
          code: `const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    startTyping: (state) => {
      state.isActive = true;
      state.startTime = Date.now();
    },
    updateTypedText: (state, action) => {
      state.typedText = action.payload;
    },
  },
});`
        }
      ]
    },
    {
      id: 4,
      title: "기본 라우팅 구조 및 초기 레이아웃 컴포넌트 구현",
      description: "싱글 페이지 애플리케이션의 라우팅 구조와 레이아웃을 구현합니다.",
      topics: [
        "SPA 라우팅 개념",
        "상태 기반 내비게이션",
        "Layout 컴포넌트 구조",
        "Header, Footer, Main 컴포넌트",
        "반응형 내비게이션"
      ],
      codeExamples: [
        {
          title: "Layout 컴포넌트",
          code: `const Layout = ({ children, currentPage, onNavClick }) => {
  return (
    <LayoutContainer>
      <Header>
        <Nav>
          <NavLink onClick={() => onNavClick('practice')}>
            연습
          </NavLink>
        </Nav>
      </Header>
      {children}
      <Footer />
    </LayoutContainer>
  );
};`
        }
      ]
    },
    {
      id: 5,
      title: "개발 환경 최적화 및 빌드 스크립트 구성",
      description: "ESLint, Prettier를 설정하고 빌드 프로세스를 최적화합니다.",
      topics: [
        "ESLint 규칙 설정",
        "Prettier 코드 포맷팅",
        "Vite 빌드 최적화",
        "코드 분할 (Code Splitting)",
        "Terser 압축"
      ],
      codeExamples: [
        {
          title: "ESLint 설정",
          code: `export default defineConfig([
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      prettier,
    ],
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]);`
        },
        {
          title: "Vite 빌드 최적화",
          code: `export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['styled-components', 'framer-motion'],
        },
      },
    },
  },
});`
        }
      ]
    }
  ];

  const task2Subtasks = [
    {
      id: '2-1',
      title: "전역 스타일 및 테마 시스템 초기 설정",
      description: "다크/라이트 모드를 지원하는 동적 테마 시스템을 구축하고 전역 스타일을 정의합니다.",
      topics: [
        "테마 디자인 토큰 구조",
        "라이트/다크 테마 색상 팔레트",
        "Redux를 통한 테마 상태 관리",
        "localStorage 테마 영속성",
        "시스템 테마 감지 기능",
        "CSS 변수 동적 적용"
      ],
      codeExamples: [
        {
          title: "라이트 테마 정의",
          code: `export const lightTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: {
      primary: '#212529',
      secondary: '#6c757d',
      inverse: '#ffffff'
    }
  },
  fonts: {
    primary: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem'
  }
};`
        },
        {
          title: "테마 Redux 슬라이스",
          code: `const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentTheme: 'light',
    systemTheme: 'light'
  },
  reducers: {
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.currentTheme);
    },
    setSystemTheme: (state, action) => {
      state.systemTheme = action.payload;
    }
  }
});`
        },
        {
          title: "동적 테마 적용",
          code: `const GlobalStyle = createGlobalStyle\`
  body {
    background-color: \${({ theme }) => theme.colors.background};
    color: \${({ theme }) => theme.colors.text.primary};
    transition: background-color \${({ theme }) => theme.transitions.normal};
  }
\`;`
        }
      ]
    },
    {
      id: '2-2',
      title: "기본 Layout 컴포넌트 구조 구현",
      description: "시맨틱 HTML을 사용한 반응형 레이아웃 컴포넌트를 구현합니다.",
      topics: [
        "시맨틱 HTML5 구조",
        "Header, Main, Footer 컴포넌트",
        "children prop 패턴",
        "접근성 고려사항",
        "스타일드 컴포넌트 구조",
        "네비게이션 통합"
      ],
      codeExamples: [
        {
          title: "Layout 컴포넌트 구조",
          code: `const Layout = ({ children, currentPage, onNavClick }) => {
  return (
    <LayoutContainer>
      <Header>
        <HeaderContainer>
          <Logo>한글 타이핑 연습</Logo>
          <Nav>
            <NavLink href="#practice" onClick={() => onNavClick('practice')}>
              연습
            </NavLink>
            <ThemeToggle />
          </Nav>
        </HeaderContainer>
      </Header>
      {children}
      <Footer>
        <FooterContainer>
          <p>&copy; 2024 한글 타이핑 연습</p>
        </FooterContainer>
      </Footer>
    </LayoutContainer>
  );
};`
        },
        {
          title: "스타일드 컴포넌트 레이아웃",
          code: `export const LayoutContainer = styled.div\`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
\`;

export const Header = styled.header\`
  background: \${({ theme }) => theme.colors.surface};
  box-shadow: \${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
\`;`
        }
      ]
    },
    {
      id: '2-3',
      title: "반응형 디자인 및 스타일 적용",
      description: "모바일 퍼스트 반응형 디자인을 구현하고 다양한 화면 크기에 최적화합니다.",
      topics: [
        "모바일 퍼스트 디자인 원칙",
        "반응형 브레이크포인트 설정",
        "미디어 쿼리 활용",
        "유동적인 타이포그래피",
        "반응형 간격 시스템",
        "플렉스박스와 그리드 레이아웃"
      ],
      codeExamples: [
        {
          title: "반응형 헤더 컨테이너",
          code: `export const HeaderContainer = styled.div\`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 \${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 \${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
    gap: \${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 480px) {
    padding: 0 \${({ theme }) => theme.spacing.sm};
  }
\`;`
        },
        {
          title: "반응형 네비게이션",
          code: `export const Nav = styled.nav\`
  display: flex;
  gap: \${({ theme }) => theme.spacing.lg};
  align-items: center;

  @media (max-width: 768px) {
    gap: \${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: \${({ theme }) => theme.spacing.sm};
    width: 100%;
    justify-content: space-around;
  }
\`;`
        },
        {
          title: "반응형 타이포그래피",
          code: `export const Logo = styled.h1\`
  font-size: \${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: \${({ theme }) => theme.fontSizes.xl};
  }

  @media (max-width: 480px) {
    font-size: \${({ theme }) => theme.fontSizes.lg};
  }
\`;`
        }
      ]
    },
    {
      id: '2-4',
      title: "다크/라이트 모드 토글 기능 및 UI 구현",
      description: "사용자 친화적인 테마 전환 기능과 애니메이션 효과를 구현합니다.",
      topics: [
        "테마 토글 컴포넌트 디자인",
        "CSS 애니메이션과 트랜지션",
        "아이콘 기반 UI/UX",
        "접근성 고려사항",
        "상태 관리 연동",
        "사용자 인터랙션 처리"
      ],
      codeExamples: [
        {
          title: "테마 토글 컴포넌트",
          code: `const ThemeToggle = () => {
  const { currentTheme, toggle } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <ToggleButton onClick={toggle} isDark={isDark}>
      <IconContainer isDark={isDark}>
        {isDark ? '🌙' : '☀️'}
      </IconContainer>
    </ToggleButton>
  );
};`
        },
        {
          title: "테마 토글 스타일",
          code: `export const ToggleButton = styled.button\`
  background: \${({ theme, isDark }) =>
    isDark ? theme.colors.primary : theme.colors.secondary};
  border: none;
  border-radius: 2rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all \${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.05);
    box-shadow: \${({ theme }) => theme.shadows.md};
  }
\`;`
        },
        {
          title: "커스텀 훅",
          code: `export const useTheme = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectCurrentTheme);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  return { currentTheme, toggle };
};`
        }
      ]
    },
    {
      id: '2-5',
      title: "헤더 및 푸터 컴포넌트 초기 구현 및 통합",
      description: "완성된 헤더와 푸터 컴포넌트를 레이아웃에 통합하고 최종 테스트를 수행합니다.",
      topics: [
        "컴포넌트 통합 패턴",
        "레이아웃 최적화",
        "성능 고려사항",
        "브라우저 호환성",
        "사용자 테스트",
        "코드 리뷰 및 리팩토링"
      ],
      codeExamples: [
        {
          title: "통합된 레이아웃",
          code: `const App = () => {
  const [currentPage, setCurrentPage] = useState('practice');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout currentPage={currentPage} onNavClick={handleNavClick}>
      <MainContent currentPage={currentPage} />
    </Layout>
  );
};`
        },
        {
          title: "푸터 컴포넌트",
          code: `export const Footer = styled.footer\`
  background: \${({ theme }) => theme.colors.dark};
  color: \${({ theme }) => theme.colors.surface};
  padding: \${({ theme }) => theme.spacing.xl} 0;
  margin-top: auto;

  @media (max-width: 768px) {
    padding: \${({ theme }) => theme.spacing.lg} 0;
  }
\`;`
        }
      ]
    }
  ];

  const task3Subtasks = [
    {
      id: '3-1',
      title: "TypingTextDisplay 컴포넌트 초기 설정 및 기본 텍스트 렌더링",
      description: "TypingTextDisplay 컴포넌트를 생성하고, 텍스트를 개별 문자로 분리하여 화면에 표시하는 기본 기능을 구현합니다.",
      topics: [
        "React 함수형 컴포넌트 생성",
        "텍스트 props 처리",
        "문자열 split() 메서드 활용",
        "개별 문자 렌더링",
        "key prop을 통한 리스트 최적화",
        "기본 스타일 적용"
      ],
      codeExamples: [
        {
          title: "TypingTextDisplay 컴포넌트 기본 구조",
          code: `const TypingTextDisplay = ({ text }) => {
  return (
    <div className="text-display">
      {text.split('').map((char, index) => (
        <span key={index} className="character">
          {char}
        </span>
      ))}
    </div>
  );
};`
        },
        {
          title: "개별 문자 컴포넌트",
          code: `const CharacterSpan = styled.span\`
  display: inline-block;
  font-size: 1.2rem;
  line-height: 1.5;
  margin: 0.1rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  transition: all 0.2s ease;
\`;`
        },
        {
          title: "컴포넌트 사용 예시",
          code: `<TypingTextDisplay text="안녕하세요! 타이핑 연습을 시작합니다." />`
        }
      ]
    },
    {
      id: '3-2',
      title: "입력 상태 및 오류 추적을 위한 상태 관리 구현",
      description: "사용자의 입력 상태, 현재 위치, 오류 위치 등을 추적하기 위한 React 상태 관리를 구현합니다.",
      topics: [
        "useState 훅 활용",
        "입력된 텍스트 상태 관리",
        "커서 위치 추적",
        "오류 위치 배열 관리",
        "상태 초기화 로직",
        "상태 업데이트 패턴"
      ],
      codeExamples: [
        {
          title: "상태 변수 정의",
          code: `const TypingTextDisplay = ({ text }) => {
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
};`
        },
        {
          title: "입력 처리 함수",
          code: `const handleInput = (inputChar) => {
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
};`
        },
        {
          title: "백스페이스 처리",
          code: `const handleBackspace = () => {
  if (typedText.length > 0) {
    const newTypedText = typedText.slice(0, -1);
    const removedIndex = typedText.length - 1;

    setTypedText(newTypedText);
    setCurrentIndex(newTypedText.length);

    // 오류 인덱스에서도 제거
    setErrorIndices(prev => prev.filter(index => index !== removedIndex));
  }
};`
        }
      ]
    },
    {
      id: '3-3',
      title: "입력 상태에 따른 문자별 동적 스타일링 로직 구현",
      description: "입력 상태에 따라 각 문자의 색상과 스타일을 동적으로 변경하는 로직을 구현합니다.",
      topics: [
        "조건부 스타일링",
        "문자 상태 분류 (correct, incorrect, current, untyped)",
        "CSS 클래스 동적 적용",
        "색상 시스템 활용",
        "애니메이션 효과",
        "시각적 피드백"
      ],
      codeExamples: [
        {
          title: "문자 상태 계산 함수",
          code: `const getCharacterState = (index) => {
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
};`
        },
        {
          title: "동적 스타일링 적용",
          code: `const renderCharacters = () => {
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
};`
        },
        {
          title: "스타일드 컴포넌트 상태별 스타일",
          code: `const CharacterSpan = styled.span\`
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
\`;`
        }
      ]
    },
    {
      id: '3-4',
      title: "외부 입력 이벤트 처리 및 TypingTextDisplay 상태 업데이트 함수 구현",
      description: "부모 컴포넌트로부터 입력 이벤트를 받아 상태를 업데이트하는 인터페이스를 구현합니다.",
      topics: [
        "props를 통한 이벤트 처리",
        "콜백 함수 패턴",
        "부모-자식 컴포넌트 통신",
        "이벤트 핸들러 바인딩",
        "상태 동기화",
        "컴포넌트 재사용성"
      ],
      codeExamples: [
        {
          title: "컴포넌트 인터페이스 정의",
          code: `const TypingTextDisplay = ({
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
};`
        },
        {
          title: "부모 컴포넌트에서의 사용",
          code: `const TypingPractice = () => {
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
};`
        },
        {
          title: "키보드 이벤트 통합",
          code: `const TypingPractice = () => {
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
};`
        }
      ]
    },
    {
      id: '3-5',
      title: "컴포넌트 접근성 및 성능 최적화",
      description: "화면 리더기 지원과 성능 최적화를 통해 컴포넌트를 개선합니다.",
      topics: [
        "ARIA 속성 활용",
        "스크린 리더기 지원",
        "React.memo를 통한 최적화",
        "useCallback을 통한 함수 메모이제이션",
        "접근성 테스트",
        "성능 모니터링"
      ],
      codeExamples: [
        {
          title: "접근성 향상",
          code: `const TypingTextDisplay = ({ text, typedText, currentIndex, errorIndices }) => {
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
};`
        },
        {
          title: "성능 최적화",
          code: `const TypingTextDisplay = React.memo(({
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
});`
        },
        {
          title: "진행률 표시 및 통계",
          code: `const TypingStats = ({ text, typedText, errorIndices }) => {
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
};`
        }
      ]
    }
  ];

  const handleSubtaskClick = (subtaskId) => {
    // 서브태스크 상세 페이지로 이동
    onSubtaskClick(subtaskId.toString());
  };

  return (
    <Container>
      <Title size="3xl">개발 튜토리얼</Title>
      
      {/* 태스크 1 요약 */}
      <Card style={{ marginBottom: '2rem', padding: '2rem' }}>
        <h2 style={{ color: '#007bff', marginBottom: '1rem' }}>
          {task1Summary.title}
        </h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
          {task1Summary.description}
        </p>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <span style={{ 
            background: '#28a745', 
            color: 'white', 
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.9rem'
          }}>
            ✅ 완료됨
          </span>
          <span>
            진행률: {task1Summary.completedSubtasks}/{task1Summary.totalSubtasks} 서브태스크
          </span>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>5</div>
            <div style={{ color: '#6c757d' }}>완료된 서브태스크</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>100%</div>
            <div style={{ color: '#6c757d' }}>완료율</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#17a2b8' }}>29</div>
            <div style={{ color: '#6c757d' }}>생성된 파일</div>
          </div>
        </div>

        <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
          이 튜토리얼에서는 태스크 1의 각 서브태스크를 상세히 학습할 수 있습니다. 아래에서 원하는 서브태스크를 선택하세요.
        </p>
      </Card>

      {/* 태스크 2 요약 */}
      <Card style={{ marginBottom: '2rem', padding: '2rem' }}>
        <h2 style={{ color: '#17a2b8', marginBottom: '1rem' }}>
          {task2Summary.title}
        </h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
          {task2Summary.description}
        </p>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <span style={{ 
            background: '#28a745', 
            color: 'white', 
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.9rem'
          }}>
            ✅ 완료됨
          </span>
          <span>
            진행률: {task2Summary.completedSubtasks}/{task2Summary.totalSubtasks} 서브태스크
          </span>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#17a2b8' }}>5</div>
            <div style={{ color: '#6c757d' }}>완료된 서브태스크</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>100%</div>
            <div style={{ color: '#6c757d' }}>완료율</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>12</div>
            <div style={{ color: '#6c757d' }}>생성된 파일</div>
          </div>
        </div>

        <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
          태스크 2에서는 테마 시스템, 반응형 디자인, 레이아웃 컴포넌트를 학습할 수 있습니다. 아래에서 원하는 서브태스크를 선택하세요.
        </p>
      </Card>

      {/* 태스크 1 서브태스크 목록 */}
      <h2 style={{ marginBottom: '1.5rem', color: '#343a40' }}>태스크 1: 서브태스크 목록</h2>
      
      {subtasks.map((subtask) => (
        <Card 
          key={subtask.id} 
          style={{ 
            marginBottom: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '2px solid transparent'
          }}
          onClick={() => handleSubtaskClick(subtask.id)}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#007bff';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,123,255,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h3 style={{ color: '#007bff', margin: 0 }}>
              서브태스크 {subtask.id}: {subtask.title}
            </h3>
            <span style={{ 
              background: '#28a745', 
              color: 'white', 
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.8rem'
            }}>
              완료됨
            </span>
          </div>
          
          <p style={{ lineHeight: '1.6', marginBottom: '1rem', color: '#495057' }}>
            {subtask.description}
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ color: '#343a40', marginBottom: '0.5rem' }}>학습 주제:</h4>
            <ul style={{ paddingLeft: '1.5rem', color: '#6c757d' }}>
              {subtask.topics.map((topic, index) => (
                <li key={index} style={{ marginBottom: '0.25rem' }}>{topic}</li>
              ))}
            </ul>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            color: '#007bff',
            fontWeight: '500'
          }}>
            <span>{subtask.codeExamples.length}개 코드 예제</span>
            <span>→ 상세 보기</span>
          </div>
        </Card>
      ))}

       {/* 태스크 2 서브태스크 목록 */}
       <h2 style={{ marginBottom: '1.5rem', color: '#343a40', marginTop: '2rem' }}>태스크 2: 서브태스크 목록</h2>

       {task2Subtasks.map((subtask) => (
         <Card
           key={subtask.id}
           style={{
             marginBottom: '1.5rem',
             cursor: 'pointer',
             transition: 'all 0.3s ease',
             border: '2px solid transparent'
           }}
           onClick={() => handleSubtaskClick(subtask.id)}
           onMouseEnter={(e) => {
             e.currentTarget.style.borderColor = '#17a2b8';
             e.currentTarget.style.transform = 'translateY(-2px)';
             e.currentTarget.style.boxShadow = '0 4px 12px rgba(23,162,184,0.15)';
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.borderColor = 'transparent';
             e.currentTarget.style.transform = 'translateY(0)';
             e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
           }}
         >
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
             <h3 style={{ color: '#17a2b8', margin: 0 }}>
               서브태스크 {subtask.id}: {subtask.title}
             </h3>
             <span style={{
               background: '#28a745',
               color: 'white',
               padding: '0.25rem 0.5rem',
               borderRadius: '0.25rem',
               fontSize: '0.8rem'
             }}>
               완료됨
             </span>
           </div>

           <p style={{ lineHeight: '1.6', marginBottom: '1rem', color: '#495057' }}>
             {subtask.description}
           </p>

           <div style={{ marginBottom: '1rem' }}>
             <h4 style={{ color: '#343a40', marginBottom: '0.5rem' }}>학습 주제:</h4>
             <ul style={{ paddingLeft: '1.5rem', color: '#6c757d' }}>
               {subtask.topics.map((topic, index) => (
                 <li key={index} style={{ marginBottom: '0.25rem' }}>{topic}</li>
               ))}
             </ul>
           </div>

           <div style={{
             display: 'flex',
             justifyContent: 'space-between',
             alignItems: 'center',
             color: '#17a2b8',
             fontWeight: '500'
           }}>
             <span>{subtask.codeExamples.length}개 코드 예제</span>
             <span>→ 상세 보기</span>
           </div>
         </Card>
       ))}

       {/* 태스크 3 요약 */}
       <Card style={{ marginBottom: '2rem', padding: '2rem', marginTop: '2rem' }}>
         <h2 style={{ color: '#28a745', marginBottom: '1rem' }}>
           {task3Summary.title}
         </h2>
         <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
           {task3Summary.description}
         </p>

         <div style={{
           display: 'flex',
           alignItems: 'center',
           gap: '1rem',
           marginBottom: '1.5rem'
         }}>
           <span style={{
             background: '#28a745',
             color: 'white',
             padding: '0.25rem 0.75rem',
             borderRadius: '1rem',
             fontSize: '0.9rem'
           }}>
             ✅ 완료됨
           </span>
           <span>
             진행률: {task3Summary.completedSubtasks}/{task3Summary.totalSubtasks} 서브태스크
           </span>
         </div>

         <div style={{
           display: 'grid',
           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
           gap: '1rem',
           marginBottom: '1.5rem'
         }}>
           <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem' }}>
             <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>5</div>
             <div style={{ color: '#6c757d' }}>완료된 서브태스크</div>
           </div>
           <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem' }}>
             <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>100%</div>
             <div style={{ color: '#6c757d' }}>완료율</div>
           </div>
           <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem' }}>
             <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>3</div>
             <div style={{ color: '#6c757d' }}>생성된 파일</div>
           </div>
         </div>

         <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
           태스크 3에서는 타이핑 텍스트 표시 컴포넌트를 개발하며, 입력 상태에 따른 동적 스타일링과 상태 관리를 학습할 수 있습니다. 아래에서 원하는 서브태스크를 선택하세요.
         </p>
       </Card>

       {/* 태스크 3 서브태스크 목록 */}
       <h2 style={{ marginBottom: '1.5rem', color: '#343a40', marginTop: '2rem' }}>태스크 3: 서브태스크 목록</h2>

       {task3Subtasks.map((subtask) => (
         <Card
           key={subtask.id}
           style={{
             marginBottom: '1.5rem',
             cursor: 'pointer',
             transition: 'all 0.3s ease',
             border: '2px solid transparent'
           }}
           onClick={() => handleSubtaskClick(subtask.id)}
           onMouseEnter={(e) => {
             e.currentTarget.style.borderColor = '#28a745';
             e.currentTarget.style.transform = 'translateY(-2px)';
             e.currentTarget.style.boxShadow = '0 4px 12px rgba(40,167,69,0.15)';
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.borderColor = 'transparent';
             e.currentTarget.style.transform = 'translateY(0)';
             e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
           }}
         >
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
             <h3 style={{ color: '#28a745', margin: 0 }}>
               서브태스크 {subtask.id}: {subtask.title}
             </h3>
             <span style={{
               background: '#28a745',
               color: 'white',
               padding: '0.25rem 0.5rem',
               borderRadius: '0.25rem',
               fontSize: '0.8rem'
             }}>
               완료됨
             </span>
           </div>

           <p style={{ lineHeight: '1.6', marginBottom: '1rem', color: '#495057' }}>
             {subtask.description}
           </p>

           <div style={{ marginBottom: '1rem' }}>
             <h4 style={{ color: '#343a40', marginBottom: '0.5rem' }}>학습 주제:</h4>
             <ul style={{ paddingLeft: '1.5rem', color: '#6c757d' }}>
               {subtask.topics.map((topic, index) => (
                 <li key={index} style={{ marginBottom: '0.25rem' }}>{topic}</li>
               ))}
             </ul>
           </div>

           <div style={{
             display: 'flex',
             justifyContent: 'space-between',
             alignItems: 'center',
             color: '#28a745',
             fontWeight: '500'
           }}>
             <span>{subtask.codeExamples.length}개 코드 예제</span>
             <span>→ 상세 보기</span>
           </div>
         </Card>
       ))}

      {!isLoggedIn && (
        <Card style={{ 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7',
          textAlign: 'center',
          padding: '1.5rem'
        }}>
          <h3 style={{ color: '#856404', marginBottom: '1rem' }}>💡 학습 팁</h3>
          <p style={{ color: '#856404', lineHeight: '1.6' }}>
            로그인하면 학습 진행 상황을 저장하고, 각 서브태스크의 완료 상태를 추적할 수 있습니다.
            프로필 페이지에서 로그인하여 개인화된 학습 경험을 활용하세요.
          </p>
        </Card>
      )}
    </Container>
  );
};

export default TutorialPage;