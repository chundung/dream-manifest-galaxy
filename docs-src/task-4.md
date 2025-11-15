# Task 4: 사용자 입력 처리 및 이벤트 리스너 구현

## Description
사용자의 키보드 입력을 감지하고, 이를 표시된 연습 텍스트와 비교하여 진행 상황을 추적하는 로직을 구현합니다.

## Details
`TypingInput` 컴포넌트를 생성하거나 `TypingTextDisplay` 컴포넌트에 통합하여 `keydown` 또는 `keypress` 이벤트 리스너를 추가합니다. 사용자가 입력한 문자와 현재 표시된 텍스트의 문자를 비교하고, 현재 입력 위치(커서)를 업데이트합니다. 한글 조합형 입력의 특성을 고려하여, `e.key` 대신 `e.target.value` 변경을 감지하고 한글 조합 로직을 처리하는 방법을 고려해야 합니다 (예: `compositionend` 이벤트 활용).

## Test Strategy
영문, 한글, 특수문자를 포함한 다양한 키보드 입력을 테스트하여 정확하게 감지하고 비교하는지 확인합니다. 특히 한글 자음-모음 조합 시나리오를 여러 번 반복하여 오류 없이 처리되는지 검증합니다.

## Priority
high

## Status
pending

## Subtasks

### Subtask 1: 입력 필드 컴포넌트 구조화 및 기본 속성 설정
사용자의 타이핑 입력을 받을 HTML <textarea> 또는 <input> 요소를 포함하는 컴포넌트를 설계하고 구현합니다. 'TypingTextDisplay' 컴포넌트와 상호작용할 수 있도록 준비하며, 사용자 인터페이스(UI) 상에서 입력 영역을 명확히 정의합니다.

**Details:** 새로운 `TypingInput.js` 또는 `TypingInput.tsx` 파일을 생성하고, 기본 `<textarea>` 요소를 포함합니다. `textAreaRef`와 같은 `ref`를 사용하여 DOM 요소에 접근하고 포커스 관리가 가능하도록 설정합니다. `darkMode` 및 `isInputDisabled`와 같은 props를 받아 컴포넌트의 스타일 및 동작을 제어할 수 있도록 인터페이스를 정의합니다. `textarea`의 `onChange`, `onKeyDown`, `onPaste`, `onCompositionStart`, `onCompositionUpdate`, `onCompositionEnd` 이벤트에 대한 플레이스홀더 핸들러를 준비합니다.

**Test Strategy:** 컴포넌트가 화면에 올바르게 렌더링되고, HTML 요소에 포커스가 제대로 작동하는지 확인합니다. `TypingTextDisplay` 컴포넌트와 함께 배치하여 초기 통합 가능성 및 스타일이 충돌하지 않는지 육안으로 검증합니다.

**Status:** pending

### Subtask 2: 기본 키보드 입력 이벤트 리스너 구현 (영문 및 단일 문자)
입력 필드에 `onChange` (또는 `onInput`) 이벤트 핸들러를 추가하여, 사용자가 입력하는 영문 및 단일 문자를 감지하고, 이를 연습 텍스트와 비교하는 초기 로직을 구현합니다.

**Details:** 입력 필드의 `onChange` 이벤트에 바인딩되는 `handleTextChange` 함수를 구현합니다. 이 함수 내에서 `event.target.value`를 사용하여 현재 입력된 텍스트를 가져오고, 컴포넌트의 `text` 상태를 업데이트합니다. 백스페이스(Spacebar), 스페이스바(Spacebar), 엔터(Enter)와 같은 키 입력에 대한 기본적인 처리를 `onKeyDown` 이벤트에서 구현하고, 입력된 문자를 `TypingTextDisplay`에서 제공하는 기준 텍스트와 비교하여 `cursorPosition` 및 오타 여부를 업데이트할 준비를 합니다.

**Test Strategy:** 영문 소문자, 대문자, 숫자, 일반적인 특수문자를 순서대로 입력하고, 백스페이스로 수정했을 때, `text` 상태와 `cursorPosition`이 예상대로 업데이트되는지 React DevTools 또는 콘솔 로그를 통해 확인합니다. 엔터 키와 스페이스바가 예상대로 작동하는지 테스트합니다.

**Status:** pending

### Subtask 3: 한글 조합형 입력 처리 로직 구현 (IME 및 composition 이벤트)
한글과 같은 조합형 언어(IME) 입력을 정확하게 처리하기 위해 `compositionstart`, `compositionupdate`, `compositionend` 이벤트를 활용한 로직을 구현합니다. 이는 `e.key` 대신 `e.target.value` 변화를 중심으로 하여 한글 조합의 복잡성을 관리합니다.

