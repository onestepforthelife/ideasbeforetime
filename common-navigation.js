/* Universal Navigation JavaScript - Ideas Before Time */

/* Logo Styling */
const logoStyles = `
<style>
.logo-img {
    height: 50px;
    width: auto;
    display: block;
    transition: transform 0.3s ease;
}

.logo-img:hover {
    transform: scale(1.05);
}

@media (max-width: 768px) {
    .logo-img {
        height: 40px;
    }
}
</style>
`;

// Add logo styles to page
if (!document.getElementById('logo-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'logo-styles';
    styleElement.innerHTML = logoStyles;
    document.head.appendChild(styleElement);
}

// Add navigation HTML to page
function addSiteNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML = `
        <div class="nav-container">
            <a href="/" class="logo">
                <img src="images/Logo One Step for the life 180 by 84 Pixel.jpg" alt="Ideas Before Time" class="logo-img">
            </a>
            <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">☰</button>
            <ul class="nav-links" id="navLinks">
                <li><a href="/">🏠 Home</a></li>
                <li class="dropdown">
                    <a href="/learn">📚 Learn ▼</a>
                    <ul class="dropdown-menu">
                        <li><a href="/blog">Blog (179 articles)</a></li>
                        <li><a href="/library">Library</a></li>
                        <li><a href="/innovations">Innovations</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="/tools">🛠️ Tools ▼</a>
                    <ul class="dropdown-menu">
                        <li><a href="/spo">Social Profile Optimizer</a></li>
                        <li><a href="/jobs">Job Search & Tracker</a></li>
                        <li><a href="/ro">RO Water Guide</a></li>
                        <li><a href="/linkedin">LinkedIn Tools</a></li>
                        <li><a href="/kiro">GODA Kiro Troubleshooter</a></li>
                        <li><a href="/astronomy">Astrology Calculator</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="/insights">📊 Insights ▼</a>
                    <ul class="dropdown-menu">
                        <li><a href="/market-reports">Chemical Reports</a></li>
                        <li><a href="/business-insights">Business Insights</a></li>
                        <li><a href="/request-access">Premium Access</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="/about">👤 About ▼</a>
                    <ul class="dropdown-menu">
                        <li><a href="/about">About Creator</a></li>
                        <li><a href="/cv">Professional CV</a></li>
                        <li><a href="/timeline">Career Timeline</a></li>
                    </ul>
                </li>
            </ul>
            <div class="header-ctas">
                <a href="/tools" class="btn btn-outline">Use Free Tools</a>
                <a href="/request-access" class="btn btn-primary">Request Premium</a>
            </div>
        </div>
    `;
    
    // Insert at the beginning of body
    document.body.insertBefore(nav, document.body.firstChild);
    
    // Highlight active page
    highlightActivePage();
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Toggle mobile dropdown
function toggleDropdown(event) {
    if (window.innerWidth <= 768) {
        event.preventDefault();
        const dropdown = event.target.closest('.dropdown');
        dropdown.classList.toggle('active');
    }
}

// Highlight current page in navigation
function highlightActivePage() {
    const currentPath = window.location.pathname.replace('.html', '').replace(/\/$/, '') || '/';
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || linkPath === currentPath + '.html') {
            link.classList.add('active');
        }
    });
}

// Add breadcrumb navigation
function addBreadcrumb(items) {
    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'breadcrumb';
    
    let html = '<a href="/">Home</a>';
    items.forEach((item, index) => {
        html += ' <span>›</span> ';
        if (index === items.length - 1) {
            html += `<span>${item.text}</span>`;
        } else {
            html += `<a href="/">${item.text}</a>`;
        }
    });
    
    breadcrumb.innerHTML = html;
    
    // Insert after navigation
    const nav = document.querySelector('.site-nav');
    if (nav && nav.nextSibling) {
        nav.parentNode.insertBefore(breadcrumb, nav.nextSibling);
    }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSiteNavigation);
} else {
    addSiteNavigation();
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (navLinks && toggle && 
        !navLinks.contains(event.target) && 
        !toggle.contains(event.target) &&
        navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

