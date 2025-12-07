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
            <a href="index.html" class="logo">
                <img src="images/Logo One Step for the life 180 by 84 Pixel.jpg" alt="Ideas Before Time" class="logo-img">
            </a>
            <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">☰</button>
            <ul class="nav-links" id="navLinks">
                <li><a href="index.html">🏠 Home</a></li>
                <li class="dropdown">
                    <a href="learn.html">📚 Learn ▼</a>
                    <ul class="dropdown-menu">
                        <li><a href="blog.html">Blog (100 posts)</a></li>
                        <li><a href="library.html">Library</a></li>
                        <li><a href="innovations.html">Innovations</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="tools.html">🛠️ Tools ▼</a>
                    <ul class="dropdown-menu">
                        <li><a href="spo.html">Social Profile Optimizer</a></li>
                        <li><a href="jobs.html">Job Search & Tracker</a></li>
                        <li><a href="ro.html">RO Water Guide</a></li>
                        <li><a href="linkedin.html">LinkedIn Tools</a></li>
                        <li><a href="kiro.html">GODA (Kiro AI)</a></li>
                        <li><a href="astronomy.html">Astrology Calculator</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="insights.html">📊 Insights ▼</a>
                    <ul class="dropdown-menu">
                        <li><a href="market-reports.html">Chemical Reports</a></li>
                        <li><a href="business-insights.html">Business Insights</a></li>
                        <li><a href="request-access.html">Premium Access</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="about.html">👤 About ▼</a>
                    <ul class="dropdown-menu">
                        <li><a href="about.html">About Creator</a></li>
                        <li><a href="cv.html">Professional CV</a></li>
                        <li><a href="timeline.html">Career Timeline</a></li>
                    </ul>
                </li>
            </ul>
            <div class="header-ctas">
                <a href="tools.html" class="btn btn-outline">Use Free Tools</a>
                <a href="request-access.html" class="btn btn-primary">Request Premium</a>
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
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// Add breadcrumb navigation
function addBreadcrumb(items) {
    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'breadcrumb';
    
    let html = '<a href="index.html">Home</a>';
    items.forEach((item, index) => {
        html += ' <span>›</span> ';
        if (index === items.length - 1) {
            html += `<span>${item.text}</span>`;
        } else {
            html += `<a href="index.html">${item.text}</a>`;
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

