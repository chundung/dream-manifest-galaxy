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