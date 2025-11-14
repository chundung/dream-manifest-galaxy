import React from 'react';
import { Container, Title, Card } from '../components/common/UI';
import { useAppSelector } from '../store/hooks';

const TutorialPage = () => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  const task1Summary = {
    title: "태스크 1: 프로젝트 초기 설정 및 기본 스택 통합",
    description: "React.js 애플리케이션을 초기화하고, Redux Toolkit, Styled-components, Chart.js, Framer Motion 등 핵심 프론트엔드 기술 스택을 통합합니다. 개발 환경을 설정하고 빌드 프로세스를 최적화합니다.",
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

  const handleSubtaskClick = (subtaskId) => {
    // 서브태스크 상세 페이지로 이동 (상태 관리로 구현)
    console.log(`Navigate to subtask ${subtaskId}`);
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

      {/* 서브태스크 목록 */}
      <h2 style={{ marginBottom: '1.5rem', color: '#343a40' }}>서브태스크 목록</h2>
      
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