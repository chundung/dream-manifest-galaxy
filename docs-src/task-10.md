# Task 10: 세션 결과 표시 및 간단한 통계 UI 구현

## Description
타이핑 세션이 완료된 후, 해당 세션의 WPM, 정확성, 소요 시간 등의 주요 결과를 사용자에게 표시하는 UI 컴포넌트를 개발합니다.

## Details
`SessionResult` 컴포넌트를 생성하여 `wpm`, `accuracy`, `duration` 등의 세션 결과 데이터를 props로 받아 사용자에게 가독성 좋게 표시합니다. 이전 작업에서 저장된 `TypingSession` 데이터를 IndexedDB에서 불러와 가장 최근 세션의 결과를 표시할 수 있도록 합니다. 결과 화면에서 다시 시작하거나 다른 텍스트를 선택할 수 있는 액션 버튼도 포함합니다.

## Test Strategy
타이핑 세션을 완료한 후 결과 화면에 WPM, 정확성, 소요 시간 등의 수치가 올바르게 표시되는지 확인합니다. 여러 세션 후에도 최신 결과가 정확히 나타나는지 검증합니다.

## Priority
medium

## Status
pending

## Subtasks

### Subtask 1: 세션 결과 컴포넌트 (SessionResult) 스켈레톤 및 기본 정보 표시 UI 구현
타이핑 세션이 완료된 후 WPM, 정확성, 소요 시간 등의 핵심 통계 데이터를 표시할 `SessionResult` 컴포넌트의 초기 구조를 정의합니다. `Task 2`의 디자인 가이드라인에 따라 레이아웃을 구성하고, 각 통계 항목을 표시할 더미 플레이스홀더를 포함합니다.

**Details:** React 함수형 컴포넌트로 `src/components/SessionResult.tsx` 파일을 생성합니다. `wpm`, `accuracy`, `duration`을 props로 받는 인터페이스를 정의하고, 이 값들을 표시할 JSX 구조를 만듭니다. Tailwind CSS 또는 Styled-components를 사용하여 가독성 좋은 스타일을 적용합니다. 초기에는 더미 데이터로 UI를 채웁니다.

**Test Strategy:** 스토리북 또는 별도의 개발 페이지에서 `SessionResult` 컴포넌트를 더미 데이터와 함께 렌더링하여 UI 레이아웃과 스타일이 올바르게 표시되는지 시각적으로 확인합니다.

**Status:** pending

### Subtask 2: IndexedDB에서 최신 TypingSession 데이터 조회 로직 개발
`Task 9`에서 저장된 `TypingSession` 데이터 중 가장 최근에 완료된 세션의 데이터를 IndexedDB에서 비동기적으로 조회하는 로직을 구현합니다. 이 로직은 애플리케이션의 전역 상태 관리(예: Redux 또는 Context API)와 통합될 수 있도록 설계합니다.

**Details:** `Task 9`에서 구현된 IndexedDB 유틸리티 함수를 활용하여 최신 `TypingSession` 데이터를 가져오는 비동기 함수를 작성합니다. 이 함수를 Redux Thunk 액션 또는 React Query와 같은 데이터 fetching 라이브러리를 통해 호출할 수 있도록 준비합니다. `SessionResult` 컴포넌트가 마운트될 때 이 데이터를 트리거하도록 합니다.

**Test Strategy:** 개발자 도구의 IndexedDB에서 여러 `TypingSession` 데이터를 생성한 후, 구현된 조회 로직이 가장 최근의 데이터를 올바르게 반환하는지 API 클라이언트(예: Postman)로 테스트합니다. Redux DevTools를 통해 상태 업데이트를 모니터링하여 데이터 흐름을 확인합니다.

**Status:** pending

### Subtask 3: SessionResult 컴포넌트에 실제 통계 데이터 연결 및 시각화
IndexedDB에서 조회된 최신 `TypingSession` 데이터로부터 WPM, 정확성, 소요 시간 등의 통계 지표를 추출하고, 이를 `SessionResult` 컴포넌트의 props로 전달하여 사용자에게 표시합니다. 데이터 형식 변환 및 단위 표시를 포함합니다.

**Details:** `SessionResult` 컴포넌트 또는 이를 감싸는 컨테이너 컴포넌트에서 Subtask 2의 데이터 조회 로직을 사용하여 `wpm`, `accuracy`, `duration` 값을 가져옵니다. 예를 들어, `duration`은 초 단위로 받아와 분:초 형식으로 변환하여 표시하고, `accuracy`는 백분율로 포맷팅하여 표시합니다. `Task 1`의 전역 상태 관리를 통해 데이터를 전달합니다.

**Test Strategy:** 타이핑 세션을 완료한 후 `SessionResult` 화면에서 WPM, 정확성, 소요 시간 값이 실제 세션 결과와 일치하는지 확인합니다. 소수점 처리, 백분율, 시간 단위 표시 등의 데이터 포맷팅이 올바른지 검증합니다.

**Status:** pending

### Subtask 4: 세션 재시작 및 다른 텍스트 선택 액션 버튼 기능 추가
`SessionResult` 화면에 '다시 시작' 및 '다른 텍스트 선택' 버튼을 추가하고, 각 버튼 클릭 시 적절한 애플리케이션 상태 변경 및 화면 전환 로직을 구현합니다.

**Details:** `SessionResult` 컴포넌트에 두 개의 `Button` 컴포넌트를 추가합니다. '다시 시작' 버튼 클릭 시 `Task 5`에서 관리하는 타이핑 세션 관련 Redux 상태를 초기화하고, 타이핑 화면으로 전환합니다. '다른 텍스트 선택' 버튼 클릭 시 `Task 1`의 `react-router-dom`의 `useNavigate` 훅을 활용하여 텍스트 선택 화면으로 라우팅합니다.

**Test Strategy:** '다시 시작' 버튼 클릭 시 타이핑 세션 상태가 초기화되고 사용자가 다시 타이핑을 시작할 준비가 되는지 확인합니다. '다른 텍스트 선택' 버튼 클릭 시 텍스트 선택 화면으로 정확히 이동하는지 테스트합니다.

**Status:** pending

### Subtask 5: 세션 완료 시 SessionResult 컴포넌트 조건부 렌더링 및 애플리케이션 플로우 통합
타이핑 세션이 완료되었음을 나타내는 상태(예: Redux의 `sessionStatus: 'completed'`)를 감지하여 `SessionResult` 컴포넌트를 조건부로 렌더링하고, 타이핑 화면과 결과 화면 간의 원활한 UI 플로우를 관리합니다.

**Details:** 메인 타이핑 화면 컴포넌트에서 `Task 1`의 Redux 스토어의 `sessionStatus` 상태를 구독합니다. `sessionStatus`가 'completed'로 변경될 때 `SessionResult` 컴포넌트를 표시하도록 조건부 렌더링 로직을 구현합니다. `Task 2`의 레이아웃 구성에 따라 자연스럽게 통합되도록 합니다. (향후 `Task 14`에서 애니메이션 효과 추가 가능)

**Test Strategy:** 타이핑 세션을 완료했을 때 `SessionResult` 컴포넌트가 올바르게 나타나고, 다시 타이핑을 시작하거나 다른 텍스트를 선택하기 전까지 결과 화면이 유지되는지 확인합니다. 세션 진행 중에는 `SessionResult`가 표시되지 않는지 검증합니다.

**Status:** pending