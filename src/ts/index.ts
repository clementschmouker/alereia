import '../scss/styles.scss';

import Universe from './univers';
import { addGlitchEffect } from './title';
import html2canvas from 'html2canvas';


// MOBILE NAV
const navButtonMobile = document.querySelector('.nav-small__button');
const navMobile = document.querySelector('.nav-small');

let navMobileOpen = false;

navButtonMobile?.addEventListener('click', () => {
    navMobileOpen = !navMobileOpen;
    navMobile?.classList.toggle('open');
});

const mediaMobileButton = document.querySelector('.nav-small__content .nav__medias');
const mediaMobile = document.querySelector('.nav-small__content .nav__medias');

mediaMobileButton?.addEventListener('click', () => {
    mediaMobile?.classList.toggle('revealed');
});


// UNIVERSE IF EXISTS
const universeElement = document.querySelector('#univers');
if (universeElement) {
    const universe = Universe();
    universe.init();
}

// GLITCH ELEMENTS
const glitchElements = document.querySelectorAll('.glitch-target');
if (glitchElements) {
    glitchElements.forEach((element) => {
        addGlitchEffect(element as HTMLElement);
    });
}


// GLITCH EFFECT
const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.classList.add('glitchCanvas');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
if (!ctx) throw new Error('2D context not supported');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let snapshot: HTMLCanvasElement | null = null;

const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

function disableBackdropFilterTemporarily(): void {
    document.body.classList.add('no-backdrop-blur');
}

function enableBackdropFilter(): void {
    document.body.classList.remove('no-backdrop-blur');
}

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    takeSnapshot();
});

function takeSnapshot(): void {
    if (canvas.width === 0 || canvas.height === 0) {
        console.error('Canvas has invalid dimensions (width or height is 0)');
        return;
    }

    if (isFirefox) {
        disableBackdropFilterTemporarily();
    }

    document.body.offsetHeight;

    html2canvas(document.body).then((canvasSnapshot: any) => {
        if (canvasSnapshot.height === 0 || canvasSnapshot.width === 0) {
            console.error('Snapshot failed: generated canvas has invalid dimensions.');
            return;
        }
        snapshot = canvasSnapshot;
        console.log('Snapshot taken successfully!');
        if (isFirefox) enableBackdropFilter();
    }).catch((error: any) => {
        console.error('Snapshot error:', error);
        if (isFirefox) enableBackdropFilter();
    });
}

function drawGlitch(): void {
    if (!snapshot || !ctx) return;

    ctx.clearRect(0, 0, width, height);

    const glitchRects = Math.floor(Math.random() * 4) + 1; // 1–4 glitches per burst

    for (let i = 0; i < glitchRects; i++) {
        // Random small width and height for glitch slice
        const sw = Math.random() * 150 + 20; // Max 150px width
        const sh = Math.random() * 40 + 10;  // Height of slice

        // Random source position on the snapshot
        const sx = Math.random() * (width - sw);
        const sy = Math.random() * (height - sh);

        // Random destination position (slightly shifted)
        const dx = sx + (Math.random() * 30 - 15); // Shifted -15px to +15px
        const dy = sy + (Math.random() * 20 - 10); // Shifted -10px to +10px

        ctx.drawImage(snapshot, sx, sy, sw, sh, dx, dy, sw, sh);
    }
}



function glitchEffect(): void {
    if (!snapshot) {
        console.log('Waiting for snapshot...');
        setTimeout(glitchEffect, 500); 
        return;
    }

    const glitchBurstFrames = Math.floor(Math.random() * 4) + 2;
    let framesRendered = 0;

    const burst = setInterval(() => {
        drawGlitch();
        framesRendered++;

        if (framesRendered >= glitchBurstFrames) {
            clearInterval(burst);
            ctx?.clearRect(0, 0, width, height);

            const nextDelay = Math.random() * 4000 + 1000;
            setTimeout(glitchEffect, nextDelay);
        }
    }, 100);
}


window.addEventListener('load', () => {
    console.log('Page fully loaded!');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    takeSnapshot();
    glitchEffect();
});
