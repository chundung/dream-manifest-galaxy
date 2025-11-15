# Task 1: 프로젝트 초기 설정 및 기본 스택 통합

## Description
React.js 애플리케이션을 초기화하고, Redux Toolkit, Styled-components (또는 Tailwind CSS), Chart.js (또는 Recharts), Framer Motion 등의 핵심 프론트엔드 기술 스택을 통합합니다. 개발 환경을 설정하고 빌드 프로세스를 최적화합니다.

## Details
React 프로젝트는 `create-react-app` 또는 Vite를 사용하여 초기화합니다. `npm install` 또는 `yarn add`를 통해 `react-redux`, `@reduxjs/toolkit`, `styled-components` (또는 `tailwindcss`), `chart.js` (또는 `recharts`), `framer-motion` 패키지를 설치합니다. Redux 스토어를 구성하고, Styled-components의 ThemeProvider를 설정하며, Tailwind CSS를 선택할 경우 `tailwind.config.js`를 구성합니다. 기본적인 라우팅을 위해 `react-router-dom`도 설치하고 설정합니다.

## Test Strategy
프로젝트가 성공적으로 빌드되고, 각 라이브러리가 올바르게 import되어 작동하는지 확인하는 더미 컴포넌트 및 Redux 액션을 생성하여 테스트합니다. `package.json`의 의존성 목록을 확인합니다.

## Priority
high

## Status
done

## Subtasks

### Subtask 1: React 프로젝트 초기화 및 핵심 의존성 설치
React 프로젝트를 초기화하고, Redux Toolkit, Styled-components, Chart.js, Framer Motion, React Router Dom 등 필수 프론트엔드 라이브러리를 설치합니다.

**Details:** 프로젝트 루트 디렉토리에서 'npx create-vite@latest my-app --template react-ts' (TypeScript 사용 시) 또는 'npx create-react-app my-app --template typescript' 명령어를 실행하여 프로젝트를 초기화합니다. 이후 'npm install react-redux @reduxjs/toolkit styled-components chart.js react-chartjs-2 framer-motion react-router-dom' 명령어를 사용하여 필요한 패키지들을 설치합니다. package.json 파일에 모든 의존성이 올바르게 추가되었는지 확인합니다.

**Test Strategy:** 프로젝트가 성공적으로 초기화되고 'npm start' 또는 'npm run dev'로 실행되는지 확인합니다. package.json에 명시된 모든 라이브러리가 dependencies 목록에 정확히 포함되어 있는지 검증합니다.

**Status:** done

### Subtask 2: Styled-components 환경 설정 및 전역 스타일 정의
Styled-components의 ThemeProvider를 설정하고, 애플리케이션 전체에 적용될 GlobalStyle을 정의하여 일관된 디자인 시스템의 기반을 마련합니다.

**Details:** src/styles/theme.ts 파일을 생성하여 기본 색상 팔레트, 폰트 사이즈 등 디자인 토큰을 정의합니다. src/styles/GlobalStyle.ts 파일에는 애플리케이션 전반에 걸쳐 적용될 CSS 리셋 및 기본 스타일을 정의합니다. src/App.tsx 또는 src/main.tsx 파일에서 ThemeProvider와 GlobalStyle을 루트 컴포넌트에 감싸서 적용합니다. 필요한 경우 다크/라이트 모드 지원을 위한 ThemeProvider의 동적 테마 변경 로직의 초기 스케치를 포함합니다.

**Test Strategy:** ThemeProvider와 GlobalStyle이 올바르게 적용되었는지 확인하기 위해 간단한 컴포넌트에 정의된 테마 변수(예: PrimaryColor)를 적용하고 브라우저에서 시각적으로 확인합니다. GlobalStyle의 CSS 리셋이 적용되었는지 개발자 도구로 검사합니다.

**Status:** done

