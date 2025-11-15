# Task 14: Framer Motion을 활용한 부드러운 애니메이션 효과 추가

## Description
사용자 경험을 향상시키기 위해 Framer Motion 라이브러리를 사용하여 UI 전환 및 피드백에 부드러운 애니메이션 효과를 적용합니다.

## Details
Framer Motion의 `motion` 컴포넌트와 `useAnimation` 훅을 사용하여 버튼 클릭, 모달 열기/닫기, 세션 결과 표시 전환, 오타 피드백 등 주요 UI 요소에 fade, slide, scale 등의 애니메이션 효과를 추가합니다. 특히 오타 시각적 피드백에 경고 애니메이션(예: 흔들림)을 추가하여 직관적인 피드백을 제공합니다.

## Test Strategy
애플리케이션을 사용하며 주요 UI 상호작용에서 애니메이션이 부드럽게 작동하고 사용자 피드백을 방해하지 않는지 확인합니다. 애니메이션이 적용된 컴포넌트의 상태 변화에 따라 예상대로 동작하는지 검증합니다.

## Priority
low

## Status
pending

## Subtasks

### Subtask 1: Framer Motion 기본 구조 설정 및 공통 애니메이션 유틸리티 정의
Framer Motion 라이브러리를 애플리케이션에 통합하기 위한 기본 설정을 완료하고, fade, slide, scale 등 재사용 가능한 공통 애니메이션 variants를 정의합니다.

**Details:** motion 컴포넌트를 사용하고 initial, animate, exit 속성을 활용하기 위한 환경을 조성합니다. 자주 사용할 fade (투명도), slide (위치), scale (크기) 등의 variants 객체를 animation.ts 또는 유사한 유틸리티 파일에 정의하여 재사용성을 높입니다.

**Test Strategy:** 더미 컴포넌트에 정의된 variants를 적용하여 애니메이션이 올바르게 트리거되고 예상대로 동작하는지 시각적으로 확인합니다. motion 컴포넌트가 렌더링되는지 확인합니다.

**Status:** pending

### Subtask 2: 버튼 및 주요 UI 요소에 기본 상호작용 애니메이션 적용
애플리케이션 내의 버튼 클릭, 호버 등 주요 UI 상호작용에 fade 및 scale 애니메이션 효과를 적용하여 사용자 피드백을 강화합니다.

**Details:** motion.button 또는 다른 motion 컴포넌트를 사용하여 whileHover, whileTap 속성을 통해 버튼에 시각적 피드백 애니메이션(예: 살짝 커지는 scale, 투명도 변화)을 추가합니다. 기타 중요한 상호작용 가능한 UI 요소에도 유사한 효과를 적용합니다.

**Test Strategy:** 각 버튼 및 UI 요소를 클릭하거나 호버링하여 정의된 애니메이션이 부드럽게 재생되고 사용성을 해치지 않는지 시각적으로 확인합니다.

**Status:** pending

### Subtask 3: 모달 컴포넌트 열기/닫기 전환 애니메이션 구현
모달 컴포넌트가 열리고 닫힐 때 AnimatePresence를 활용하여 부드러운 fade 및 slide 전환 애니메이션을 적용합니다.

**Details:** 기존 모달 컴포넌트를 motion.div로 감싸고, AnimatePresence 컴포넌트를 사용하여 모달이 DOM에서 제거될 때 exit 애니메이션이 실행되도록 합니다. initial, animate, exit 속성에 fade 또는 slide variants를 적용하여 자연스러운 등장/퇴장 효과를 구현합니다.

**Test Strategy:** 모달을 열고 닫으며 애니메이션이 부드럽게 시작하고 끝나는지, 내용이 왜곡되지 않는지 시각적으로 확인합니다. 여러 번 반복하여 안정성을 테스트합니다.

**Status:** pending

### Subtask 4: 세션 결과 화면 전환 애니메이션 적용
타이핑 세션이 완료된 후 결과 화면으로 전환될 때 slide 또는 fade 애니메이션을 적용하여 사용자에게 시각적인 흐름을 제공합니다.

**Details:** 세션 결과가 표시되는 컴포넌트 또는 뷰에 motion.div를 적용하고, initial, animate 속성을 사용하여 아래에서 위로 slide 업 또는 fade 인 효과를 구현합니다. 필요한 경우 AnimatePresence를 사용하여 이전 화면과의 전환을 부드럽게 합니다.

**Test Strategy:** 타이핑 세션을 완료한 후 결과 화면이 나타날 때 애니메이션이 의도한 대로 자연스럽게 재생되는지 확인합니다. 다양한 조건에서 전환 효과가 일관되게 나타나는지 검증합니다.

**Status:** pending

### Subtask 5: 오타 발생 시 시각적 경고 애니메이션 (흔들림) 구현
사용자가 오타를 입력했을 때 useAnimation 훅을 활용한 '흔들림' 경고 애니메이션을 오타 피드백에 추가하여 즉각적인 시각적 피드백을 제공합니다.

**Details:** 오타 감지 로직(Task 5에서 제공될 것)과 연동하여 오타 발생 시 useAnimation 훅으로 제어되는 motion 컴포넌트의 animate 함수를 호출합니다. keyframes 또는 transition 속성을 사용하여 좌우로 짧게 흔들리는 효과를 구현합니다. 예: x 값 [-10px, 10px, 0px]로 빠르게 변화.

**Test Strategy:** 의도적으로 오타를 입력하여 흔들림 애니메이션이 즉시, 한 번만, 눈에 띄게 재생되는지 확인합니다. 반복적인 오타 발생 시 애니메이션이 중첩되지 않고 올바르게 동작하는지 테스트합니다.

**Status:** pending