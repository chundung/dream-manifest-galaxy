# Task 11: Chart.js/Recharts 연동을 통한 기본 통계 시각화

## Description
사용자의 학습 진도를 시각적으로 보여주기 위해 Chart.js 또는 Recharts 라이브러리를 활용하여 기본적인 타이핑 통계(예: 시간별 WPM 추이)를 차트로 표시합니다.

## Details
`StatsChart` 컴포넌트를 생성하고 Chart.js 또는 Recharts를 사용하여 선 그래프(Line Chart)를 구현합니다. IndexedDB에 저장된 `TypingSession` 데이터에서 특정 기간(예: 최근 7일) 동안의 WPM 및 정확성 데이터를 가져와 차트의 데이터 소스로 사용합니다. 사용자가 학습 추이를 직관적으로 볼 수 있도록 Y축은 WPM/정확성, X축은 시간(날짜)으로 설정합니다.

## Test Strategy
여러 타이핑 세션을 기록한 후 통계 화면에서 차트가 올바르게 렌더링되는지 확인합니다. 데이터가 추가될 때 차트가 업데이트되고, WPM 또는 정확성 변화가 그래프에 정확히 반영되는지 검증합니다.

## Priority
medium

## Status
pending

## Subtasks