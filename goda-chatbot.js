/* GODA AI Chatbot Widget - Simple & Clean */

// Create chatbot HTML
function createGODAChatbot() {
    const chatbotHTML = `
        <div id="godaChatbot" class="goda-chatbot">
            <!-- Chat Toggle Button -->
            <button id="godaChatToggle" class="goda-chat-toggle">
                <img src="images/logo Goda 40 bs 32 pixel.jpg" alt="GODA AI" class="chat-icon-img">
                <span class="chat-text">GODA AI</span>
            </button>

            <!-- Chat Window -->
            <div id="godaChatWindow" class="goda-chat-window">
                <!-- Chat Header -->
                <div class="goda-chat-header">
                    <div class="header-left">
                        <img src="images/logo Goda 40 bs 32 pixel.jpg" alt="GODA" class="bot-avatar-img">
                        <div class="bot-info">
                            <div class="bot-name">GODA AI Assistant</div>
                            <div class="bot-status">Online</div>
                        </div>
                    </div>
                    <button id="godaChatClose" class="close-btn">&times;</button>
                </div>

                <!-- Chat Messages -->
                <div id="godaChatMessages" class="goda-chat-messages">
                    <div class="message bot-message">
                        <img src="images/logo Goda 40 bs 32 pixel.jpg" alt="GODA" class="message-avatar-img">
                        <div class="message-content">
                            <p>Hi! I'm GODA, your AI assistant.</p>
                            <p>I can help you with:</p>
                            <div class="quick-options">
                                <button class="quick-option" data-option="1">1️⃣ Kiro IDE troubleshooting</button>
                                <button class="quick-option" data-option="2">2️⃣ AI training & learning</button>
                                <button class="quick-option" data-option="3">3️⃣ Site navigation</button>
                                <button class="quick-option" data-option="4">4️⃣ General questions</button>
                            </div>
                            <p style="margin-top: 12px; font-size: 13px; opacity: 0.8;">Type 1-4 or ask anything!</p>
                        </div>
                    </div>
                </div>

                <!-- Chat Input -->
                <div class="goda-chat-input">
                    <button id="godaNewTopic" class="new-topic-btn" title="Start new conversation">
                        <span>🔄</span>
                    </button>
                    <input 
                        type="text" 
                        id="godaChatInputField" 
                        placeholder="Type 1-4 or your message..."
                        autocomplete="off"
                    />
                    <button id="godaChatSend" class="send-btn">
                        <span>➤</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add to page
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    initializeChatbot();
}

// Initialize chatbot functionality
function initializeChatbot() {
    const toggle = document.getElementById('godaChatToggle');
    const close = document.getElementById('godaChatClose');
    const window = document.getElementById('godaChatWindow');
    const input = document.getElementById('godaChatInputField');
    const send = document.getElementById('godaChatSend');
    const newTopicBtn = document.getElementById('godaNewTopic');
    const messages = document.getElementById('godaChatMessages');
    const chatbot = document.getElementById('godaChatbot');

    // Conversation history for context (MUST BE DECLARED FIRST!)
    let conversationHistory = [];

    // Make chatbot draggable
    makeDraggable(toggle, chatbot);

    // Quick option buttons
    messages.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-option')) {
            const option = e.target.dataset.option;
            const optionTexts = {
                '1': 'Help me with Kiro IDE troubleshooting',
                '2': 'Tell me about AI training and learning',
                '3': 'Help me navigate the site',
                '4': 'I have a general question'
            };
            input.value = optionTexts[option] || '';
            sendMessage();
        }
    });

    // New topic button
    newTopicBtn.addEventListener('click', () => {
        if (confirm('Start a new conversation? Current chat will be cleared.')) {
            conversationHistory = [];
            messages.innerHTML = `
                <div class="message bot-message">
                    <img src="images/logo Goda 40 bs 32 pixel.jpg" alt="GODA" class="message-avatar-img">
                    <div class="message-content">
                        <p>Hi! I'm GODA, your AI assistant.</p>
                        <p>I can help you with:</p>
                        <div class="quick-options">
                            <button class="quick-option" data-option="1">1️⃣ Kiro IDE troubleshooting</button>
                            <button class="quick-option" data-option="2">2️⃣ AI training & learning</button>
                            <button class="quick-option" data-option="3">3️⃣ Site navigation</button>
                            <button class="quick-option" data-option="4">4️⃣ General questions</button>
                        </div>
                        <p style="margin-top: 12px; font-size: 13px; opacity: 0.8;">Type 1-4 or ask anything!</p>
                    </div>
                </div>
            `;
            input.focus();
        }
    });

    // Toggle chat window
    toggle.addEventListener('click', () => {
        window.classList.toggle('open');
        if (window.classList.contains('open')) {
            input.focus();
        }
    });

    // Close chat window
    close.addEventListener('click', () => {
        window.classList.remove('open');
    });

    // Send message on button click
    send.addEventListener('click', sendMessage);

    // Send message on Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = input.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        input.value = '';

        // Get AI response
        const response = await getBotResponse(message);
        addMessage(response, 'bot');
    }

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        if (type === 'bot') {
            messageDiv.innerHTML = `
                <img src="images/logo Goda 40 bs 32 pixel.jpg" alt="GODA" class="message-avatar-img">
                <div class="message-content">${text}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">${text}</div>
            `;
        }

        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    // Handle numbered responses
    function handleNumberedInput(message) {
        const num = message.trim();
        const responses = {
            '1': 'I can help with Kiro IDE! Common issues include: extension errors, configuration problems, or performance issues. What specific problem are you facing?',
            '2': 'AI training & learning topics I can help with: machine learning basics, neural networks, training datasets, model optimization, or AI ethics. What interests you?',
            '3': 'I can guide you through the site! We have: Tools (SPO, Job Search, RO Guide), Market Reports, Blog posts, and more. Where would you like to go?',
            '4': 'I\'m here for any questions! Ask me about technology, leadership, innovation, or anything else. What\'s on your mind?'
        };
        return responses[num] || null;
    }

    async function getBotResponse(message) {
        // Check for numbered input first
        const numberedResponse = handleNumberedInput(message);
        if (numberedResponse) {
            conversationHistory.push(
                { role: 'user', text: message },
                { role: 'assistant', text: numberedResponse }
            );
            return numberedResponse;
        }
        try {
            // Show typing indicator
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator';
            typingDiv.innerHTML = `
                <img src="images/logo Goda 40 bs 32 pixel.jpg" alt="GODA" class="message-avatar-img">
                <div class="message-content">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            `;
            messages.appendChild(typingDiv);
            messages.scrollTop = messages.scrollHeight;

            // Call secure API (Cloudflare Worker)
            const response = await fetch('https://orange-lab-a038.onestepforthelife.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    conversationHistory: conversationHistory.slice(-6) // Last 3 exchanges
                })
            });

            // Remove typing indicator
            typingDiv.remove();

            if (!response.ok) {
                const errorData = await response.json();
                return errorData.fallback || 'Sorry, I\'m having trouble right now. Please try again.';
            }

            const data = await response.json();
            
            // Update conversation history
            conversationHistory.push(
                { role: 'user', text: message },
                { role: 'assistant', text: data.response }
            );

            // Keep only last 10 messages (5 exchanges)
            if (conversationHistory.length > 10) {
                conversationHistory = conversationHistory.slice(-10);
            }

            return data.response;

        } catch (error) {
            console.error('Chat error:', error);
            
            // Fallback to simple responses if API fails
            const msg = message.toLowerCase();
            
            if (msg.includes('kiro') || msg.includes('error')) {
                return 'For Kiro IDE issues, check out our <a href="kiro.html">troubleshooting guide</a>.';
            }
            if (msg.includes('tool')) {
                return 'Find all tools at <a href="tools.html">Tools Hub</a>: SPO, Job Search, RO Guide.';
            }
            if (msg.includes('report') || msg.includes('market')) {
                return 'Check <a href="market-reports.html">Chemical Market Reports</a> for insights.';
            }
            if (msg.includes('blog')) {
                return 'We have 100+ posts on <a href="blog.html">Leadership & Technology</a>.';
            }
            
            return 'I\'m having connection issues. Try: <a href="tools.html">Tools</a> | <a href="blog.html">Blog</a> | <a href="market-reports.html">Reports</a>';
        }
    }

    // Make chatbot draggable
    function makeDraggable(handle, element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let isDragging = false;

        handle.addEventListener('mousedown', dragMouseDown);
        handle.addEventListener('touchstart', dragTouchStart);

        function dragMouseDown(e) {
            // Don't drag if clicking to open chat
            if (window.classList.contains('open')) return;
            
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            isDragging = false;
            document.addEventListener('mouseup', closeDragElement);
            document.addEventListener('mousemove', elementDrag);
        }

        function dragTouchStart(e) {
            if (window.classList.contains('open')) return;
            
            const touch = e.touches[0];
            pos3 = touch.clientX;
            pos4 = touch.clientY;
            isDragging = false;
            document.addEventListener('touchend', closeDragElement);
            document.addEventListener('touchmove', elementTouchDrag);
        }

        function elementDrag(e) {
            e.preventDefault();
            isDragging = true;
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // Calculate new position
            let newBottom = window.innerHeight - pos4 - handle.offsetHeight;
            let newRight = window.innerWidth - pos3 - handle.offsetWidth;
            
            // Keep within viewport
            newBottom = Math.max(10, Math.min(newBottom, window.innerHeight - handle.offsetHeight - 10));
            newRight = Math.max(10, Math.min(newRight, window.innerWidth - handle.offsetWidth - 10));
            
            element.style.bottom = newBottom + "px";
            element.style.right = newRight + "px";
            
            // Save position
            localStorage.setItem('godaChatbotBottom', newBottom);
            localStorage.setItem('godaChatbotRight', newRight);
        }

        function elementTouchDrag(e) {
            isDragging = true;
            const touch = e.touches[0];
            pos1 = pos3 - touch.clientX;
            pos2 = pos4 - touch.clientY;
            pos3 = touch.clientX;
            pos4 = touch.clientY;
            
            let newBottom = window.innerHeight - pos4 - handle.offsetHeight;
            let newRight = window.innerWidth - pos3 - handle.offsetWidth;
            
            newBottom = Math.max(10, Math.min(newBottom, window.innerHeight - handle.offsetHeight - 10));
            newRight = Math.max(10, Math.min(newRight, window.innerWidth - handle.offsetWidth - 10));
            
            element.style.bottom = newBottom + "px";
            element.style.right = newRight + "px";
            
            localStorage.setItem('godaChatbotBottom', newBottom);
            localStorage.setItem('godaChatbotRight', newRight);
        }

        function closeDragElement() {
            document.removeEventListener('mouseup', closeDragElement);
            document.removeEventListener('mousemove', elementDrag);
            document.removeEventListener('touchend', closeDragElement);
            document.removeEventListener('touchmove', elementTouchDrag);
            
            // If didn't drag much, allow click to open
            setTimeout(() => { isDragging = false; }, 100);
        }

        // Restore saved position
        const savedBottom = localStorage.getItem('godaChatbotBottom');
        const savedRight = localStorage.getItem('godaChatbotRight');
        if (savedBottom && savedRight) {
            element.style.bottom = savedBottom + 'px';
            element.style.right = savedRight + 'px';
        }
    }
}

// Add CSS styles
const chatbotStyles = `
<style>
.goda-chatbot {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Toggle Button */
.goda-chat-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: move;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
    user-select: none;
}

.goda-chat-toggle:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.4);
}

