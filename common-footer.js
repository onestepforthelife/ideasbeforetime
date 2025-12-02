/* Universal Footer - Ideas Before Time */

function addSiteFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="footer-content">
            <nav class="footer-links">
                <a href="index.html">Home</a>
                <a href="social-optimizer-index.html">SPO Tool</a>
                <a href="email-sender-web.html">Job Search Tool</a>
                <a href="market-reports.html">Chemical Reports</a>
                <a href="library.html">Innovation Library</a>
                <a href="about.html">About</a>
                <a href="privacy-policy.html">Privacy Policy</a>
                <a href="disclaimer.html">Terms & Disclaimer</a>
            </nav>
            <p class="footer-contact">Contact: <a href="mailto:onestepforthelife@gmail.com">onestepforthelife@gmail.com</a></p>
            <p class="footer-copyright">© 2025 Amit Kumar / Onestepforthelife</p>
        </div>
    `;
    document.body.appendChild(footer);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSiteFooter);
} else {
    addSiteFooter();
}

