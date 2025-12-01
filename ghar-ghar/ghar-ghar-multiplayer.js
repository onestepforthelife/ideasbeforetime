// Free Multiplayer using PeerJS (WebRTC)
// No server costs - peer-to-peer connection!

let peer = null;
let conn = null;
let isHost = false;
let roomCode = null;
let localStream = null;
let remoteAudio = null;
let voiceEnabled = false;

// Initialize PeerJS with multiple FREE STUN servers (all stable, long-term)
function initMultiplayer() {
    peer = new Peer({
        config: {
            'iceServers': [
                // Google's FREE STUN servers (stable since 2008, won't go paid)
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' },
                
                // Mozilla's FREE STUN (open source, stable)
                { urls: 'stun:stun.services.mozilla.com' },
                
                // OpenRelay FREE STUN/TURN (community project, stable)
                { urls: 'stun:openrelay.metered.ca:80' },
                
                // Twilio's FREE STUN (stable, public)
                { urls: 'stun:global.stun.twilio.com:3478' }
            ]
        }
    });

    peer.on('open', (id) => {
        console.log('My peer ID:', id);
    });

    peer.on('connection', (connection) => {
        conn = connection;
        setupConnection();
        showNotification('Player connected! 🎮');
    });

    peer.on('call', (call) => {
        if (localStream) {
            call.answer(localStream);
            call.on('stream', (remoteStream) => {
                playRemoteAudio(remoteStream);
            });
        }
    });

    peer.on('error', (err) => {
        console.error('Peer error:', err);
        showNotification('Connection error. Try again.');
    });
}

// Create room (host)
function createRoom() {
    if (!peer) initMultiplayer();
    
    isHost = true;
    roomCode = generateRoomCode();
    
    // Show room code to share
    showRoomCode(roomCode);
    
    // Wait for connection
    showNotification('Waiting for player to join...');
}

// Join room (guest)
function joinRoom(code) {
    if (!peer) initMultiplayer();
    
    isHost = false;
    roomCode = code;
    
    // Connect to host
    peer.on('open', () => {
        conn = peer.connect(code);
        setupConnection();
    });
}

// Setup connection handlers
function setupConnection() {
    conn.on('open', () => {
        showNotification('Connected! Game synced! 🎉');
        syncGameState();
        if (voiceEnabled && isHost) {
            startVoiceCall();
        }
    });

    conn.on('data', (data) => {
        handleRemoteAction(data);
    });

    conn.on('close', () => {
        showNotification('Player disconnected');
        stopVoiceChat();
        conn = null;
    });
}

// Voice chat functions
async function enableVoiceChat() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        voiceEnabled = true;
        showNotification('🎤 Microphone enabled!');
        updateVoiceButton();
        
        if (conn && conn.open && isHost) {
            startVoiceCall();
        }
    } catch (err) {
        console.error('Microphone error:', err);
        showNotification('❌ Cannot access microphone. Check permissions.');
    }
}

function startVoiceCall() {
    if (!peer || !conn || !localStream) return;
    
    const call = peer.call(roomCode, localStream);
    call.on('stream', (remoteStream) => {
        playRemoteAudio(remoteStream);
    });
}

function playRemoteAudio(stream) {
    if (!remoteAudio) {
        remoteAudio = document.createElement('audio');
        remoteAudio.autoplay = true;
        document.body.appendChild(remoteAudio);
    }
    remoteAudio.srcObject = stream;
    showNotification('🔊 Voice chat connected!');
}

function stopVoiceChat() {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    if (remoteAudio) {
        remoteAudio.srcObject = null;
        remoteAudio.remove();
        remoteAudio = null;
    }
    voiceEnabled = false;
    updateVoiceButton();
}

function toggleVoiceChat() {
    if (voiceEnabled) {
        stopVoiceChat();
        showNotification('🔇 Voice chat disabled');
    } else {
        enableVoiceChat();
    }
}

function updateVoiceButton() {
    const btn = document.getElementById('voiceChatBtn');
    if (btn) {
        btn.textContent = voiceEnabled ? '🔇 Mute' : '🎤 Voice Chat';
        btn.style.background = voiceEnabled ? '#d63031' : '#00b894';
    }
}

// Sync game state
function syncGameState() {
    if (!conn || !conn.open) return;
    
    const state = {
        type: 'sync',
        players: players,
        currentTalking: currentTalking,
        allItems: Array.from(allItems)
    };
    
    conn.send(state);
}

// Send action to remote player
function sendAction(action, data) {
    if (!conn || !conn.open) return;
    
    conn.send({
        type: 'action',
        action: action,
        data: data,
        timestamp: Date.now()
    });
}

