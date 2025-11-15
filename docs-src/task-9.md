# Task 9: IndexedDB 기반 타이핑 세션 데이터 저장

## Description
사용자의 타이핑 세션 결과(`TypingSession` 데이터)를 IndexedDB에 저장하여 영구적인 기록 및 오프라인 기능을 지원하도록 구현합니다.

## Details
IndexedDB를 사용하여 `TypingSession` 데이터 모델(`id`, `user_id`, `text_id`, `wpm`, `accuracy`, `duration`, `timestamp`)을 정의하고, 타이핑 세션 완료 시 이 데이터를 IndexedDB의 `TypingSession` 스토어에 저장하는 로직을 구현합니다. `user_id`는 로컬 스토리지에 저장된 사용자 ID를 활용합니다.

## Test Strategy
여러 타이핑 세션을 완료한 후 개발자 도구의 Application 탭에서 IndexedDB에 `TypingSession` 데이터가 올바르게 저장되는지 확인합니다. 새로고침 후에도 기록이 유지되는지 검증합니다.

## Priority
medium

## Status
pending

## Subtasks