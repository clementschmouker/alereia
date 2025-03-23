import '../scss/styles.scss';

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