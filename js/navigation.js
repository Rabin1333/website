export function initializeNavigation() {
    const nav = document.getElementById('main-nav');
    const currentPage = window.location.pathname;

    // Update active navigation link
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Mobile navigation toggle
    const mobileNav = document.createElement('button');
    mobileNav.className = 'mobile-nav-toggle';
    mobileNav.innerHTML = '☰';
    mobileNav.addEventListener('click', toggleMobileNav);

    nav.insertBefore(mobileNav, nav.firstChild);
}

function toggleMobileNav() {
    const navList = document.querySelector('nav ul');
    navList.classList.toggle('show');
}