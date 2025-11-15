# Task 8: 로컬 스토리지 기반 사용자 인증 및 프로필 관리

## Description
MVP를 위해 로컬 스토리지에 사용자 프로필 정보(username, level, experience 등)를 저장하고 관리하는 기본적인 사용자 인증 시스템을 구현합니다. 회원가입/로그인 플로우를 포함합니다.

## Details
`Auth` Redux 슬라이스를 생성하여 `isLoggedIn`, `username`, `level`, `experience` 등의 사용자 상태를 관리합니다. `localStorage` API를 사용하여 사용자 데이터를 저장하고 불러옵니다. `Login` 및 `Signup` 컴포넌트를 구현하고, 사용자 정보를 입력받아 `localStorage.setItem('user', JSON.stringify({ ... }))`로 저장하며, 페이지 로드 시 `localStorage.getItem('user')`를 통해 사용자 세션을 복원합니다.

## Test Strategy
회원가입, 로그인, 로그아웃 기능을 테스트하여 사용자 정보가 로컬 스토리지에 올바르게 저장/삭제되고, 페이지 새로고침 후에도 세션이 유지되는지 확인합니다.

## Priority
high

## Status
pending

## Subtasks