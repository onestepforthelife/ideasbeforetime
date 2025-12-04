// 3D Solar System Visualization
// Educational astronomy display for homepage

class SolarSystem3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.planets = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;
        this.camera.position.y = 20;
        this.camera.lookAt(0, 0, 0);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        this.scene.add(ambientLight);
        
        const sunLight = new THREE.PointLight(0xffffff, 2, 100);
        sunLight.position.set(0, 0, 0);
        this.scene.add(sunLight);
        
        // Create solar system
        this.createSun();
        this.createPlanets();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Start animation
        this.animate();
    }
    
    createSun() {
        const geometry = new THREE.SphereGeometry(3, 32, 32);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xfdb813,
            emissive: 0xfdb813,
            emissiveIntensity: 0.5
        });
        const sun = new THREE.Mesh(geometry, material);
        this.scene.add(sun);
        
        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(3.5, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xfdb813,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.scene.add(glow);
    }
    
    createPlanets() {
        const planetData = [
            { name: 'Mercury', size: 0.4, distance: 6, color: 0x8c7853, speed: 0.04 },
            { name: 'Venus', size: 0.9, distance: 9, color: 0xffc649, speed: 0.03 },
            { name: 'Earth', size: 1, distance: 12, color: 0x4169e1, speed: 0.02, hasMoon: true },
            { name: 'Mars', size: 0.5, distance: 15, color: 0xcd5c5c, speed: 0.018 },
            { name: 'Jupiter', size: 2.5, distance: 22, color: 0xdaa520, speed: 0.01 },
            { name: 'Saturn', size: 2.2, distance: 28, color: 0xf4a460, speed: 0.008, hasRings: true },
            { name: 'Uranus', size: 1.5, distance: 34, color: 0x4fd0e0, speed: 0.006 },
            { name: 'Neptune', size: 1.4, distance: 38, color: 0x4169e1, speed: 0.005 },
            { name: 'Pluto', size: 0.3, distance: 42, color: 0xd3d3d3, speed: 0.004 }
        ];
        
        planetData.forEach(data => {
            const planet = this.createPlanet(data);
            this.planets.push(planet);
            this.scene.add(planet.group);
            
            // Add orbit line
            const orbitGeometry = new THREE.RingGeometry(data.distance - 0.1, data.distance + 0.1, 64);
            const orbitMaterial = new THREE.MeshBasicMaterial({
                color: 0x444444,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.3
            });
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.rotation.x = Math.PI / 2;
            this.scene.add(orbit);
        });
    }
    
    createPlanet(data) {
        const group = new THREE.Group();
        
        // Create planet
        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshStandardMaterial({ 
            color: data.color,
            roughness: 0.7,
            metalness: 0.3
        });
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
        
        // Add rings for Saturn
        if (data.hasRings) {
            const ringGeometry = new THREE.RingGeometry(data.size * 1.5, data.size * 2.5, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xc9b382,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.7
            });
            const rings = new THREE.Mesh(ringGeometry, ringMaterial);
            rings.rotation.x = Math.PI / 2;
            group.add(rings);
        }
        
        // Add moon for Earth
        if (data.hasMoon) {
            const moonGeometry = new THREE.SphereGeometry(0.27, 16, 16);
            const moonMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xcccccc 
            });
            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            moon.position.set(2, 0, 0);
            group.add(moon);
            
            // Store moon for animation
            data.moon = moon;
        }
        
        return {
            group: group,
            mesh: mesh,
            data: data,
            angle: Math.random() * Math.PI * 2
        };
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Rotate planets around sun
        this.planets.forEach(planet => {
            planet.angle += planet.data.speed;
            planet.group.position.x = Math.cos(planet.angle) * planet.data.distance;
            planet.group.position.z = Math.sin(planet.angle) * planet.data.distance;
            
            // Rotate planet on its axis
            planet.mesh.rotation.y += 0.01;
            
            // Rotate moon around Earth
            if (planet.data.moon) {
                planet.data.moon.position.x = Math.cos(planet.angle * 10) * 2;
                planet.data.moon.position.z = Math.sin(planet.angle * 10) * 2;
            }
        });
        
        // Slowly rotate camera
        this.camera.position.x = Math.cos(Date.now() * 0.0001) * 50;
        this.camera.position.z = Math.sin(Date.now() * 0.0001) * 50;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
            this.container.removeChild(this.renderer.domElement);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('solar-system-container');
    if (container) {
        new SolarSystem3D('solar-system-container');
    }
});
