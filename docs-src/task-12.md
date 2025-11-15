# Task 12: PWA (Progressive Web App) 기본 설정 및 구현

## Description
애플리케이션이 오프라인 모드를 지원하고 사용자가 앱을 설치할 수 있도록 PWA 기능을 구현합니다.

## Details
서비스 워커(`service-worker.js`)를 등록하고, 애플리케이션 번들 및 핵심 에셋(이미지, 폰트)을 캐싱하여 오프라인에서 작동하도록 설정합니다. `manifest.json` 파일을 구성하여 앱 이름, 아이콘, 시작 URL, 표시 모드(standalone) 등을 정의합니다. `create-react-app`의 PWA 템플릿을 활용하거나 `workbox` 라이브러리를 사용합니다.

## Test Strategy
개발자 도구의 'Audit' 탭을 사용하여 PWA 점수를 확인합니다. 네트워크를 오프라인으로 전환한 후 앱이 정상적으로 로드되고 핵심 기능(타이핑 연습)이 작동하는지 테스트합니다. 브라우저에서 '홈 화면에 추가' 또는 '설치' 옵션이 나타나는지 확인합니다.

## Priority
medium

## Status
pending

## Subtasks