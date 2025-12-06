// KIRO Persistent Memory Loader
// Loads core knowledge at session start

const fs = require('fs');
const path = require('path');

function loadPersistentMemory() {
    const memoryPath = path.join(__dirname, 'KIRO_PERSISTENT_MEMORY.json');
    
    try {
        const memory = JSON.parse(fs.readFileSync(memoryPath, 'utf8'));
        
        console.log('✅ KIRO Persistent Memory Loaded');
        console.log(`Version: ${memory.version}`);
        console.log(`Total Learnings: ${memory.totalLearnings}`);
        console.log(`Steering Files: ${memory.steeringFiles}`);
        console.log(`Documentation Fetched: ${memory.documentation.fetched}/${memory.documentation.total}`);
        
        return memory;
    } catch (error) {
        console.error('❌ Failed to load persistent memory:', error.message);
        return null;
    }
}

function updateMemory(updates) {
    const memoryPath = path.join(__dirname, 'KIRO_PERSISTENT_MEMORY.json');
    
    try {
        const memory = JSON.parse(fs.readFileSync(memoryPath, 'utf8'));
        
        // Update fields
        Object.assign(memory, updates);
        memory.lastUpdated = new Date().toISOString().split('T')[0];
        
        fs.writeFileSync(memoryPath, JSON.stringify(memory, null, 2));
        
        console.log('✅ Persistent memory updated');
        return true;
    } catch (error) {
        console.error('❌ Failed to update memory:', error.message);
        return false;
    }
}

module.exports = { loadPersistentMemory, updateMemory };