.goda-chat-toggle:active {
    cursor: grabbing;
}

.chat-icon {
    font-size: 24px;
}

.chat-icon-img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    border-radius: 8px;
}

/* Chat Window */
.goda-chat-window {
    position: absolute;
    bottom: 70px;
    right: 0;
    width: 380px;
    height: 500px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    display: none;
    flex-direction: column;
    overflow: hidden;
}

.goda-chat-window.open {
    display: flex;
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Chat Header */
.goda-chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%);
    color: white;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.bot-avatar {
    font-size: 32px;
}

.bot-avatar-img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 8px;
}

.bot-name {
    font-weight: 600;
    font-size: 16px;
}

.bot-status {
    font-size: 12px;
    opacity: 0.9;
}

.close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 28px;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s;
}

.close-btn:hover {
    background: rgba(255,255,255,0.2);
}

/* Chat Messages */
.goda-chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #f8f9fa;
}

.message {
    margin-bottom: 16px;
    display: flex;
    gap: 10px;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.bot-message {
    align-items: flex-start;
}

.user-message {
    flex-direction: row-reverse;
}

.message-avatar {
    font-size: 28px;
    flex-shrink: 0;
}

.message-avatar-img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    border-radius: 6px;
    flex-shrink: 0;
}

.message-content {
    background: white;
    padding: 12px 16px;
    border-radius: 12px;
    max-width: 70%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    line-height: 1.5;
}

