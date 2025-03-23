import '../scss/styles.scss';

import * as THREE from 'three';
import Universe from './univers';

const navButtonMobile = document.querySelector('.nav-small__button');
const navMobile = document.querySelector('.nav-small');
let navMobileOpen = false;

if (navButtonMobile) {
    navButtonMobile.addEventListener('click', () => {
        console.log('CLICK');
        navMobileOpen = !navMobileOpen;
        navMobile?.classList.toggle('open');
    });
}

const mediaMobileButton = document.querySelector('.nav-small__content .nav__medias');
const mediaMobile = document.querySelector('.nav-small__content .nav__medias');

if (mediaMobileButton && mediaMobile) {
    mediaMobileButton.addEventListener('click', () => {
        mediaMobile.classList.toggle('revealed');
    });
}

if (document.querySelector('#univers')) {
    const universe = Universe();
    universe.init();
}



// glitch effect
const canvas = document.createElement('canvas');
canvas.classList.add('glitchCanvas');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let snapshot; // Holds the page snapshot as an image


// Listen for window resize events to adjust the canvas size
window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    takeSnapshot(); // Retake snapshot on resize
});

// Ensure the canvas has valid dimensions and the page is fully loaded
function initialize() {
    // Make sure the canvas is correctly sized before taking the snapshot
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Now take the snapshot after the canvas is correctly sized
    takeSnapshot();
    glitchEffect();
}

document.addEventListener("DOMContentLoaded", function() {
    html2canvas(document.body).then(canvasSnapshot => {
        snapshot = canvasSnapshot;
        console.log("Snapshot taken successfully!");
    }).catch((error) => {
        console.error('Snapshot error:', error);
    });
});


function takeSnapshot() {
    // Check if canvas has valid dimensions before taking snapshot
    if (canvas.width === 0 || canvas.height === 0) {
        console.error('Canvas has invalid dimensions (width or height is 0)');
        return;
    }

    html2canvas(document.body).then(canvasSnapshot => {
        snapshot = canvasSnapshot;
        console.log("Snapshot taken successfully!");
    }).catch((error) => {
        console.error('Snapshot error:', error);
    });
}


// Wait for the DOM content to be fully loaded before starting the glitch effect
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM is fully loaded and parsed!");
    initialize(); // Start glitch effect after DOM is ready
});

// Alternatively, if you want to ensure **all assets** (images, styles) are loaded, use window.onload
// window.onload = function() {
//     console.log("Page is fully loaded with all resources!");
//     initialize(); // Start glitch effect after everything is loaded
// };

function drawGlitch() {
    if (!snapshot) return;

    ctx.clearRect(0, 0, width, height);

    // Draw the static snapshot of the site onto the canvas
    ctx.drawImage(snapshot, 0, 0, width, height);

    const glitchRects = Math.floor(Math.random() * 5) + 2;

    for (let i = 0; i < glitchRects; i++) {
        const sx = 0;
        const sy = Math.random() * height;
        const sw = width;
        const sh = Math.random() * 30 + 5;

        const dx = Math.random() * 20 - 10;
        const dy = sy;

        // Copy and shift glitch slices (glitching effect)
        ctx.drawImage(snapshot, sx, sy, sw, sh, dx, dy, sw, sh); // Draw the snapshot, not the canvas
    }
}

function glitchEffect() {
    // Make sure the snapshot is ready before running the effect
    if (!snapshot) {
        console.log('Waiting for snapshot...');
        return;
    }

    const glitchBurstFrames = Math.floor(Math.random() * 3) + 1;
    let framesRendered = 0;

    const burst = setInterval(() => {
        drawGlitch();
        framesRendered++;

        if (framesRendered >= glitchBurstFrames) {
            clearInterval(burst);
            ctx.clearRect(0, 0, width, height);

            const nextDelay = Math.random() * 5000 + 2000;
            setTimeout(glitchEffect, nextDelay);
        }
    }, 150);
}

