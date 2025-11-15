# Task 5: 실시간 타이핑 속도(WPM) 및 정확성 계산 로직 구현

## Description
사용자가 텍스트를 입력하는 동안 실시간으로 WPM(분당 단어 수)과 정확성(%)을 계산하여 표시하는 기능을 개발합니다.

## Details
타이핑 시작 시점을 기록하고, 사용자가 입력할 때마다 경과 시간과 문자를 업데이트합니다. 입력된 올바른 문자 수와 총 입력 문자 수를 기반으로 정확성을 계산합니다. WPM은 일반적으로 (총 올바른 문자 수 / 5) / (경과 시간(분)) 공식으로 계산합니다. 이 로직을 Redux 슬라이스 또는 사용자 정의 훅으로 구현하여 재사용성과 상태 관리를 용이하게 합니다.

## Test Strategy
다양한 속도와 정확도로 텍스트를 입력하며 WPM 및 정확성 수치가 실시간으로 올바르게 업데이트되는지 확인합니다. 특히 오타 발생 시 정확성 감소, 빠른 입력 시 WPM 증가가 정확히 반영되는지 검증합니다.

## Priority
high

## Status
pending

## Subtasks

### Subtask 1: WPM/정확성 계산을 위한 Redux 슬라이스 또는 커스텀 훅 초기 설정
실시간 WPM 및 정확성 계산에 필요한 상태(예: 타이핑 시작 시간, 입력된 올바른 문자 수, 총 입력된 문자 수, 현재 WPM, 정확성 등)를 정의하고, 이를 관리할 Redux Toolkit 슬라이스 또는 커스텀 훅의 기본 구조를 설정합니다.

**Details:** 프로젝트의 `src/features/typing` 디렉토리 내에 `typingSlice.js` 파일을 생성하거나, `src/hooks` 디렉토리 내에 `useTypingStats.js` 커스텀 훅 파일을 생성합니다. `startTime`, `typedCharacters`, `correctCharacters`, `totalCharacters`, `wpm`, `accuracy`, `isRunning` 등의 필수 상태 변수를 초기값과 함께 정의합니다. Redux의 경우 `createSlice`를 사용하여 초기 상태와 비어있는 리듀서 맵을 설정합니다.

**Test Strategy:** 슬라이스/훅 파일이 성공적으로 생성되고, 정의된 상태 변수들이 올바른 초기값을 가지는지 유닛 테스트 또는 더미 컴포넌트 마운트를 통해 확인합니다.

**Status:** pending

### Subtask 2: 타이핑 세션 시작/종료 및 경과 시간 관리 로직 구현
타이핑 세션이 시작될 때 `startTime`을 기록하고, 세션이 진행되는 동안 현재까지의 경과 시간을 실시간으로 계산하여 업데이트하는 로직을 구현합니다. 세션 종료 시 타이머를 정지하는 기능도 포함합니다.

**Details:** 슬라이스 또는 훅 내부에 타이핑 시작 시 `Date.now()`를 `startTime`으로 설정하는 액션(Redux) 또는 함수(Hook)를 추가합니다. `useEffect`와 `setInterval` 또는 `requestAnimationFrame`을 사용하여 `isRunning` 상태가 `true`일 때 매 초(또는 더 빈번하게) 경과 시간을 계산하고 `elapsedTime` 상태를 업데이트합니다. 세션 종료 시 타이머를 해제하는 클린업 로직도 구현합니다.

**Test Strategy:** 타이핑 시작/정지 액션(함수)을 호출한 후 `elapsedTime`이 실시간으로 증가하는지 확인합니다. 타이머가 정확히 시작되고 멈추는지, 경과 시간 계산이 올바른지 유닛 테스트를 수행합니다.

**Status:** pending

### Subtask 3: 사용자 입력 문자 처리 및 정확성 실시간 계산 로직 구현
사용자의 문자 입력을 감지하고, 이를 참고 텍스트와 비교하여 올바른 문자 수와 총 입력 문자 수를 실시간으로 업데이트하며, 이를 기반으로 현재 정확성(%)을 계산하는 로직을 구현합니다.

**Details:** `TypingInput` 컴포넌트로부터 입력된 문자를 받는 액션(Redux) 또는 함수(Hook)를 구현합니다. 입력된 문자를 처리할 때마다 `totalCharacters`를 증가시키고, 입력된 문자가 현재 참고 텍스트의 해당 위치 문자와 일치하는 경우 `correctCharacters`도 증가시킵니다. `accuracy = (correctCharacters / totalCharacters) * 100` 공식을 사용하여 정확성을 계산하고 상태에 반영합니다.

**Test Strategy:** 다양한 입력 시나리오(정확한 입력, 오타 발생, 공백 입력 등)에 대해 `correctCharacters`, `totalCharacters`, `accuracy` 상태가 예상대로 업데이트되는지 유닛 테스트를 통해 확인합니다. 특히 오타 발생 시 `accuracy`가 감소하는지 검증합니다.

**Status:** pending

### Subtask 4: WPM (분당 단어 수) 실시간 계산 로직 개발
올바르게 입력된 문자 수(`correctCharacters`)와 현재까지의 경과 시간(`elapsedTimeInMinutes`)을 활용하여 WPM을 실시간으로 계산하고 업데이트하는 로직을 구현합니다.

**Details:** `wpm = (correctCharacters / 5) / (elapsedTime / 60)` 공식을 적용하여 WPM을 계산합니다. `elapsedTime`은 초 단위이므로, 이를 60으로 나누어 분 단위로 변환합니다. `correctCharacters` 또는 `elapsedTime` 상태가 변경될 때마다 이 계산이 자동으로 수행되도록 구현합니다. Redux의 경우 Selector를 통해 계산하거나, 훅의 경우 `useMemo` 또는 `useEffect` 내부에서 계산합니다.

**Test Strategy:** 다양한 `correctCharacters`와 `elapsedTime` 값에 대해 WPM 계산이 정확하게 이루어지는지 유닛 테스트를 수행합니다. 특히 초기 상태, 입력이 적은 경우, 시간이 많이 경과한 경우 등의 엣지 케이스를 확인합니다.

**Status:** pending

### Subtask 5: 계산 결과 통합 및 타이핑 세션 초기화/재설정 기능 구현
앞서 구현된 WPM, 정확성, 경과 시간 등의 모든 계산 로직들을 Redux 슬라이스 또는 커스텀 훅 내부에서 완전히 통합하고, 새로운 타이핑 세션을 시작할 수 있도록 모든 통계 및 타이머 관련 상태를 초기값으로 재설정하는 기능을 추가합니다.

**Details:** Redux의 경우 모든 액션(예: `startTyping`, `stopTyping`, `handleInput`, `resetSession`)과 해당 리듀서를 `typingSlice.js` 내부에 정의합니다. 커스텀 훅의 경우 `useTypingStats` 훅이 모든 상태와 계산 로직, 그리고 시작, 정지, 입력 처리, 재설정 함수를 반환하도록 합니다. `resetSession` 액션 또는 함수는 모든 상태를 초기값으로 되돌리고 타이머를 정지시킵니다.

**Test Strategy:** 전체 슬라이스/훅의 엔드투엔드 테스트를 수행하여 모든 기능(시작, 입력, 정지, 재설정)이 순조롭게 작동하는지 확인합니다. `resetSession` 호출 후 모든 통계 값이 초기 상태로 돌아가는지 검증합니다.

**Status:** pending