.user-message .message-content {
    background: #5a6c7d;
    color: white;
}

.message-content p {
    margin: 0 0 8px 0;
}

.message-content p:last-child {
    margin-bottom: 0;
}

.message-content ul {
    margin: 8px 0;
    padding-left: 20px;
}

.message-content li {
    margin: 4px 0;
}

.message-content a {
    color: #007acc;
    text-decoration: underline;
}

.user-message .message-content a {
    color: white;
}

/* Quick Options */
.quick-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 12px 0;
}

.quick-option {
    padding: 10px 16px;
    background: #f0f2f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    text-align: left;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    color: #333;
}

.quick-option:hover {
    background: #e8eaed;
    border-color: #5a6c7d;
    transform: translateX(4px);
}

.quick-option:active {
    transform: scale(0.98);
}

/* Chat Input */
.goda-chat-input {
    display: flex;
    gap: 8px;
    padding: 16px;
    background: white;
    border-top: 1px solid #e0e0e0;
}

.new-topic-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #f0f2f5;
    color: #5a6c7d;
    border: 2px solid #e0e0e0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all 0.2s;
    flex-shrink: 0;
}

.new-topic-btn:hover {
    background: #e8eaed;
    border-color: #5a6c7d;
    transform: rotate(180deg);
}

.new-topic-btn:active {
    transform: scale(0.95) rotate(180deg);
}

