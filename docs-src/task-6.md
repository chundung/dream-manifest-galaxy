# Task 6: 오타 시각적 피드백 시스템 구현

## Description
사용자가 오타를 입력했을 때 즉각적인 시각적 피드백을 제공하는 기능을 구현합니다. 이는 사용자의 학습 경험을 개선하는 데 중요합니다.

## Details
오타 발생 시 `TypingTextDisplay` 컴포넌트의 해당 문자 요소에 특정 CSS 클래스(예: `error-char`)를 추가하거나 인라인 스타일을 적용하여 텍스트 색상을 빨간색으로 변경하거나 배경을 강조합니다. 오타가 수정되면 해당 스타일을 제거합니다. 필요한 경우 Framer Motion을 활용하여 짧은 시각적 애니메이션(예: 흔들림)이나 소리 피드백을 추가하는 것을 고려합니다.

## Test Strategy
의도적으로 오타를 발생시키고 시각적 피드백이 즉시 나타나는지 확인합니다. 오타를 수정했을 때 피드백이 사라지는지, 여러 오타가 동시에 발생했을 때 각 오타가 정확히 표시되는지 테스트합니다.

## Priority
medium

## Status
pending

## Subtasks

### Subtask 1: 오타 상태 관리 로직 구현
사용자의 입력과 목표 텍스트를 비교하여 각 문자의 오타 상태(정확, 오타, 미입력)를 추적하는 핵심 로직을 개발합니다. 이 상태는 `TypingTextDisplay` 컴포넌트의 부모 컴포넌트나 Redux 스토어에서 관리되어야 합니다.

**Details:** Task 4의 핵심 타이핑 로직(Task 4)과 통합하여, 입력된 문자와 목표 문자를 비교하는 함수를 작성합니다. 각 문자의 상태를 저장할 배열 또는 맵 형태의 상태(예: `charStatus: Array<'correct' | 'incorrect' | 'untyped'>`)를 정의하고, 사용자 입력이 발생할 때마다 이 `charStatus`를 업데이트합니다.

**Test Strategy:** 의도적으로 오타를 발생시키고 수정하며 `charStatus` 배열이 예상대로 'incorrect' 및 'correct' 상태로 업데이트되는지 콘솔 로그를 통해 확인합니다. 백스페이스 사용 시 상태가 올바르게 되돌려지는지 검증합니다.

**Status:** pending

### Subtask 2: TypingTextDisplay 컴포넌트에 오타 상태 props 전달
Subtask 1에서 관리되는 오타 상태 데이터인 `charStatus`를 `TypingTextDisplay` 컴포넌트로 props를 통해 전달하도록 수정합니다.

**Details:** `TypingTextDisplay` 컴포넌트의 인터페이스를 업데이트하여 `charStatus` 배열을 새로운 prop으로 받도록 합니다. 부모 컴포넌트에서 Subtask 1의 상태 데이터를 이 prop으로 전달합니다.

**Test Strategy:** `TypingTextDisplay` 컴포넌트 내부에서 전달받은 `charStatus` prop의 값이 예상대로 수신되는지, 배열의 각 요소가 올바른 문자 상태를 반영하는지 개발자 도구의 React 컴포넌트 탭을 통해 확인합니다.

**Status:** pending

### Subtask 3: TypingTextDisplay 컴포넌트 오타 시각적 피드백 스타일 적용
`TypingTextDisplay` 컴포넌트가 `charStatus` prop을 기반으로 각 문자에 적절한 CSS 클래스 또는 인라인 스타일을 적용하여 오타를 시각적으로 표시하도록 구현합니다. 오타 발생 시 텍스트 색상을 빨간색으로 변경하거나 배경을 강조합니다.

**Details:** `TypingTextDisplay` 컴포넌트 내부의 각 문자를 렌더링하는 `span` 요소에 접근합니다. 해당 문자의 `charStatus`가 'incorrect'일 경우 `error-char`와 같은 특정 CSS 클래스를 조건부로 추가하거나, `style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.2)' }}`와 같은 인라인 스타일을 적용합니다. 기존의 현재 입력 위치 하이라이트와 시각적 충돌이 없도록 스타일 우선순위를 고려합니다.

**Test Strategy:** 의도적으로 오타를 입력했을 때 해당 문자가 즉시 빨간색으로 변경되거나 배경이 강조되는지 시각적으로 확인합니다. 여러 오타가 동시에 발생했을 때 각 오타가 정확히 표시되는지 테스트합니다.

**Status:** pending

### Subtask 4: 오타 수정 시 시각적 피드백 해제 로직 구현
사용자가 오타를 입력한 후 이를 백스페이스 등으로 수정하여 올바른 문자를 입력했을 때, 이전에 적용되었던 오타 시각적 피드백이 즉시 사라지도록 로직을 구현합니다.

**Details:** Subtask 1의 `charStatus` 업데이트 로직을 개선하여, 오타가 수정되었을 때 해당 문자의 상태가 'incorrect'에서 'correct' 또는 'untyped'로 전환되도록 합니다. `TypingTextDisplay` 컴포넌트는 업데이트된 `charStatus` prop을 받아 오타 스타일을 자동으로 제거합니다.

**Test Strategy:** 오타를 발생시키고 피드백이 나타난 후, 백스페이스로 오타를 지우고 올바른 문자를 입력했을 때 피드백이 정확히 사라지는지 확인합니다. 커서가 앞뒤로 이동할 때 피드백 상태가 올바르게 유지되는지 검증합니다.

**Status:** pending

### Subtask 5: Framer Motion 애니메이션 및 선택적 사운드 피드백 통합
오타 발생 시 더 직관적인 사용자 경험을 위해 Framer Motion을 사용하여 짧은 시각적 애니메이션(예: 흔들림)을 추가하고, 선택적으로 사운드 피드백을 통합합니다.

**Details:** `TypingTextDisplay` 컴포넌트 내부의 `CharacterSpan`에 Framer Motion의 `motion` 컴포넌트를 적용합니다. `charStatus`가 'incorrect'로 변경될 때, `animate` prop을 사용하여 `x: [-2, 2, -2, 2, 0]`과 같은 짧은 흔들림 애니메이션을 구현합니다. 또한, 오타 발생 시 재생될 짧은 사운드 이펙트 파일을 준비하고, Subtask 1의 오타 감지 로직과 연동하여 특정 조건에서 `new Audio().play()`를 통해 사운드를 재생하도록 로직을 추가합니다.

**Test Strategy:** 오타를 입력했을 때 흔들림 애니메이션이 자연스럽게 재생되고 사용자 피드백을 방해하지 않는지 확인합니다. 사운드 피드백을 활성화한 상태에서 오타 발생 시 지정된 사운드가 재생되는지, 반복적인 오타 발생 시 사운드 중첩이나 지연 없이 올바르게 재생되는지 테스트합니다.

**Status:** pending