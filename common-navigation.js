// Common Navigation and Footer for All Pages
// Auto-injects navbar and footer into any page

(function() {
    // Navbar HTML
    const navbarHTML = `
        <nav class="navbar" style="position: fixed; top: 0; left: 0; right: 0; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; padding: 15px 20px;">
            <div class="navbar-container" style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
                <a href="index.html" class="navbar-brand" style="font-size: 20px; font-weight: 700; color: #667eea; text-decoration: none;">💡 Ideas Before Time</a>
                <button class="mobile-menu-toggle" onclick="toggleNavMenu()" style="display: none; background: none; border: none; font-size: 24px; cursor: pointer; color: #667eea;">☰</button>
                <div class="navbar-menu" id="navMenu" style="display: flex; gap: 25px; align-items: center;">
                    <a href="index.html" style="color: #333; text-decoration: none; font-weight: 500; transition: color 0.3s;">Home</a>
                    <a href="library.html" style="color: #333; text-decoration: none; font-weight: 500; transition: color 0.3s;">Innovation Library</a>
                    <a href="business-insights.html" style="color: #333; text-decoration: none; font-weight: 500; transition: color 0.3s;">Business Insights</a>
                    <a href="specialty-chemicals-index.html" style="color: #333; text-decoration: none; font-weight: 500; transition: color 0.3s;">Market Reports</a>
                    <a href="cv-preview.html" style="color: #333; text-decoration: none; font-weight: 500; transition: color 0.3s;">CV</a>
                    <a href="about.html" style="color: #333; text-decoration: none; font-weight: 500; transition: color 0.3s;">About</a>
                </div>
            </div>
        </nav>
        <style>
            body { padding-top: 80px !important; }
            .navbar-menu a:hover { color: #667eea !important; }
            @media (max-width: 768px) {
                body { padding-top: 60px !important; }
                .mobile-menu-toggle { display: block !important; }
                .navbar-menu { 
                    display: none !important; 
                    position: absolute; 
                    top: 100%; 
                    left: 0; 
                    right: 0; 
                    background: white; 
                    flex-direction: column !important; 
                    padding: 20px; 
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
                }
                .navbar-menu.active { display: flex !important; }
            }
        </style>
    `;
    
    // Footer HTML
    const footerHTML = `
        <div class="footer" style="text-align: center; margin-top: 50px; padding: 30px 20px; border-top: 2px solid #e0e0e0; background: #f9f9f9;">
            <p style="color: #888; font-size: 14px; margin-bottom: 15px;">
                <a href="library.html" style="color: #667eea; text-decoration: none; margin: 0 10px;">Innovation Library</a> |
                <a href="timeline.html" style="color: #667eea; text-decoration: none; margin: 0 10px;">Timeline View</a> |
                <a href="about.html" style="color: #667eea; text-decoration: none; margin: 0 10px;">About</a> |
                <a href="cv-preview.html" style="color: #667eea; text-decoration: none; margin: 0 10px;">CV</a> |
                <a href="specialty-chemicals-index.html" style="color: #667eea; text-decoration: none; margin: 0 10px;">Market Reports</a>
            </p>
            <p style="color: #888; font-size: 14px; margin-bottom: 10px;">
                Contact: <a href="mailto:onestepforthelife@gmail.com" style="color: #667eea; text-decoration: none;">onestepforthelife@gmail.com</a> | 
                <a href="https://www.linkedin.com/in/leadershipexpertamit/" target="_blank" style="color: #667eea; text-decoration: none;">LinkedIn</a>
            </p>
            <p style="color: #888; font-size: 12px;">© 2025 Amit Kumar / Onestepforthelife. All rights reserved.</p>
        </div>
    `;
    
    // Inject navbar at top of body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    
    // Inject footer at end of body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    
    // Mobile menu toggle function
    window.toggleNavMenu = function() {
        const menu = document.getElementById('navMenu');
        menu.classList.toggle('active');
    };
    
})();
