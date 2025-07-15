import { initLayoutSPA } from '/js/layout-loader.js';

const routes = {
    '/board-service/write': {
        html: '/html/board/boardForm.html',
        css: '/css/board/boardWrite.css',
    },
    '/board-service/edit': {
        html: '/html/board/boardForm.html',
        css: '/css/board/boardWrite.css',
    },
    '/board-service/list': {
        html: '/html/board/board.html',
        css: '/css/board/board.css',
    },
    '/board-service/detail': {
        html: '/html/board/boardDetail.html',
        css: '/css/board/boardDetail.css',
    },
};

function parsePath() {
    const fullPath = location.hash.slice(1).split('?')[0];
    if (fullPath.startsWith('/board-service/list')) {
        return '/board-service/list';
    }
    return fullPath;
}

async function loadPage() {
    const key = parsePath();
    const pathInfo = routes[key] || {};
    const htmlPath = pathInfo.html || '/html/error/404.html';
    const cssPath = pathInfo.css || null;

    document.querySelectorAll('link[data-dynamic-css]').forEach(el => el.remove());
    if (cssPath) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${cssPath}?t=${Date.now()}`;
        link.setAttribute('data-dynamic-css', '');
        document.head.appendChild(link);
    }

    try {
        const res = await fetch(htmlPath);
        const text = await res.text();
        const doc = new DOMParser().parseFromString(text, 'text/html');
        document.getElementById('app').innerHTML = doc.body.innerHTML;
    } catch {
        document.getElementById('app').innerHTML = '<p>페이지를 로드할 수 없습니다.</p>';
    }

    await initLayoutSPA();
}

window.addEventListener('load', loadPage);
window.addEventListener('hashchange', loadPage);
