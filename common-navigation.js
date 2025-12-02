/* Universal Navigation JavaScript - Ideas Before Time */

// Add navigation HTML to page
function addSiteNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML = `
        <div class="nav-container">
            <a href="index.html" class="logo">
                🔬 Ideas Before Time
            </a>
            <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">☰</button>
            <ul class="nav-links" id="navLinks">
                <li><a href="index.html">Home</a></li>
                <li><a href="social-optimizer-index.html">SPO Tool</a></li>
                <li><a href="email-sender-web.html">Job Search Tool</a></li>
                <li><a href="about.html">About Creator</a></li>
                <li><a href="market-reports.html">Market Reports</a></li>
                <li><a href="library.html">Innovation Library</a></li>
                <li><a href="cv.html">CV</a></li>
            </ul>
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
            html += `<a href="${item.url}">${item.text}</a>`;
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