.goda-chat-input input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 24px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
}

.goda-chat-input input:focus {
    border-color: #5a6c7d;
}

.send-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #5a6c7d;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all 0.2s;
    flex-shrink: 0;
}

.send-btn:hover {
    background: #4a5c6d;
    transform: scale(1.05);
}

.send-btn:active {
    transform: scale(0.95);
}

/* Typing Indicator */
.typing-indicator .message-content {
    display: flex;
    gap: 4px;
    padding: 12px 16px;
}

.typing-indicator .dot {
    width: 8px;
    height: 8px;
    background: #5a6c7d;
    border-radius: 50%;
    animation: typing 1.4s infinite;
}

.typing-indicator .dot:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-indicator .dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {
    0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.7;
    }
    30% {
        transform: translateY(-10px);
        opacity: 1;
    }
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .goda-chat-window {
        width: calc(100vw - 40px);
        height: calc(100vh - 140px);
        bottom: 70px;
        right: 20px;
    }
    
    .chat-text {
        display: none;
    }
    
    .goda-chat-toggle {
        width: 56px;
        height: 56px;
        padding: 0;
        justify-content: center;
        border-radius: 50%;
    }
    
    .chat-icon-img {
        width: 28px;
        height: 28px;
    }
    
    .bot-avatar-img {
        width: 36px;
        height: 36px;
    }
    
    .message-avatar-img {
        width: 28px;
        height: 28px;
    }
}

/* Scrollbar Styling */
.goda-chat-messages::-webkit-scrollbar {
    width: 6px;
}

.goda-chat-messages::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.goda-chat-messages::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.goda-chat-messages::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
`;

// Add styles to page
document.head.insertAdjacentHTML('beforeend', chatbotStyles);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createGODAChatbot);
} else {
    createGODAChatbot();
}