**Details:** `onCompositionStart`, `onCompositionUpdate`, `onCompositionEnd` 이벤트 핸들러를 구현합니다. `compositionstart` 시 조합 중임을 나타내는 플래그를 설정하고, `compositionupdate` 시 중간 조합 상태를 관리하며, `compositionend` 시 최종적으로 조합이 완료된 한글 문자를 정확하게 캡처하여 `text` 상태에 반영합니다. IME 활성화 상태에서 `handleTextChange`가 불필요하게 여러 번 호출되는 것을 방지하고, 최종 입력된 글자만 처리하도록 로직을 조정합니다.

**Test Strategy:** 한글 자음, 모음 조합(예: ㅣ + ㅏ = 가, ㅏ + ㅣ + ㄱ = 한)을 여러 번 입력하여 최종 글자가 정확하게 인식되고 `text` 상태에 반영되는지 확인합니다. 조합 중 백스페이스를 눌렀을 때, 조합이 취소되거나 올바르게 수정되는지 테스트합니다. 영문과 한글을 번갈아 입력하며 IME 사용 시 오류 없이 처리되는지 검증합니다.

**Status:** pending

### Subtask 4: 입력 상태 중심 관리 및 텍스트 비교 로직 정교화
타이핑 연습의 현재 상태(입력된 텍스트, 커서 위치, 각 문자의 정확성 등)를 효율적으로 관리하는 중심 집중식 로직을 구축하고, 입력된 텍스트와 목표 텍스트를 문자 단위로 정교하게 비교하는 기능을 구현합니다.

**Details:** 컴포넌트 내부에 `currentInputText`, `cursorIndex`, `charStatusArray` (각 문자의 상태: 'correct', 'incorrect', 'untyped', 'current')와 같은 상태 변수를 정의합니다. `handleTextChange` 및 IME 관련 이벤트 핸들러에서 이 상태들을 업데이트합니다. 입력된 텍스트(`currentInputText`)를 `TypingTextDisplay`의 `targetText`와 문자별로 비교하여 `charStatusArray`를 생성하고 관리하는 함수를 개발합니다. 오타 발생 시 `cursorIndex`가 이동하지 않고 제자리에 머물거나, 다음 글자로 넘어가게 하는 규칙을 명확히 정의합니다.

**Test Strategy:** 정확한 입력, 오타 발생, 백스페이스 사용, 한글 조합 입력 시 `cursorIndex`와 `charStatusArray`가 예상대로 업데이트되는지 React DevTools 또는 콘솔 로그를 통해 확인합니다. 특히 여러 줄의 텍스트에서 줄바꿈 문자와 공백이 올바르게 처리되는지 검증합니다.

**Status:** pending

### Subtask 5: 시각적 커서 및 입력 피드백 UI 업데이트
입력 상태 관리 로직에서 생성된 정보를 바탕으로 'TypingTextDisplay' 컴포넌트 내부에서 현재 타이핑 위치를 나타내는 시각적 커서와 입력된 문자의 정확성(정확/오타)에 따른 시각적 피드백을 구현합니다.

**Details:** `TypingTextDisplay` 컴포넌트에 `charStatusArray` 및 `cursorIndex`를 props로 전달받아 각 문자를 렌더링할 때 `charStatusArray`의 상태('correct', 'incorrect', 'untyped')에 따라 다른 CSS 클래스 또는 인라인 스타일을 적용합니다. `cursorIndex` 위치에 깜빡이는 커서(예: `border-right` 스타일 또는 별도의 `<span>` 요소)를 표시합니다. 오타 상태의 문자는 빨간색 배경 또는 텍스트 색상으로 강조하여 오타임을 명확히 보여줍니다. Framer Motion을 활용하여 커서 이동이나 오타 피드백에 부드러운 애니메이션 효과를 추가하는 것을 고려합니다.

**Test Strategy:** 정확하게 입력된 글자가 녹색 또는 회색으로, 오타가 빨간색으로 표시되는지 시각적으로 확인합니다. 커서가 정확한 위치에 깜빡이며 이동하는지 확인합니다. 한글과 영문 모두에서 오타 및 정확한 입력 피드백이 올바르게 나타나고, 특히 줄바꿈이 있는 텍스트에서 커서가 다음 줄로 정확히 이동하는지 검증합니다.

**Status:** pending