### Subtask 3: Redux Toolkit 스토어 및 기본 예제 슬라이스 구성
Redux Toolkit을 사용하여 중앙 집중식 상태 관리 스토어를 설정하고, 애플리케이션의 상태 관리 아키텍처의 기반을 구축하며, 간단한 상태를 관리하는 예제 슬라이스를 구현합니다.

**Details:** src/app/store.ts 파일을 생성하여 Redux Toolkit의 `configureStore`를 사용하여 스토어를 초기화합니다. src/features/counter/counterSlice.ts와 같은 예제 슬라이스를 생성하여 액션(예: increment, decrement) 및 리듀서를 정의합니다. 스토어 구성 시 이 슬라이스를 포함하고, `react-redux`의 `Provider`를 사용하여 스토어를 React 컴포넌트 트리에 연결합니다. `useSelector` 및 `useDispatch` 훅의 사용법을 시연하는 간단한 컴포넌트를 작성합니다.

**Test Strategy:** 예제 슬라이스의 상태와 액션을 사용하여 간단한 카운터 컴포넌트를 만들고, 버튼 클릭 시 상태가 업데이트되고 UI에 반영되는지 확인합니다. Redux DevTools 확장 프로그램을 사용하여 스토어의 상태 변화와 액션 디스패치를 올바르게 작동하는지 검증합니다.

**Status:** done

### Subtask 4: 기본 라우팅 구조 및 초기 레이아웃 컴포넌트 구현
`react-router-dom`을 사용하여 애플리케이션의 기본 라우팅 구조를 설정하고, 헤더, 푸터, 메인 컨텐츠 영역을 포함하는 초기 레이아웃 컴포넌트를 구현합니다.

**Details:** src/components/Layout.tsx 파일을 생성하여 헤더와 푸터를 포함하는 기본적인 레이아웃을 정의하고, `children` prop을 사용하여 동적으로 컨텐츠를 렌더링합니다. src/App.tsx에서 `BrowserRouter` 및 `Routes`, `Route` 컴포넌트를 사용하여 '/' 경로에 `Layout` 컴포넌트를 연결하고, 그 안에 Home과 같은 더미 페이지 컴포넌트를 정의합니다. Styled-components를 사용하여 레이아웃 컴포넌트의 스타일을 적용합니다.

**Test Strategy:** 브라우저에서 '/' 경로에 접근했을 때 Layout 컴포넌트와 Home 페이지 내용이 올바르게 렌더링되는지 확인합니다. 라우터가 제대로 작동하는지 확인하기 위해 NavBar에 다른 경로로 이동하는 링크를 추가하고 클릭 시 페이지가 변경되는지 검증합니다.

**Status:** done

### Subtask 5: 개발 환경 최적화 및 빌드 스크립트 구성
일관된 코드 스타일과 품질 유지를 위해 ESLint 및 Prettier를 설정하고, 개발 및 프로덕션 환경을 위한 빌드 스크립트를 최적화합니다.

**Details:** ESLint 및 Prettier를 설치하고 프로젝트 루트에 `.eslintrc.json` 및 `.prettierrc.json` 파일을 생성하여 규칙을 구성합니다. 필요한 경우 Airbnb 스타일 가이드와 같은 표준 규칙 세트를 통합합니다. package.json의 scripts 섹션에 'lint' 및 'format' 스크립트를 추가하여 ESLint 및 Prettier를 실행할 수 있도록 합니다. 'build' 스크립트가 프로덕션 빌드를 생성하도록 설정하고, 빌드 결과물의 크기 및 성능을 간단히 검토합니다.

**Test Strategy:** 의도적으로 코드 스타일에 어긋나는 코드를 작성한 후 'npm run lint' 및 'npm run format' 명령어를 실행하여 ESLint가 오류를 보고하고 Prettier가 코드를 자동으로 수정하는지 확인합니다. 'npm run build' 명령어를 실행하여 프로덕션 빌드가 성공적으로 완료되고, build 디렉토리가 생성되는지 검증합니다.

**Status:** done