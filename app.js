const express = require('express');
const path = require('path');
const app = express();

// ✅ 정적 파일 먼저!
app.use(express.static(path.join(__dirname, 'public')));

// ✅ 존재하지 않는 HTML 경로 요청만 spa.html로 대응 (SPA용)
app.get(['/', '/dashboard', '/board', '/account'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'spa.html'));
});

// ❗ 404 처리 (선택)
app.use((req, res) => {
    res.status(404).send('페이지를 찾을 수 없습니다.');
});

module.exports = app;
