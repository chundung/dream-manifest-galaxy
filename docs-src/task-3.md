# Task 3: 타이핑 연습 텍스트 표시 컴포넌트 개발

## Description
사용자가 화면에 표시된 한글 텍스트를 따라 입력할 수 있도록 연습 텍스트를 렌더링하는 UI 컴포넌트를 개발합니다. 이 컴포넌트는 입력 상태에 따라 텍스트의 각 문자를 동적으로 표시할 수 있어야 합니다.

## Details
`TypingTextDisplay` 컴포넌트를 생성하여 연습 텍스트 문자열을 props로 받습니다. 텍스트를 개별 문자로 분리하고, 각 문자를 `<span>` 태그 등으로 렌더링합니다. 사용자 입력과 현재 위치를 나타내는 인덱스를 추적하여, 올바르게 입력된 문자, 틀린 문자, 아직 입력하지 않은 문자에 대해 다른 스타일(예: 색상)을 적용할 수 있도록 합니다.

## Test Strategy
다양한 길이의 한글 텍스트를 입력하여 올바르게 표시되는지 확인합니다. 사용자 가상 입력에 따라 문자의 스타일이 정확히 변경되는지 시각적으로 검증합니다.

## Priority
high

## Status
completed

## Subtasks

### Subtask 1: TypingTextDisplay 컴포넌트 초기 설정 및 기본 텍스트 렌더링
`TypingTextDisplay` 컴포넌트를 생성하고, `text` prop으로 받은 문자열을 개별 문자로 분리하여 `<span>` 태그로 화면에 표시합니다. 초기에는 모든 문자가 기본 스타일을 가집니다.

**Details:** `src/components/TypingTextDisplay.tsx` 파일을 생성합니다. `React.FC`를 사용하여 컴포넌트를 정의하고, `text: string` prop을 받습니다. `text.split('')`을 사용하여 문자를 분리하고, `map` 함수를 이용해 각 문자에 고유한 `key`를 가진 `<span>` 요소로 렌더링합니다. Tailwind CSS를 사용하여 기본 텍스트 스타일을 적용합니다.

**Test Strategy:** 다양한 길이의 한글 문자열을 `text` prop으로 전달하여 모든 문자가 순서대로 올바르게 렌더링되는지 시각적으로 확인합니다. 개발자 도구를 사용하여 각 문자가 별도의 `<span>` 요소로 존재하는지 검증합니다.

**Status:** completed

### Subtask 2: 입력 진행 상태 및 오류 추적을 위한 상태 관리 구현
사용자의 현재 입력 위치(`currentInputIndex`), 입력된 문자열(`typedCharacters`), 그리고 발생한 오류(`errorIndices`)를 추적하기 위한 React `useState` 훅을 `TypingTextDisplay` 컴포넌트 내부에 정의합니다.

**Details:** `useState`를 사용하여 `currentInputIndex` (number, 초기값 0), `typedCharacters` (string, 초기값 ""), `errorIndices` (Set<number> 또는 number[], 초기값 []) 상태 변수를 선언합니다. 이 상태들은 외부에서 전달될 입력 이벤트 핸들러를 통해 업데이트될 준비를 합니다.

**Test Strategy:** 컴포넌트 스토리북 또는 임시 부모 컴포넌트에서 `currentInputIndex`, `typedCharacters`, `errorIndices` 상태를 수동으로 변경하며, 상태 변경이 컴포넌트 내부에 올바르게 반영되는지 확인합니다.

**Status:** completed

### Subtask 3: 입력 상태에 따른 문자별 동적 스타일링 로직 구현
`currentInputIndex`, `typedCharacters`, `errorIndices` 상태를 기반으로 각 문자에 '올바른 입력', '틀린 입력', '현재 입력 위치', '미입력' 상태에 해당하는 CSS 클래스를 동적으로 적용하는 로직을 구현합니다.

**Details:** 각 문자를 렌더링하는 `map` 함수 내부에 조건부 로직을 추가합니다. `currentInputIndex`와 문자의 인덱스를 비교하여 현재 입력 위치를 식별하고, `typedCharacters`의 해당 인덱스 문자와 원본 `text`의 문자를 비교하여 올바른/틀린 입력을 판별합니다. `errorIndices`를 활용하여 틀린 문자를 표시합니다. Tailwind CSS 클래스(예: `text-green-500`, `text-red-500`, `bg-yellow-200`, `text-gray-400`)를 정의하고 적용합니다.

**Test Strategy:** `currentInputIndex`, `typedCharacters`, `errorIndices`를 다양한 시나리오(모든 문자 올바르게 입력, 중간에 틀린 문자, 특정 위치에서 멈춤 등)로 설정하여 각 문자의 색상 및 배경 스타일이 예상대로 변경되는지 시각적으로 확인합니다.

**Status:** completed

### Subtask 4: 외부 입력 이벤트 처리 및 `TypingTextDisplay` 상태 업데이트 함수 구현
`TypingTextDisplay` 컴포넌트가 외부(예: 부모 컴포넌트의 키보드 입력 핸들러)로부터 입력 문자를 받아 내부 상태(`currentInputIndex`, `typedCharacters`, `errorIndices`)를 업데이트하는 함수를 구현합니다.

**Details:** `handleInput`과 같은 함수를 컴포넌트 내부에 정의하거나, `onInput` prop으로 전달받아 사용합니다. 이 함수는 입력된 문자(예: `key`)를 인자로 받아, 현재 `currentInputIndex`의 원본 텍스트 문자와 비교합니다. 일치하면 `currentInputIndex`를 증가시키고 `typedCharacters`를 업데이트합니다. 불일치하면 `errorIndices`에 현재 인덱스를 추가하고 `typedCharacters`에 틀린 문자를 추가합니다. 백스페이스 처리 로직도 포함합니다.

**Test Strategy:** 부모 컴포넌트에서 가상 키보드 입력을 시뮬레이션하여 `handleInput` 함수를 호출합니다. 올바른 문자, 틀린 문자, 백스페이스 입력 시 `currentInputIndex`, `typedCharacters`, `errorIndices`가 정확하게 업데이트되고 UI에 반영되는지 시각적으로 확인합니다.

**Status:** completed

### Subtask 5: 컴포넌트 접근성 및 성능 최적화
`TypingTextDisplay` 컴포넌트의 접근성을 개선하고, 대량의 텍스트 처리 시 발생할 수 있는 성능 문제를 최소화합니다.

**Details:** 각 `<span>` 요소에 `aria-label` 또는 `sr-only` 텍스트를 추가하여 스크린 리더 사용자를 위한 정보를 제공합니다. `React.memo`를 사용하여 불필요한 리렌더링을 방지하고, `key` prop을 각 문자에 고유하게 할당하여 리스트 렌더링 성능을 최적화합니다. `useCallback`을 사용하여 `handleInput`과 같은 함수가 불필요하게 재생성되지 않도록 합니다.

**Test Strategy:** Lighthouse 또는 유사한 도구를 사용하여 접근성 점수를 확인합니다. 대량의 텍스트(예: 1000자 이상)를 입력하여 컴포넌트의 렌더링 성능이 저하되지 않는지 확인합니다. React DevTools를 사용하여 불필요한 리렌더링이 발생하는지 프로파일링합니다.

**Status:** completed