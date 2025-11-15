---
title: "Korean Typing Practice - Task 2: 기본 레이아웃 및 반응형 디자인 컴포넌트 구현"
description: "애플리케이션의 전반적인 UI/UX 고려사항에 따라 깔끔하고 미니멀하며 반응형인 기본 레이아웃 컴포넌트를 설계하고 구현합니다. 다크/라이트 모드 지원을 위한 토글 기능을 포함합니다."
---

# 태스크 2: 기본 레이아웃 및 반응형 디자인 컴포넌트 구현

## 개요

애플리케이션의 전반적인 UI/UX 고려사항에 따라 깔끔하고 미니멀하며 반응형인 기본 레이아웃 컴포넌트를 설계하고 구현합니다. 다크/라이트 모드 지원을 위한 토글 기능을 포함합니다.

**완료 상태**: ✅ 완료됨 (5/5 서브태스크)

## 서브태스크 목록

### 서브태스크 2-1: 전역 스타일 및 테마 시스템 초기 설정

**설명**: 다크/라이트 모드를 지원하는 동적 테마 시스템을 구축하고 전역 스타일을 정의합니다.

**학습 주제**:
- 테마 디자인 토큰 구조
- 라이트/다크 테마 색상 팔레트
- Redux를 통한 테마 상태 관리
- localStorage 테마 영속성
- 시스템 테마 감지 기능
- CSS 변수 동적 적용

**코드 예제**:

#### 라이트 테마 정의
```javascript
export const lightTheme = {
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
};
```

#### 테마 Redux 슬라이스
```javascript
const themeSlice = createSlice({
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
});
```

#### 동적 테마 적용
```javascript
const GlobalStyle = createGlobalStyle\`
  body {
    background-color: \${({ theme }) => theme.colors.background};
    color: \${({ theme }) => theme.colors.text.primary};
    transition: background-color \${({ theme }) => theme.transitions.normal};
  }
\`;
```

### 서브태스크 2-2: 기본 Layout 컴포넌트 구조 구현

**설명**: 시맨틱 HTML을 사용한 반응형 레이아웃 컴포넌트를 구현합니다.

**학습 주제**:
- 시맨틱 HTML5 구조
- Header, Main, Footer 컴포넌트
- children prop 패턴
- 접근성 고려사항
- 스타일드 컴포넌트 구조
- 네비게이션 통합

**코드 예제**:

#### Layout 컴포넌트 구조
```javascript
const Layout = ({ children, currentPage, onNavClick }) => {
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
};
```

#### 스타일드 컴포넌트 레이아웃
```javascript
export const LayoutContainer = styled.div\`
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
\`;
```

### 서브태스크 2-3: 반응형 디자인 및 스타일 적용

**설명**: 모바일 퍼스트 반응형 디자인을 구현하고 다양한 화면 크기에 최적화합니다.

**학습 주제**:
- 모바일 퍼스트 디자인 원칙
- 반응형 브레이크포인트 설정
- 미디어 쿼리 활용
- 유동적인 타이포그래피
- 반응형 간격 시스템
- 플렉스박스와 그리드 레이아웃

**코드 예제**:

#### 반응형 헤더 컨테이너
```javascript
export const HeaderContainer = styled.div\`
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
\`;
```

#### 반응형 네비게이션
```javascript
export const Nav = styled.nav\`
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
\`;
```

#### 반응형 타이포그래피
```javascript
export const Logo = styled.h1\`
  font-size: \${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: \${({ theme }) => theme.fontSizes.xl};
  }

  @media (max-width: 480px) {
    font-size: \${({ theme }) => theme.fontSizes.lg};
  }
\`;
```

### 서브태스크 2-4: 다크/라이트 모드 토글 기능 및 UI 구현

**설명**: 사용자 친화적인 테마 전환 기능과 애니메이션 효과를 구현합니다.

**학습 주제**:
- 테마 토글 컴포넌트 디자인
- CSS 애니메이션과 트랜지션
- 아이콘 기반 UI/UX
- 접근성 고려사항
- 상태 관리 연동
- 사용자 인터랙션 처리

**코드 예제**:

#### 테마 토글 컴포넌트
```javascript
const ThemeToggle = () => {
  const { currentTheme, toggle } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <ToggleButton onClick={toggle} isDark={isDark}>
      <IconContainer isDark={isDark}>
        {isDark ? '🌙' : '☀️'}
      </IconContainer>
    </ToggleButton>
  );
};
```

#### 테마 토글 스타일
```javascript
export const ToggleButton = styled.button\`
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
\`;
```

#### 커스텀 훅
```javascript
export const useTheme = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectCurrentTheme);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  return { currentTheme, toggle };
};
```

### 서브태스크 2-5: 헤더 및 푸터 컴포넌트 초기 구현 및 통합

**설명**: 완성된 헤더와 푸터 컴포넌트를 레이아웃에 통합하고 최종 테스트를 수행합니다.

**학습 주제**:
- 컴포넌트 통합 패턴
- 레이아웃 최적화
- 성능 고려사항
- 브라우저 호환성
- 사용자 테스트
- 코드 리뷰 및 리팩토링

**코드 예제**:

#### 통합된 레이아웃
```javascript
const App = () => {
  const [currentPage, setCurrentPage] = useState('practice');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout currentPage={currentPage} onNavClick={handleNavClick}>
      <MainContent currentPage={currentPage} />
    </Layout>
  );
};
```

#### 푸터 컴포넌트
```javascript
export const Footer = styled.footer\`
  background-color: \${({ theme }) => theme.colors.dark};
  color: \${({ theme }) => theme.colors.surface};
  padding: \${({ theme }) => theme.spacing.xl} 0;
  margin-top: auto;

  @media (max-width: 768px) {
    padding: \${({ theme }) => theme.spacing.lg} 0;
  }
\`;
```