// Handle remote actions
function handleRemoteAction(message) {
    switch (message.type) {
        case 'sync':
            // Sync game state from host
            players = message.players;
            currentTalking = message.currentTalking;
            allItems = new Set(message.allItems);
            renderCharacters();
            renderItemPool();
            break;
            
        case 'action':
            // Execute remote action
            switch (message.action) {
                case 'toggleTalking':
                    toggleTalking(message.data.playerId);
                    break;
                case 'useItem':
                    useItem(message.data.item, message.data.playerId);
                    break;
                case 'addItem':
                    const player = players.find(p => p.id === message.data.playerId);
                    if (player && !player.inventory.includes(message.data.item)) {
                        player.inventory.push(message.data.item);
                        updateInventory(message.data.playerId);
                    }
                    break;
            }
            break;
    }
}

// Generate room code
function generateRoomCode() {
    return peer.id;
}

// Show room code modal
function showRoomCode(code) {
    const modal = document.createElement('div');
    modal.id = 'roomCodeModal';
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        max-width: 400px;
    `;
    
    modal.innerHTML = `
        <h2 style="color: #ff6b6b; margin-bottom: 20px;">🎮 Room Created!</h2>
        <p style="margin-bottom: 15px;">Share this code with your friend:</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <div style="font-size: 2em; font-weight: bold; color: #2d3436; letter-spacing: 2px; font-family: monospace;">
                ${code}
            </div>
        </div>
        <button onclick="copyRoomCode('${code}')" style="padding: 12px 30px; background: #00b894; color: white; border: none; border-radius: 20px; cursor: pointer; margin-right: 10px; font-size: 1em;">
            📋 Copy Code
        </button>
        <button onclick="closeRoomCodeModal()" style="padding: 12px 30px; background: #636e72; color: white; border: none; border-radius: 20px; cursor: pointer; font-size: 1em;">
            Close
        </button>
        <p style="margin-top: 20px; font-size: 0.9em; color: #636e72;">
            Waiting for player to join...
        </p>
    `;
    
    document.body.appendChild(modal);
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.id = 'roomCodeOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
    `;
    document.body.appendChild(overlay);
}

// Copy room code
function copyRoomCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Code copied! 📋');
    });
}

// Close room code modal
function closeRoomCodeModal() {
    const modal = document.getElementById('roomCodeModal');
    const overlay = document.getElementById('roomCodeOverlay');
    if (modal) modal.remove();
    if (overlay) overlay.remove();
}

// Show join room modal
function showJoinRoomModal() {
    const modal = document.createElement('div');
    modal.id = 'joinRoomModal';
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        max-width: 400px;
    `;
    
    modal.innerHTML = `
        <h2 style="color: #ff6b6b; margin-bottom: 20px;">🎮 Join Room</h2>
        <p style="margin-bottom: 15px;">Enter the room code:</p>
        <input type="text" id="roomCodeInput" placeholder="Enter code..." style="width: 100%; padding: 15px; border: 2px solid #dfe6e9; border-radius: 10px; font-size: 1.2em; text-align: center; font-family: monospace; letter-spacing: 2px; margin-bottom: 20px;">
        <div>
            <button onclick="joinRoomWithCode()" style="padding: 12px 30px; background: #0984e3; color: white; border: none; border-radius: 20px; cursor: pointer; margin-right: 10px; font-size: 1em;">
                🚀 Join Game
            </button>
            <button onclick="closeJoinRoomModal()" style="padding: 12px 30px; background: #636e72; color: white; border: none; border-radius: 20px; cursor: pointer; font-size: 1em;">
                Cancel
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.id = 'joinRoomOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
    `;
    overlay.onclick = closeJoinRoomModal;
    document.body.appendChild(overlay);
    
    // Focus input
    setTimeout(() => document.getElementById('roomCodeInput').focus(), 100);
}

// Join room with code
function joinRoomWithCode() {
    const code = document.getElementById('roomCodeInput').value.trim();
    if (code) {
        closeJoinRoomModal();
        joinRoom(code);
        showNotification('Connecting...');
    } else {
        alert('Please enter a room code');
    }
}

// Close join room modal
function closeJoinRoomModal() {
    const modal = document.getElementById('joinRoomModal');
    const overlay = document.getElementById('joinRoomOverlay');
    if (modal) modal.remove();
    if (overlay) overlay.remove();
}

// Disconnect from multiplayer
function disconnectMultiplayer() {
    if (conn) {
        conn.close();
        conn = null;
    }
    if (peer) {
        peer.destroy();
        peer = null;
    }
    isHost = false;
    roomCode = null;
    showNotification('Disconnected from multiplayer');
}

// Override game actions to sync with remote
const originalToggleTalking = toggleTalking;
toggleTalking = function(playerId) {
    originalToggleTalking(playerId);
    sendAction('toggleTalking', { playerId });
};

const originalUseItemMultiplayer = useItem;
useItem = function(item, playerId) {
    originalUseItemMultiplayer(item, playerId);
    sendAction('useItem', { item, playerId });
};

const originalHandleDrop = handleDrop;
handleDrop = function(e, playerId) {
    originalHandleDrop(e, playerId);
    const item = e.dataTransfer.getData('text/plain');
    sendAction('addItem', { item, playerId });
};
