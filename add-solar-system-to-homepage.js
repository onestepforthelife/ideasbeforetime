// Add 3D Solar System to Homepage
const fs = require('fs');

const solarSystemHTML = `
    <!-- 3D Solar System Section -->
    <link rel="stylesheet" href="solar-system-3d.css">
    
    <section class="solar-system-section">
        <div class="solar-system-content">
            <div class="solar-system-header">
                <h2>🌌 Explore Our Solar System</h2>
                <p>Interactive 3D visualization of planets, moon, and celestial mathematics</p>
            </div>
            
            <div id="solar-system-container">
                <div class="solar-system-loading">Loading Solar System</div>
            </div>
            
            <div class="solar-system-info">
                <div class="planet-info-card">
                    <div class="planet-icon" style="background: linear-gradient(135deg, #fdb813 0%, #ff9800 100%);">☀️</div>
                    <h3>The Sun</h3>
                    <p>Our star, 1.4 million km diameter, powers all life on Earth</p>
                </div>
                
                <div class="planet-info-card">
                    <div class="planet-icon" style="background: linear-gradient(135deg, #4169e1 0%, #1e90ff 100%);">🌍</div>
                    <h3>Earth & Moon</h3>
                    <p>Our home planet with its natural satellite orbiting every 27.3 days</p>
                </div>
                
                <div class="planet-info-card">
                    <div class="planet-icon" style="background: linear-gradient(135deg, #daa520 0%, #ff8c00 100%);">🪐</div>
                    <h3>Gas Giants</h3>
                    <p>Jupiter, Saturn, Uranus, Neptune - massive planets with rings and moons</p>
                </div>
                
                <div class="planet-info-card">
                    <div class="planet-icon" style="background: linear-gradient(135deg, #cd5c5c 0%, #ff6347 100%);">🔴</div>
                    <h3>Rocky Planets</h3>
                    <p>Mercury, Venus, Earth, Mars - solid surfaces and unique characteristics</p>
                </div>
            </div>
            
            <div style="text-align: center;">
                <a href="celestial-calculator.html" class="cta-button">
                    Calculate Your Birth Chart →
                </a>
            </div>
        </div>
    </section>
    
    <!-- Three.js Library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="solar-system-3d.js"></script>
`;

// Read index.html
let indexHTML = fs.readFileSync('Cloudfare/index.html', 'utf8');

// Find where to insert (after hero section, before features)
const insertAfter = '</header>';
const insertPosition = indexHTML.indexOf(insertAfter);

if (insertPosition !== -1) {
    indexHTML = indexHTML.slice(0, insertPosition + insertAfter.length) + 
                 '\n\n' + solarSystemHTML + '\n\n' +
                 indexHTML.slice(insertPosition + insertAfter.length);
    
    fs.writeFileSync('Cloudfare/index.html', indexHTML);
    console.log('✅ Solar system added to homepage!');
} else {
    console.log('❌ Could not find insertion point in index.html');
}
