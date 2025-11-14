import React, { useState } from 'react';
import { Container, Title, Card, Button } from '../components/common/UI';
import { useAppSelector } from '../store/hooks';

const SubtaskDetailPage = ({ subtaskId, onBack }) => {
  const { isLoggedIn } = useAppSelector(state => state.user);
  const [activeTab, setActiveTab] = useState('overview');

  const subtaskData = {
    1: {
      title: "React 프로젝트 초기화 및 핵심 의존성 설치",
      description: "Vite를 사용하여 React 프로젝트를 생성하고 핵심 라이브러리를 설치합니다. 현대적인 프론트엔드 개발 환경을 구축하는 첫 단계입니다.",
      objectives: [
        "Vite로 React 프로젝트 생성하기",
        "핵심 프론트엔드 라이브러리 설치 및 이해하기",
        "package.json 구조 파악하기",
        "개발 서버 실행 및 기본 동작 확인하기"
      ],
      prerequisites: [
        "Node.js 16+ 설치",
        "npm 또는 yarn 기본 사용법",
        "터미널 명령어 기본 지식"
      ],
      steps: [
        {
          title: "1. Vite 프로젝트 생성",
          content: "Vite는 빠른 개발 서버와 빌드 도구를 제공하는 현대적인 프론트엔드 빌드 툴입니다.",
          command: "npm create vite@latest korean-typing-practice -- --template react",
          explanation: "이 명령어는 'korean-typing-practice'라는 이름의 React 프로젝트를 생성합니다. --template react 옵션으로 React 템플릿을 사용합니다."
        },
        {
          title: "2. 프로젝트 디렉토리 이동 및 의존성 설치",
          content: "생성된 프로젝트 디렉토리로 이동하고 기본 의존성을 설치합니다.",
          commands: [
            "cd korean-typing-practice",
            "npm install"
          ],
          explanation: "cd 명령어로 프로젝트 폴더로 이동한 후, npm install로 package.json에 정의된 의존성들을 설치합니다."
        },
        {
          title: "3. 핵심 라이브러리 설치",
          content: "한글 타이핑 연습 애플리케이션에 필요한 핵심 라이브러리들을 설치합니다.",
          command: "npm install @reduxjs/toolkit react-redux styled-components framer-motion react-router-dom chart.js recharts",
          explanation: "각 라이브러리의 역할:\n• @reduxjs/toolkit: 상태 관리\n• react-redux: React와 Redux 연결\n• styled-components: CSS-in-JS 스타일링\n• framer-motion: 애니메이션\n• react-router-dom: 라우팅\n• chart.js/recharts: 데이터 시각화"
        },
        {
          title: "4. 개발 서버 실행",
          content: "설치가 완료되면 개발 서버를 실행하여 프로젝트가 정상적으로 동작하는지 확인합니다.",
          command: "npm run dev",
          explanation: "개발 서버가 실행되면 브라우저에서 http://localhost:5173으로 접속하여 기본 React 페이지가 표시되는지 확인합니다."
        }
      ],
      codeExamples: [
        {
          title: "package.json 예시",
          code: `{
  "name": "korean-typing-practice",
  "dependencies": {
    "@reduxjs/toolkit": "^2.10.1",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-redux": "^9.2.0",
    "styled-components": "^6.1.19",
    "framer-motion": "^12.23.24",
    "react-router-dom": "^7.9.6",
    "chart.js": "^4.5.1",
    "recharts": "^3.4.1"
  }
}`,
          explanation: "package.json 파일은 프로젝트의 의존성과 스크립트를 정의합니다. dependencies 섹션에 설치된 라이브러리들이 표시됩니다."
        },
        {
          title: "기본 React 컴포넌트 구조",
          code: `import React from 'react';

function App() {
  return (
    <div>
      <h1>한글 타이핑 연습</h1>
      <p>React 프로젝트가 성공적으로 생성되었습니다!</p>
    </div>
  );
}

export default App;`,
          explanation: "Vite로 생성된 기본 React 컴포넌트 구조입니다. 함수형 컴포넌트와 JSX 문법을 사용합니다."
        }
      ],
      tips: [
        "Vite는 Create React App보다 빠른 개발 경험을 제공합니다",
        "npm 대신 yarn을 사용할 수도 있습니다 (yarn create vite)",
        "package-lock.json 파일은 의존성 버전을 고정하여 일관된 환경을 보장합니다",
        "node_modules 폴더는 git에 포함하지 않습니다 (.gitignore에 추가)"
      ],
      commonErrors: [
        {
          error: "npm ERR! code ENOENT",
          solution: "Node.js와 npm이 올바르게 설치되었는지 확인하세요"
        },
        {
          error: "Port 5173 is already in use",
          solution: "다른 포트를 사용하거나 해당 포트를 사용하는 프로세스를 종료하세요"
        }
      ]
    },
    2: {
      title: "Styled-components 환경 설정 및 전역 스타일 정의",
      description: "Styled-components를 사용하여 CSS-in-JS 방식의 스타일링 시스템을 구축하고, 전역 스타일과 테마 시스템을 구현합니다.",
      objectives: [
        "Styled-components 기본 개념 이해하기",
        "ThemeProvider로 테마 시스템 구축하기",
        "GlobalStyle로 전역 스타일 정의하기",
        "반응형 디자인을 위한 테마 변수 활용하기"
      ],
      prerequisites: [
        "React 기본 지식",
        "CSS 기본 지식",
        "JavaScript ES6+ 문법"
      ],
      steps: [
        {
          title: "1. Styled-components 설치",
          content: "이미 서브태스크 1에서 설치했지만, 개념을 이해하는 것이 중요합니다.",
          command: "npm install styled-components",
          explanation: "Styled-components는 CSS를 JavaScript로 작성할 수 있게 해주는 CSS-in-JS 라이브러리입니다."
        },
        {
          title: "2. 테마 객체 생성",
          content: "애플리케이션 전체에서 사용할 디자인 토큰(색상, 폰트, 간격 등)을 정의합니다.",
          code: `// src/styles/GlobalStyle.js
export const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
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
};`,
          explanation: "테마 객체는 디자인 시스템의 핵심입니다. 일관된 디자인을 유지하고 유지보수를 쉽게 만듭니다."
        },
        {
          title: "3. 전역 스타일 정의",
          content: "createGlobalStyle을 사용하여 애플리케이션 전체에 적용될 CSS를 정의합니다.",
          code: `import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle\`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: \${({ theme }) => theme.fonts.primary};
    background-color: \${({ theme }) => theme.colors.background};
    line-height: 1.6;
  }
\`;`,
          explanation: "GlobalStyle은 CSS 리셋과 기본 스타일을 정의합니다. 템플릿 리터럴을 사용하여 테마 변수에 접근합니다."
        },
        {
          title: "4. ThemeProvider로 애플리케이션 감싸기",
          content: "React 애플리케이션을 ThemeProvider로 감싸서 테마를 모든 컴포넌트에 제공합니다.",
          code: `// src/main.jsx
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/GlobalStyle';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);`,
          explanation: "ThemeProvider는 Context API를 사용하여 테마 객체를 하위 컴포넌트들에게 전달합니다."
        }
      ],
      codeExamples: [
        {
          title: "Styled 컴포넌트 생성",
          code: `import styled from 'styled-components';

export const Button = styled.button\`
  background: \${({ theme, variant = 'primary' }) => theme.colors[variant]};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
\`;

// 사용법
<Button variant="primary">클릭하세요</Button>
<Button variant="secondary">취소</Button>`,
          explanation: "styled 함수를 사용하여 스타일링된 컴포넌트를 생성합니다. props를 통해 동적으로 스타일을 적용할 수 있습니다."
        },
        {
          title: "반응형 스타일링",
          code: `export const Container = styled.div\`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.25rem;
  }
\`;`,
          explanation: "미디어 쿼리를 사용하여 반응형 디자인을 구현합니다. 화면 크기에 따라 스타일이 동적으로 변경됩니다."
        }
      ],
      tips: [
        "스타일드 컴포넌트는 재사용성이 높습니다",
        "테마 객체를 잘 구성하면 다크모드 구현이 쉬워집니다",
        "CSS-in-JS는 클래스 이름 충돌을 방지합니다",
        "개발자 도구에서 자동 생성된 클래스 이름을 확인할 수 있습니다"
      ],
      commonErrors: [
        {
          error: "Styled-components: Cannot access theme",
          solution: "컴포넌트가 ThemeProvider 내부에 있는지 확인하세요"
        },
        {
          error: "GlobalStyle not applying",
          solution: "GlobalStyle 컴포넌트가 ThemeProvider 내부에서 렌더링되는지 확인하세요"
        }
      ]
    },
    3: {
      title: "Redux Toolkit 설정 및 상태 관리 구조 설계",
      description: "Redux Toolkit을 사용하여 애플리케이션의 상태 관리 시스템을 구축합니다. 타이핑 게임에 필요한 상태들을 효율적으로 관리하는 방법을 학습합니다.",
      objectives: [
        "Redux Toolkit 기본 개념 이해하기",
        "Store 생성 및 Provider 연결하기",
        "Slice 패턴으로 상태 관리 구조 설계하기",
        "useSelector와 useDispatch로 상태 다루기"
      ],
      prerequisites: [
        "React Hooks 기본 지식",
        "JavaScript 비동기 처리 이해",
        "상태 관리 기본 개념"
      ],
      steps: [
        {
          title: "1. Redux Toolkit 설치",
          content: "상태 관리를 위한 Redux Toolkit과 React 연결을 위한 react-redux를 설치합니다.",
          command: "npm install @reduxjs/toolkit react-redux",
          explanation: "@reduxjs/toolkit은 Redux의 복잡성을 줄여주는 공식 도구입니다. react-redux는 React 컴포넌트와 Redux를 연결해줍니다."
        },
        {
          title: "2. Store 생성",
          content: "애플리케이션의 중앙 상태 저장소를 생성합니다.",
          code: `// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // 여기에 slice들이 추가될 예정
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;`,
          explanation: "configureStore는 Redux store를 쉽게 생성하는 함수입니다. middleware 설정으로 개발 경험을 최적화할 수 있습니다."
        },
        {
          title: "3. Typing Slice 생성",
          content: "타이핑 게임의 핵심 상태를 관리하는 slice를 생성합니다.",
          code: `// src/store/slices/typingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentText: '',
  userInput: '',
  isTyping: false,
  startTime: null,
  endTime: null,
  wpm: 0,
  accuracy: 0,
  errors: [],
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    startTyping: (state, action) => {
      state.isTyping = true;
      state.startTime = Date.now();
      state.currentText = action.payload;
      state.userInput = '';
      state.errors = [];
    },
    updateInput: (state, action) => {
      state.userInput = action.payload;
    },
    finishTyping: (state) => {
      state.isTyping = false;
      state.endTime = Date.now();
      // WPM 계산
      const timeInMinutes = (state.endTime - state.startTime) / 60000;
      const wordsTyped = state.userInput.length / 5;
      state.wpm = Math.round(wordsTyped / timeInMinutes);
      // 정확도 계산
      const correctChars = state.currentText
        .split('')
        .filter((char, index) => char === state.userInput[index]).length;
      state.accuracy = Math.round((correctChars / state.currentText.length) * 100);
    },
  },
});

export const { startTyping, updateInput, finishTyping } = typingSlice.actions;
export default typingSlice.reducer;`,
          explanation: "Slice는 Redux Toolkit의 핵심 개념으로, reducer와 action을 하나의 파일에서 관리합니다. Immer 라이브러리로 불변성을 자동으로 처리합니다."
        },
        {
          title: "4. Store에 Slice 연결",
          content: "생성한 slice를 store에 등록합니다.",
          code: `// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import typingSlice from './slices/typingSlice';

export const store = configureStore({
  reducer: {
    typing: typingSlice,
  },
});`,
          explanation: "store의 reducer 객체에 각 slice를 추가합니다. 키 이름은 상태를 식별하는 데 사용됩니다."
        },
        {
          title: "5. Provider로 앱 감싸기",
          content: "React 애플리케이션을 Redux Provider로 감싸서 모든 컴포넌트에서 store에 접근할 수 있게 합니다.",
          code: `// src/main.jsx
import { Provider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>
);`,
          explanation: "Provider는 React Context API를 사용하여 store를 모든 하위 컴포넌트에 제공합니다."
        }
      ],
      codeExamples: [
        {
          title: "컴포넌트에서 Redux 사용",
          code: `import { useSelector, useDispatch } from 'react-redux';
import { startTyping, updateInput, finishTyping } from '../store/slices/typingSlice';

const TypingPractice = () => {
  const dispatch = useDispatch();
  const { userInput, isTyping, wpm, accuracy } = useSelector(state => state.typing);

  const handleStart = (text) => {
    dispatch(startTyping(text));
  };

  const handleInputChange = (input) => {
    dispatch(updateInput(input));
  };

  const handleFinish = () => {
    dispatch(finishTyping());
  };

  return (
    <div>
      <p>WPM: {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
    </div>
  );
};`,
          explanation: "useSelector는 store에서 상태를 선택하고, useDispatch는 action을 발생시킵니다."
        }
      ],
      tips: [
        "Redux DevTools 브라우저 확장 프로그램을 설치하면 디버깅이 쉬워집니다",
        "Slice는 기능별로 분리하는 것이 좋습니다 (user, stats, typing 등)",
        "createAsyncThunk를 사용하면 비동기 작업을 쉽게 처리할 수 있습니다",
        "상태 구조는 가능한 평평하게 유지하는 것이 좋습니다"
      ],
      commonErrors: [
        {
          error: "could not find react-redux context value",
          solution: "컴포넌트가 Provider 내부에 있는지 확인하세요"
        },
        {
          error: "TypeError: state is undefined",
          solution: "useSelector에서 올바른 상태 경로를 선택했는지 확인하세요"
        }
      ]
    },
    4: {
      title: "라우팅 구조 및 레이아웃 컴포넌트 구현",
      description: "React Router를 사용하여 싱글 페이지 애플리케이션의 라우팅 시스템을 구축하고, 재사용 가능한 레이아웃 컴포넌트를 구현합니다.",
      objectives: [
        "React Router 기본 개념 이해하기",
        "Layout 컴포넌트 구조 설계하기",
        "네비게이션 및 페이지 전환 구현하기",
        "반응형 레이아웃 디자인하기"
      ],
      prerequisites: [
        "React 컴포넌트 기본 지식",
        "Styled-components 사용법",
        "JavaScript ES6+ 문법"
      ],
      steps: [
        {
          title: "1. React Router 설치",
          content: "클라이언트 사이드 라우팅을 위한 React Router를 설치합니다.",
          command: "npm install react-router-dom",
          explanation: "react-router-dom은 웹 애플리케이션을 위한 라우팅 라이브러리입니다."
        },
        {
          title: "2. Layout 스타일 정의",
          content: "레이아웃 컴포넌트에서 사용할 스타일 컴포넌트들을 생성합니다.",
          code: `// src/components/layout/LayoutStyles.js
import styled from 'styled-components';

export const LayoutContainer = styled.div\`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
\`;

export const Header = styled.header\`
  background: linear-gradient(135deg, \${props => props.theme.colors.primary} 0%, \${props => props.theme.colors.secondary} 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
\`;

export const HeaderContainer = styled.div\`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
\`;

export const Logo = styled.h1\`
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
\`;

export const Nav = styled.nav\`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
\`;

export const NavLink = styled.a\`
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  cursor: pointer;
  
  &:hover, &.active {
    background-color: rgba(255,255,255,0.2);
    transform: translateY(-1px);
  }
\`;

export const Main = styled.main\`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
\`;

export const Footer = styled.footer\`
  background-color: \${props => props.theme.colors.secondary};
  color: white;
  text-align: center;
  padding: 2rem 0;
  margin-top: auto;
\`;`,
          explanation: "styled-components를 사용하여 반응형 레이아웃 스타일을 정의합니다. 미디어 쿼리로 모바일 환경도 고려합니다."
        },
        {
          title: "3. Layout 컴포넌트 구현",
          content: "재사용 가능한 레이아웃 컴포넌트를 생성합니다.",
          code: `// src/components/layout/Layout.jsx
import React from 'react';
import {
  LayoutContainer,
  Header,
  HeaderContainer,
  Logo,
  Nav,
  NavLink,
  Footer,
  FooterContainer,
} from './LayoutStyles';

const Layout = ({ children, currentPage, onNavClick }) => {
  return (
    <LayoutContainer>
      <Header>
        <HeaderContainer>
          <Logo>한글 타이핑 연습</Logo>
          <Nav>
            <NavLink
              href="#practice"
              className={currentPage === 'practice' ? 'active' : ''}
              onClick={e => {
                e.preventDefault();
                onNavClick('practice');
              }}
            >
              연습
            </NavLink>
            <NavLink
              href="#stats"
              className={currentPage === 'stats' ? 'active' : ''}
              onClick={e => {
                e.preventDefault();
                onNavClick('stats');
              }}
            >
              통계
            </NavLink>
            <NavLink
              href="#profile"
              className={currentPage === 'profile' ? 'active' : ''}
              onClick={e => {
                e.preventDefault();
                onNavClick('profile');
              }}
            >
              프로필
            </NavLink>
          </Nav>
        </HeaderContainer>
      </Header>

      {children}

      <Footer>
        <FooterContainer>
          <p>&copy; 2024 한글 타이핑 연습. All rights reserved.</p>
        </FooterContainer>
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;`,
          explanation: "Layout 컴포넌트는 헤더, 메인 콘텐츠, 푸터로 구성된 전체 앱 구조를 정의합니다. props를 통해 현재 페이지와 네비게이션 핸들러를 받습니다."
        },
        {
          title: "4. 페이지 컴포넌트들 생성",
          content: "각 라우트에 대응하는 페이지 컴포넌트들을 생성합니다.",
          code: `// src/pages/PracticePage.jsx
import React from 'react';
import { Container, Title } from '../components/common/UI';

const PracticePage = () => {
  return (
    <Container>
      <Title>타이핑 연습</Title>
      <p>여기서 타이핑 연습을 할 수 있습니다.</p>
    </Container>
  );
};

export default PracticePage;

// src/pages/StatsPage.jsx
import React from 'react';
import { Container, Title } from '../components/common/UI';

const StatsPage = () => {
  return (
    <Container>
      <Title>통계</Title>
      <p>타이핑 통계를 확인할 수 있습니다.</p>
    </Container>
  );
};

export default StatsPage;

// src/pages/ProfilePage.jsx
import React from 'react';
import { Container, Title } from '../components/common/UI';

const ProfilePage = () => {
  return (
    <Container>
      <Title>프로필</Title>
      <p>사용자 프로필 정보를 관리할 수 있습니다.</p>
    </Container>
  );
};

export default ProfilePage;`,
          explanation: "각 페이지 컴포넌트는 특정 기능에 대한 UI를 담당합니다. 공통 UI 컴포넌트를 재사용하여 일관성을 유지합니다."
        },
        {
          title: "5. App 컴포넌트에서 라우팅 구현",
          content: "상태 기반의 라우팅 시스템을 구현합니다.",
          code: `// src/App.jsx
import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import PracticePage from './pages/PracticePage';
import StatsPage from './pages/StatsPage';
import ProfilePage from './pages/ProfilePage';
import { Main } from './components/layout/LayoutStyles';

function App() {
  const [currentPage, setCurrentPage] = useState('practice');

  const renderPage = () => {
    switch (currentPage) {
      case 'practice':
        return <PracticePage />;
      case 'stats':
        return <StatsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <PracticePage />;
    }
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout currentPage={currentPage} onNavClick={handleNavClick}>
      <Main>{renderPage()}</Main>
    </Layout>
  );
}

export default App;`,
          explanation: "상태 기반 라우팅을 사용하여 페이지 전환을 구현합니다. React Router 대신 간단한 상태 관리로 라우팅을 처리합니다."
        }
      ],
      codeExamples: [
        {
          title: "공통 UI 컴포넌트",
          code: `// src/components/common/UI.js
import styled from 'styled-components';

export const Container = styled.div\`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
\`;

export const Title = styled.h1\`
  font-size: 2.5rem;
  color: \${props => props.theme.colors.primary};
  margin-bottom: 1rem;
\`;

export const Card = styled.div\`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
\`;

export const Button = styled.button\`
  background: \${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
\`;`,
          explanation: "재사용 가능한 UI 컴포넌트들을 정의하여 일관된 디자인을 유지합니다."
        }
      ],
      tips: [
        "컴포넌트는 가능한 작게 유지하고 단일 책임을 갖도록 설계하세요",
        "스타일 컴포넌트는 해당 컴포넌트와 가까운 곳에 두는 것이 좋습니다",
        "반응형 디자인은 처음부터 고려하는 것이 좋습니다",
        "접근성을 위해 시맨틱 HTML 태그를 사용하세요"
      ],
      commonErrors: [
        {
          error: "styled-components: Cannot access theme",
          solution: "컴포넌트가 ThemeProvider 내부에 있는지 확인하세요"
        },
        {
          error: "Navigation not working",
          solution: "이벤트 핸들러에서 preventDefault()를 호출했는지 확인하세요"
        }
      ]
    },
    5: {
      title: "개발 환경 최적화 및 빌드 설정",
      description: "코드 품질을 유지하고 개발 경험을 향상시키기 위한 도구들을 설정하고, 프로덕션 빌드를 최적화합니다.",
      objectives: [
        "ESLint와 Prettier로 코드 품질 관리하기",
        "Vite 설정으로 개발 경험 최적화하기",
        "번들 분석 및 최적화하기",
        "프로덕션 배포 준비하기"
      ],
      prerequisites: [
        "Node.js 생태계 이해",
        "빌드 도구 기본 개념",
        "코드 품질 도구 사용 경험"
      ],
      steps: [
        {
          title: "1. ESLint 설정",
          content: "코드의 잠재적 오류와 스타일 문제를 찾아주는 ESLint를 설정합니다.",
          code: `// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['dist', 'node_modules', 'build'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: '18.0' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 0,
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
];`,
          explanation: "ESLint 설정으로 코드 일관성을 유지하고 잠재적 버그를 조기에 발견할 수 있습니다."
        },
        {
          title: "2. Prettier 설정",
          content: "코드 포맷팅을 자동화하는 Prettier를 설정합니다.",
          code: `// .prettierrc.json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}

// .prettierignore
node_modules
dist
build
*.min.js
*.min.css
package-lock.json
yarn.lock
.env*`,
          explanation: "Prettier는 팀원 간의 코드 스타일 차이를 없애고 일관된 포맷을 유지해줍니다."
        },
        {
          title: "3. Vite 설정 최적화",
          content: "개발 경험과 빌드 성능을 향상시키기 위해 Vite를 설정합니다.",
          code: `// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          router: ['react-router-dom'],
          styles: ['styled-components']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'styled-components'],
  },
});`,
          explanation: "코드 분할, 소스맵, 압축 등 프로덕션 최적화 설정을 적용합니다."
        },
        {
          title: "4. Package.json 스크립트 추가",
          content: "개발 및 빌드 관련 스크립트를 package.json에 추가합니다.",
          code: `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext js,jsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "analyze": "npm run build && npx vite-bundle-analyzer dist/stats.html"
  }
}`,
          explanation: "일관된 명령어로 개발 워크플로우를 관리할 수 있습니다."
        },
        {
          title: "5. 환경 변수 설정",
          content: "개발/프로덕션 환경별 설정을 위한 환경 변수를 설정합니다.",
          code: `// .env.example
VITE_APP_TITLE=한글 타이핑 연습
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_VERSION=1.0.0

// .env.development
VITE_API_BASE_URL=http://localhost:3001
VITE_DEBUG_MODE=true

// .env.production
VITE_API_BASE_URL=https://api.korean-typing.com
VITE_DEBUG_MODE=false`,
          explanation: "Vite에서는 VITE_ 접두사를 붙인 환경 변수만 클라이언트에 노출됩니다."
        }
      ],
      codeExamples: [
        {
          title: "Git hooks 설정",
          code: `// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run type-check"
    }
  },
  "lint-staged": {
    "*.{js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}

// 설치
npm install --save-dev husky lint-staged
npx husky install`,
          explanation: "Git hooks를 사용하여 커밋 전에 코드 품질 검사를 자동화할 수 있습니다."
        },
        {
          title: "번들 분석 스크립트",
          code: `// scripts/analyze.js
import { readFileSync } from 'fs';
import { join } from 'path';
import { gzipSync } from 'zlib';

const stats = JSON.parse(
  readFileSync(join(process.cwd(), 'dist/stats.json'), 'utf8')
);

const assets = stats.assets
  .filter(asset => asset.name.endsWith('.js'))
  .map(asset => ({
    name: asset.name,
    size: asset.size,
    gzipped: gzipSync(readFileSync(join(process.cwd(), 'dist', asset.name))).length,
  }));

console.table(assets);`,
          explanation: "번들 크기를 분석하여 최적화 기회를 찾을 수 있습니다."
        }
      ],
      tips: [
        "CI/CD 파이프라인에 lint와 test 단계를 포함하세요",
        "번들 분석을 정기적으로 수행하여 번들 크기를 모니터링하세요",
        "소스맵은 프로덕션에서도 디버깅을 위해 유지하는 것이 좋습니다",
        "성능 모니터링 도구를 사용하여 실제 사용자 경험을 측정하세요"
      ],
      commonErrors: [
        {
          error: "ESLint and Prettier conflict",
          solution: "eslint-config-prettier를 설치하여 충돌을 해결하세요"
        },
        {
          error: "Build memory issues",
          solution: "Node.js 메모리 제한을 늘리거나 빌드 과정을 분할하세요"
        }
      ]
    }
  };

  const subtask = subtaskData[subtaskId];
  
  if (!subtask) {
    return (
      <Container>
        <Title>서브태스크를 찾을 수 없습니다</Title>
        <Button onClick={onBack}>뒤로 가기</Button>
      </Container>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#007bff', marginBottom: '1rem' }}>학습 목표</h3>
              <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                {subtask.objectives.map((objective, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{objective}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#007bff', marginBottom: '1rem' }}>사전 지식</h3>
              <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                {subtask.prerequisites.map((prereq, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{prereq}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ color: '#007bff', marginBottom: '1rem' }}>단계별 가이드</h3>
              {subtask.steps.map((step, index) => (
                <Card key={index} style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#343a40', marginBottom: '1rem' }}>{step.title}</h4>
                  <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>{step.content}</p>
                  
                  {step.command && (
                    <div style={{ 
                      backgroundColor: '#f8f9fa', 
                      padding: '1rem', 
                      borderRadius: '0.5rem',
                      fontFamily: 'monospace',
                      marginBottom: '1rem'
                    }}>
                      {step.command}
                    </div>
                  )}

                  {step.commands && (
                    <div style={{ marginBottom: '1rem' }}>
                      {step.commands.map((cmd, cmdIndex) => (
                        <div key={cmdIndex} style={{ 
                          backgroundColor: '#f8f9fa', 
                          padding: '1rem', 
                          borderRadius: '0.5rem',
                          fontFamily: 'monospace',
                          marginBottom: '0.5rem'
                        }}>
                          {cmd}
                        </div>
                      ))}
                    </div>
                  )}

                  {step.code && (
                    <pre style={{ 
                      backgroundColor: '#f8f9fa', 
                      padding: '1rem', 
                      borderRadius: '0.5rem',
                      overflow: 'auto',
                      marginBottom: '1rem'
                    }}>
                      <code>{step.code}</code>
                    </pre>
                  )}

                  {step.explanation && (
                    <div style={{ 
                      backgroundColor: '#e7f3ff', 
                      padding: '1rem', 
                      borderRadius: '0.5rem',
                      borderLeft: '4px solid #007bff'
                    }}>
                      <strong>설명:</strong> {step.explanation}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        );

      case 'examples':
        return (
          <div>
            <h3 style={{ color: '#007bff', marginBottom: '1.5rem' }}>코드 예제</h3>
            {subtask.codeExamples.map((example, index) => (
              <Card key={index} style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#343a40', marginBottom: '1rem' }}>{example.title}</h4>
                <pre style={{ 
                  backgroundColor: '#f8f9fa', 
                  padding: '1.5rem', 
                  borderRadius: '0.5rem',
                  overflow: 'auto',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>
                  <code>{example.code}</code>
                </pre>
                {example.explanation && (
                  <div style={{ 
                    backgroundColor: '#e7f3ff', 
                    padding: '1rem', 
                    borderRadius: '0.5rem',
                    borderLeft: '4px solid #007bff'
                  }}>
                    <strong>설명:</strong> {example.explanation}
                  </div>
                )}
              </Card>
            ))}
          </div>
        );

      case 'tips':
        return (
          <div>
            <h3 style={{ color: '#007bff', marginBottom: '1.5rem' }}>학습 팁</h3>
            <Card style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7' }}>
              <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                {subtask.tips.map((tip, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>💡 {tip}</li>
                ))}
              </ul>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <Button onClick={onBack} style={{ marginRight: '1rem' }}>
          ← 뒤로 가기
        </Button>
        <Title size="2xl" style={{ margin: 0 }}>
          {subtask.title}
        </Title>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#495057' }}>
          {subtask.description}
        </p>
      </div>

      {/* 탭 네비게이션 */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '2px solid #e9ecef',
        marginBottom: '2rem'
      }}>
        {['overview', 'examples', 'tips'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '1rem 1.5rem',
              border: 'none',
              backgroundColor: activeTab === tab ? '#007bff' : 'transparent',
              color: activeTab === tab ? 'white' : '#6c757d',
              cursor: 'pointer',
              borderBottom: activeTab === tab ? '2px solid #007bff' : '2px solid transparent',
              marginBottom: '-2px',
              transition: 'all 0.3s ease'
            }}
          >
            {tab === 'overview' && '개요'}
            {tab === 'examples' && '코드 예제'}
            {tab === 'tips' && '학습 팁'}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      {renderContent()}

      {/* 일반적인 오류 */}
      {subtask.commonErrors && (
        <Card style={{ marginTop: '2rem', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb' }}>
          <h3 style={{ color: '#721c24', marginBottom: '1rem' }}>⚠️ 일반적인 오류 및 해결책</h3>
          {subtask.commonErrors.map((error, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#721c24' }}>오류:</strong> {error.error}
              <br />
              <strong style={{ color: '#721c24' }}>해결책:</strong> {error.solution}
            </div>
          ))}
        </Card>
      )}

      {/* 진행 상황 저장 */}
      {isLoggedIn && (
        <Card style={{ 
          marginTop: '2rem', 
          backgroundColor: '#d4edda', 
          border: '1px solid #c3e6cb',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#155724', marginBottom: '1rem' }}>📚 학습 진행 상황</h4>
          <p style={{ color: '#155724', marginBottom: '1rem' }}>
            이 서브태스크의 학습을 완료하셨나요?
          </p>
          <Button style={{ backgroundColor: '#28a745' }}>
            학습 완료로 표시
          </Button>
        </Card>
      )}
    </Container>
  );
};

export default SubtaskDetailPage;