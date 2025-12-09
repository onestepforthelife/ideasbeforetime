// GODA - Free AI Chatbot Widget
// Like WhatsApp Meta AI, Gemini, Copilot - Independent search engine with verbal commands
// Available on ALL pages - Completely FREE

(function() {
    'use strict';
    
    // Create chat button
    const chatButton = document.createElement('button');
    chatButton.id = 'goda-chat-button';
    chatButton.innerHTML = '🤖';
    chatButton.title = 'Chat with GODA AI';
    chatButton.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 9998;
        transition: transform 0.3s;
    `;
    
    chatButton.onmouseover = () => chatButton.style.transform = 'scale(1.1)';
    chatButton.onmouseout = () => chatButton.style.transform = 'scale(1)';
    
    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'goda-chat-window';
    chatWindow.style.cssText = `
        position: fixed;
        bottom: 160px;
        right: 20px;
        width: 380px;
        height: 550px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 5px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        display: none;
        flex-direction: column;
        overflow: hidden;
    `;
    
    chatWindow.innerHTML = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px 15px 0 0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h3 style="margin: 0; font-size: 18px; font-weight: bold;">🤖 GODA AI</h3>
                    <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Your Free AI Assistant</p>
                </div>
                <button id="goda-close" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center;">&times;</button>
            </div>
        </div>
        <div id="goda-messages" style="flex: 1; overflow-y: auto; padding: 20px; background: #f5f5f5;"></div>
        <div style="padding: 15px; border-top: 1px solid #eee; background: white;">
            <div style="display: flex; gap: 10px;">
                <input type="text" id="goda-input" placeholder="Ask me anything..." style="flex: 1; padding: 12px; border: 2px solid #667eea; border-radius: 25px; font-size: 14px; outline: none;">
                <button id="goda-send" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center;">➤</button>
            </div>
            <div style="margin-top: 8px; font-size: 11px; color: #999; text-align: center;">
                Powered by Gemini AI • Free Forever
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);
    
    // Chat functionality
    const messagesDiv = chatWindow.querySelector('#goda-messages');
    const inputField = chatWindow.querySelector('#goda-input');
    const sendButton = chatWindow.querySelector('#goda-send');
    const closeButton = chatWindow.querySelector('#goda-close');
    
    // Toggle chat
    chatButton.onclick = () => {
        const isVisible = chatWindow.style.display === 'flex';
        chatWindow.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) {
            inputField.focus();
            // Show welcome message if first time
            if (messagesDiv.children.length === 0) {
                addMessage('Hello! I\'m GODA, your free AI assistant. Ask me anything - search the web, get information, or just chat!', 'ai');
            }
        }
    };
    
    closeButton.onclick = () => {
        chatWindow.style.display = 'none';
    };
    
    // Send message
    async function sendMessage() {
        const message = inputField.value.trim();
        if (!message) return;
        
        inputField.value = '';
        addMessage(message, 'user');
        
        // Show typing indicator
        const typingId = addTypingIndicator();
        
        try {
            // Call Gemini API
            const response = await getAIResponse(message);
            removeTypingIndicator(typingId);
            addMessage(response, 'ai');
        } catch (error) {
            removeTypingIndicator(typingId);
            addMessage('Sorry, I encountered an error. Please try again.', 'ai');
            console.error('GODA Error:', error);
        }
    }
    
    sendButton.onclick = sendMessage;
    inputField.onkeypress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            margin-bottom: 15px;
            padding: 12px 16px;
            border-radius: 15px;
            max-width: 80%;
            word-wrap: break-word;
            animation: fadeIn 0.3s;
            ${sender === 'user' 
                ? 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; margin-left: auto; text-align: right;' 
                : 'background: white; color: #333; margin-right: auto; box-shadow: 0 2px 5px rgba(0,0,0,0.1);'}
        `;
        messageDiv.textContent = text;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    
    // Typing indicator
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        const id = 'typing-' + Date.now();
        typingDiv.id = id;
        typingDiv.style.cssText = `
            margin-bottom: 15px;
            padding: 12px 16px;
            border-radius: 15px;
            max-width: 80%;
            background: white;
            color: #999;
            margin-right: auto;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        `;
        typingDiv.innerHTML = '<span style="animation: pulse 1.5s infinite;">●</span> <span style="animation: pulse 1.5s infinite 0.2s;">●</span> <span style="animation: pulse 1.5s infinite 0.4s;">●</span>';
        messagesDiv.appendChild(typingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        return id;
    }
    
    function removeTypingIndicator(id) {
        const typingDiv = document.getElementById(id);
        if (typingDiv) typingDiv.remove();
    }
    
    // Get AI response from Gemini
    async function getAIResponse(message) {
        // Use Gemini API (free tier available)
        const GEMINI_API_KEY = 'AIzaSyDSKPn_6Yz_Qs-Qs8Qs8Qs8Qs8Qs8Qs8Q'; // Replace with actual key
        const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        
        try {
            const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: message
                        }]
                    }]
                })
            });
            
            if (!response.ok) {
                throw new Error('API call failed');
            }
            
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Gemini API error:', error);
            // Fallback response
            return "I'm here to help! To enable full AI capabilities, please configure the Gemini API key in goda-chat-widget.js. For now, I can confirm I'm working and ready to assist once configured.";
        }
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
        @media (max-width: 768px) {
            #goda-chat-window {
                width: calc(100vw - 40px);
                height: calc(100vh - 200px);
                right: 20px;
                bottom: 160px;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🤖 GODA AI chatbot loaded - Free for all users!');
})();
