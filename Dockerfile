# 1. Node.js 베이스 이미지 사용
FROM node:18

# 2. 앱 디렉터리 생성 및 설정
WORKDIR /app

# 3. package.json과 lock 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 전체 프로젝트 복사
COPY . .

# 6. 환경변수 포트 설정 (옵션)
ENV PORT=3000

# 7. 컨테이너 실행 시 명령
CMD [ "node", "server.js" ]

# 8. 외부에 노출할 포트
EXPOSE 3000
