# Task 7: 기본 텍스트 컨텐츠 관리 및 난이도별 제공

## Description
MVP를 위한 5-10개의 연습 텍스트를 준비하고, 이를 애플리케이션 내에서 관리 및 선택할 수 있는 시스템을 구현합니다. 초급, 중급, 고급 난이도 구분을 포함합니다.

## Details
로컬 JSON 파일 또는 JavaScript 배열 형태로 초기 텍스트 데이터를 정의합니다. 각 텍스트 객체는 `id`, `content`, `difficulty_level`, `category`, `character_count` 속성을 가집니다. Redux 스토어에 `text` 슬라이스를 추가하여 텍스트 목록을 관리하고, 사용자가 난이도나 카테고리별로 텍스트를 필터링할 수 있는 UI (예: 드롭다운 또는 버튼 그룹)를 구현합니다.

## Test Strategy
다양한 난이도와 카테고리의 텍스트를 선택하여 `TypingTextDisplay`에 올바르게 로드되는지 확인합니다. 텍스트 선택 시 UI가 정상적으로 업데이트되는지 검증합니다.

## Priority
medium

## Status
pending

## Subtasks

### Subtask 1: 초기 연습 텍스트 데이터 파일 정의 및 생성
애플리케이션에서 사용할 초기 5-10개의 연습 텍스트를 정의합니다. 각 텍스트는 고유한 'id', 본문 'content', 'difficulty_level' (초급, 중급, 고급), 'category' (예: 뉴스, 소설), 그리고 'character_count' (초기에는 비워두고 나중에 계산) 속성을 가집니다. 이 데이터는 로컬 JSON 파일 또는 JavaScript 배열 형태로 관리됩니다.

**Details:** src/data/texts.json 또는 src/data/texts.js 파일을 생성하고, 주어딘 스키마에 따라 5-10개의 한글 연습 텍스트 데이터를 추가합니다. 'character_count'는 문자열 길이를 나중에 로직을 통해 채울 것입니다.

**Test Strategy:** 생성된 JSON 파일 또는 JavaScript 배열의 구조와 데이터가 정의된 스키마를 따르는지 수동으로 확인합니다. 텍스트 내용 및 메타데이터의 정확성을 검증합니다.

**Status:** pending

### Subtask 2: Redux 'text' 슬라이스 구현 및 스토어 통합
연습 텍스트 목록을 관리하고, 사용자가 난이도 및 카테고리별로 텍스트를 필터링하는 로직을 포함하는 Redux Toolkit 슬라이스를 구현합니다. 이 슬라이스를 전역 Redux 스토어에 통합합니다.

**Details:** src/store/slices/textSlice.js 파일을 생성합니다. 'setSelectedText', 'filterTextsByDifficulty', 'filterTextsByCategory' 등의 리듀서와 액션을 정의합니다. src/store/index.js에서 이 슬라이스를 루트 리듀서에 추가합니다.

**Test Strategy:** Redux DevTools를 사용하여 슬라이스의 초기 상태가 올바르게 로드되는지 확인합니다. 'setSelectedText' 액션으로 선택된 텍스트가 정확히 업데이트되는지, 필터링 액션으로 텍스트 목록이 예상대로 변경되는지 단위 테스트를 통해 검증합니다.

**Status:** pending

### Subtask 3: 난이도 및 카테고리별 텍스트 선택 UI 컴포넌트 개발
사용자가 난이도('초급', '중급', '고급')와 카테고리(예: '뉴스', '문학', '일상')를 기준으로 연습 텍스트를 필터링하고 선택할 수 있는 드롭다운 또는 버튼 그룹 형태의 UI 컴포넌트를 개발합니다. 이 컴포넌트는 Redux 스토어의 'text' 슬라이스와 연동됩니다.

**Details:** src/components/TextSelector.jsx 파일을 생성합니다. Redux의 useSelector 훅을 사용하여 텍스트 목록과 현재 선택된 필터 상태를 가져옵니다. 사용자의 난이도/카테고리 선택에 따라 Redux 액션을 디스패치하여 스토어의 상태를 업데이트하고, 해당 필터에 맞는 텍스트 목록을 표시합니다.

**Test Strategy:** UI 컴포넌트가 다양한 필터 옵션을 올바르게 렌더링하는지 확인합니다. 난이도 및 카테고리 필터를 변경할 때 Redux 스토어의 필터 상태가 정확히 업데이트되는지, 그에 따라 표시되는 텍스트 목록이 변경되는지 시각적 및 기능적 테스트를 수행합니다.

**Status:** pending

### Subtask 4: `TypingTextDisplay` 컴포넌트와 선택된 텍스트 연동
Redux 스토어에서 현재 선택된 연습 텍스트의 'content'를 가져와 `TypingTextDisplay` 컴포넌트에 prop으로 전달하고, 이 텍스트가 타이핑 연습을 위해 화면에 올바르게 표시되도록 구현합니다.

**Details:** src/features/typing/TypingTextDisplay.jsx 컴포넌트에서 Redux의 useSelector 훅을 사용하여 'text' 슬라이스의 현재 선택된 텍스트의 'content'를 가져옵니다. 이 'content'를 `TypingTextDisplay` 컴포넌트의 prop으로 전달하여 타이핑 대상 텍스트로 사용합니다. 텍스트가 변경될 때마다 `TypingTextDisplay`가 업데이트되도록 합니다.

**Test Strategy:** 텍스트 선택 UI를 통해 다른 텍스트를 선택했을 때 `TypingTextDisplay` 컴포넌트에 표시되는 텍스트가 즉시 변경되는지 확인합니다. 선택된 텍스트가 정확히 화면에 렌더링되는지, 타이핑 입력 시 해당 텍스트에 대한 처리가 정상적으로 이루어지는지 E2E 테스트를 통해 검증합니다.

**Status:** pending

### Subtask 5: 텍스트 데이터에 `character_count` 자동 계산 로직 통합
초기 텍스트 데이터가 로드되거나 Redux 스토어에 추가될 때, 각 텍스트 객체의 'content' 길이를 기반으로 'character_count' 속성을 자동으로 계산하여 저장하는 로직을 구현합니다. 이는 텍스트 선택 UI 등에서 정보로 활용될 수 있습니다.

**Details:** Subtask 1에서 생성된 초기 텍스트 데이터 로드 시 또는 Subtask 2의 Redux 'text' 슬라이스 내부에서 각 텍스트 객체의 'content.length'를 계산하여 'character_count' 필드를 채웁니다. 이 값은 텍스트 선택 UI (Subtask 3)에서 텍스트 정보를 표시하는 데 사용될 수 있습니다.

**Test Strategy:** Redux DevTools를 통해 스토어에 로드된 텍스트 객체들의 'character_count' 값이 각 'content'의 실제 길이와 일치하는지 확인합니다. 이 값이 UI (예: 텍스트 미리보기)에서 올바르게 표시되는지 시각적으로 검증합니다.

**Status:** pending