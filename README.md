# REST API Server

## 프로젝트 설명
간단한 Node.js Express REST API 서버 프로젝트입니다.

## 기술 스택
- Node.js
- Express.js
- Body-Parser
- CORS

## 설치 방법
1. 저장소 클론
```bash
git clone https://github.com/kunwoo1110/rest-api-server.git
cd rest-api-server

## 의존성 설치
npm install 

## 실행 방법
npm run dev

# 프로덕션 모드
npm start
```

## API 목록
- GET /api/users: 모든 사용자 조회
- GET /api/users/:id: 특정 사용자 조회
- POST /api/users: 새로운 사용자 생성
- PUT /api/users/:id: 기존 사용자 업데이트
- DELETE /api/users/:id: 사용자 삭제

