import '../scss/styles.scss';

const navButtonMobile = document.querySelector('.nav-small__button');
const navMobile = document.querySelector('.nav-small__content');
let navMobileOpen = false;

if (navButtonMobile) {
    navButtonMobile.addEventListener('click', () => {
        console.log('CLICK');
        navMobileOpen = !navMobileOpen;
        navMobile?.classList.toggle('open');
    });
}