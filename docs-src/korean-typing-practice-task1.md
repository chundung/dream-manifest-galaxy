---
title: "Korean Typing Practice - Task 1: 프로젝트 초기 설정 및 기본 스택 통합"
description: "React.js 애플리케이션을 초기화하고, Redux Toolkit, Styled-components, Chart.js, Framer Motion 등 핵심 프론트엔드 기술 스택을 통합합니다."
---

# 태스크 1: 프로젝트 초기 설정 및 기본 스택 통합

## 개요

React.js 애플리케이션을 초기화하고, Redux Toolkit, Styled-components, Chart.js, Framer Motion 등 핵심 프론트엔드 기술 스택을 통합합니다. 개발 환경을 설정하고 빌드 프로세스를 최적화합니다.

**완료 상태**: ✅ 완료됨 (5/5 서브태스크)

## 서브태스크 목록

### 서브태스크 1: React 프로젝트 초기화 및 핵심 의존성 설치

**설명**: Vite를 사용하여 React 프로젝트를 생성하고 핵심 라이브러리를 설치합니다.

**학습 주제**:
- Vite로 React 프로젝트 생성
- 핵심 의존성 설치 (Redux Toolkit, Styled-components 등)
- package.json 구성 이해
- 개발 서버 실행 및 테스트

**코드 예제**:

#### Vite 프로젝트 생성
```bash
npm create vite@latest korean-typing-practice -- --template react
```

#### 핵심 의존성 설치
```bash
npm install @reduxjs/toolkit react-redux styled-components framer-motion react-router-dom chart.js recharts
```

### 서브태스크 2: Styled-components 환경 설정 및 전역 스타일 정의

**설명**: Styled-components를 설정하고 전역 스타일과 테마 시스템을 구축합니다.

**학습 주제**:
- Styled-components 기본 개념
- ThemeProvider 설정
- 전역 스타일 (GlobalStyle) 정의
- 테마 객체 구성
- CSS-in-JS 장점 이해

**코드 예제**:

#### 테마 객체 정의
```javascript
export const theme = {
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
};
```

#### 전역 스타일 정의
```javascript
export const GlobalStyle = createGlobalStyle\`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: \${({ theme }) => theme.fonts.primary};
    background-color: \${({ theme }) => theme.colors.background};
  }
\`;
```

### 서브태스크 3: Redux Toolkit 스토어 및 기본 예제 슬라이스 구성

**설명**: Redux Toolkit을 사용하여 상태 관리 시스템을 구축합니다.

**학습 주제**:
- Redux Toolkit 기본 개념
- configureStore로 스토어 설정
- createSlice로 슬라이스 생성
- useSelector와 useDispatch 사용법
- 비동기 액션 (createAsyncThunk)

**코드 예제**:

#### 스토어 설정
```javascript
export const store = configureStore({
  reducer: {
    typing: typingReducer,
    user: userReducer,
    stats: statsReducer,
  },
});
```

#### 슬라이스 생성
```javascript
const typingSlice = createSlice({
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
});
```

### 서브태스크 4: 기본 라우팅 구조 및 초기 레이아웃 컴포넌트 구현

**설명**: 싱글 페이지 애플리케이션의 라우팅 구조와 레이아웃을 구현합니다.

**학습 주제**:
- SPA 라우팅 개념
- 상태 기반 내비게이션
- Layout 컴포넌트 구조
- Header, Footer, Main 컴포넌트
- 반응형 내비게이션

**코드 예제**:

#### Layout 컴포넌트
```javascript
const Layout = ({ children, currentPage, onNavClick }) => {
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
};
```

### 서브태스크 5: 개발 환경 최적화 및 빌드 스크립트 구성

**설명**: ESLint, Prettier를 설정하고 빌드 프로세스를 최적화합니다.

**학습 주제**:
- ESLint 규칙 설정
- Prettier 코드 포맷팅
- Vite 빌드 최적화
- 코드 분할 (Code Splitting)
- Terser 압축

**코드 예제**:

#### ESLint 설정
```javascript
export default defineConfig([
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
]);
```

#### Vite 빌드 최적화
```javascript
export default defineConfig({
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
});
```