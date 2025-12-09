/* Quick Access Tree Widget - GODA Style Chatbot Interface */

// Create and inject the tree widget
function createQuickAccessTree() {
    const widget = document.createElement('div');
    widget.id = 'quickAccessTree';
    widget.className = 'quick-tree-widget';
    
    widget.innerHTML = `
        <button class="tree-toggle-btn" onclick="toggleTreeWidget()">
            <span class="tree-icon">🌳</span>
            <span class="tree-label">Site Map</span>
        </button>
        
        <div class="tree-panel" id="treePanel">
            <div class="tree-header">
                <h3>🗺️ Site Navigation Tree</h3>
                <button class="tree-close" onclick="toggleTreeWidget()">×</button>
            </div>
            
            <div class="tree-content">
                <!-- Home -->
                <div class="tree-node root">
                    <a href="index.html" class="tree-link">
                        <span class="tree-icon">🏠</span>
                        <span class="tree-text">Home</span>
                    </a>
                </div>
                
                <!-- Learn Hub -->
                <div class="tree-node hub">
                    <div class="tree-link expandable" onclick="toggleBranch(this)">
                        <span class="tree-icon">📚</span>
                        <span class="tree-text">Learn</span>
                        <span class="tree-arrow">▼</span>
                    </div>
                    <div class="tree-children">
                        <a href="blog.html" class="tree-link child">
                            <span class="tree-connector">├─</span>
                            <span class="tree-icon">📝</span>
                            <span class="tree-text">Blog (100 posts)</span>
                        </a>
                        <a href="library.html" class="tree-link child">
                            <span class="tree-connector">├─</span>
                            <span class="tree-icon">📚</span>
                            <span class="tree-text">Library</span>
                        </a>
                        <a href="innovations.html" class="tree-link child">
                            <span class="tree-connector">└─</span>
                            <span class="tree-icon">💡</span>
                            <span class="tree-text">Innovations</span>
                        </a>
                    </div>
                </div>
                
                <!-- Tools Hub -->
                <div class="tree-node hub">
                    <div class="tree-link expandable" onclick="toggleBranch(this)">
                        <span class="tree-icon">🛠️</span>
                        <span class="tree-text">Tools</span>
                        <span class="tree-arrow">▼</span>
                    </div>
                    <div class="tree-children">
                        <a href="spo.html" class="tree-link child">
                            <span class="tree-connector">├─</span>
                            <span class="tree-icon">🚀</span>
                            <span class="tree-text">Social Profile Optimizer</span>
                        </a>
                        <a href="jobs.html" class="tree-link child">
                            <span class="tree-connector">├─</span>
                            <span class="tree-icon">💼</span>
                            <span class="tree-text">Job Search & Tracker</span>
                        </a>
                        <a href="ro.html" class="tree-link child">
                            <span class="tree-connector">├─</span>
                            <span class="tree-icon">💧</span>
                            <span class="tree-text">RO Water Guide</span>
                        </a>
                        <a href="linkedin.html" class="tree-link child">
                            <span class="tree-connector">├─</span>
                            <span class="tree-icon">🔗</span>
                            <span class="tree-text">LinkedIn Tools</span>
                        </a>
                        <a href="kiro.html" class="tree-link child">
                            <span class="tree-connector">├─</span>
                            <span class="tree-icon">🤖</span>
                            <span class="tree-text">GODA (Kiro AI)</span>
                        </a>
                        <a href="astronomy.html" class="tree-link child">
                            <span class="tree-connector">└─</span>
                            <span class="tree-icon">⭐</span>
                            <span class="tree-text">Astrology Calculator</span>
                        </a>
                    </div>
                </div>
                
                <!-- Insights Hub -->
                <div class="tree-node hub">
                    <div class="tree-link expandable" onclick="toggleBranch(this)">
                        <span class="tree-icon">📊</span>
                        <span class="tree-text">Insights</span>
                        <span class="tree-arrow">▼</span>
                    </div>
                    <div class="tree-children">
                        <a href="market-reports.html" class="tree-link child">
                            <span class="tree-connector">├─</span>
                            <span class="tree-icon">🧪</span>
                            <span class="tree-text">Chemical Reports</span>
                        </a>
                        <a href="business-insights.html" class="tree-link child">
                            <span class="tree-connector">├─</span>
                            <span class="tree-icon">📈</span>
                            <span class="tree-text">Business Insights</span>
                        </a>
                        <a href="request-access.html" class="tree-link child">
                            <span class="tree-connector">└─</span>
                            <span class="tree-icon">🔐</span>
                            <span class="tree-text">Premium Access</span>
                        </a>
                    </div>
                </div>
                
                <!-- About Hub -->
                <div class="tree-node hub">
                    <div class="tree-link expandable" onclick="toggleBranch(this)">
                        <span class="tree-icon">👤</span>
                        <span class="tree-text">About</span>
                        <span class="tree-arrow">▼</span>
                    </div>
                    <div class="tree-children">
                        <a href="about.html" class="tree-link child">
                            <span class="tree-connector">├─</span>
                            <span class="tree-icon">👨‍💼</span>
                            <span class="tree-text">About Creator</span>
                        </a>
                        <a href="cv.html" class="tree-link child">
                            <span class="tree-connector">├─</span>
                            <span class="tree-icon">📄</span>
                            <span class="tree-text">Professional CV</span>
                        </a>
                        <a href="timeline.html" class="tree-link child">
                            <span class="tree-connector">└─</span>
                            <span class="tree-icon">📅</span>
                            <span class="tree-text">Career Timeline</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(widget);
}

// Toggle widget visibility
function toggleTreeWidget() {
    const panel = document.getElementById('treePanel');
    panel.classList.toggle('active');
}

// Toggle branch expand/collapse
function toggleBranch(element) {
    const parent = element.parentElement;
    const children = parent.querySelector('.tree-children');
    const arrow = element.querySelector('.tree-arrow');
    
    if (children.style.display === 'none' || !children.style.display) {
        children.style.display = 'block';
        arrow.textContent = '▼';
        parent.classList.add('expanded');
    } else {
        children.style.display = 'none';
        arrow.textContent = '▶';
        parent.classList.remove('expanded');
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createQuickAccessTree);
} else {
    createQuickAccessTree();
}

// Close panel when clicking outside
document.addEventListener('click', function(event) {
    const widget = document.getElementById('quickAccessTree');
    const panel = document.getElementById('treePanel');
    
    if (widget && panel && 
        !widget.contains(event.target) && 
        panel.classList.contains('active')) {
        panel.classList.remove('active');
    }
});
