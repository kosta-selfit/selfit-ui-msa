// /js/layout-loader.js
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';
import { initHeader } from './header.js';

async function loadLayoutFragment() {
    try {
        const res = await axios.get('/html/fragments/layout.html');
        const text = res.data;
        const doc = new DOMParser().parseFromString(text, 'text/html');

        const headerHTML = doc.querySelector('#header')?.innerHTML;
        const sidebarHTML = doc.querySelector('.sideBar')?.innerHTML;

        const headerEl = document.querySelector('#header');
        const sideEl   = document.querySelector('.sideBar');

        if (headerEl && sideEl && headerHTML != null && sidebarHTML != null) {
            headerEl.innerHTML  = headerHTML;
            sideEl.innerHTML    = sidebarHTML;
            // DOM 삽입 직후 → 비동기 태스크 큐로 밀어 넣어서 "정말 DOM에 붙은 뒤" 실행되게 함
            requestAnimationFrame(() => initHeader());
        } else {
            console.warn('layout-container not found or fragment content missing');
        }

        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.type    = 'module';
            s.src     = '/js/header.js';
            s.onload  = () => {
                initHeader();
                resolve();
            };
            s.onerror = reject;
            document.body.appendChild(s);
        });
    } catch (err) {
        console.error('layout fragment 로드 실패:', err);
    }
}

export async function initLayoutSPA() {
    await loadLayoutFragment();
}

export function initLayoutStatic() {
    loadLayoutFragment().catch(err => console.error('layout 로드 실패:', err));
}
