// Chat AI Widget - Tidio Integration
// Adds AI chatbot to all pages

(function() {
    // Tidio Chat Widget
    // Sign up at: https://www.tidio.com (FREE plan available)
    
    // STEP 1: Get your Tidio code
    // After signup, Tidio gives you a code like this:
    // <script src="//code.tidio.co/YOUR_UNIQUE_CODE.js" async></script>
    
    // STEP 2: Replace YOUR_UNIQUE_CODE below with your actual code
    const tidioCode = 'YOUR_UNIQUE_CODE'; // Replace this!
    
    // Load Tidio script
    const script = document.createElement('script');
    script.src = `//code.tidio.co/${tidioCode}.js`;
    script.async = true;
    document.head.appendChild(script);
    
    console.log('💬 Chat AI widget loaded');
})();

// ALTERNATIVE: Custom Gemini-powered chatbot (if you want to build custom)
// Uncomment below to use custom chatbot instead of Tidio

/*
(function() {
    // Create chat button
    const chatButton = document.createElement('button');
    chatButton.id = 'ai-chat-button';
    chatButton.innerHTML = '💬';
    chatButton.style.cssText = `
        position: fixed;
        bottom: 20px;
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
        z-index: 9999;
        transition: transform 0.3s;
    `;
    
    chatButton.onmouseover = () => chatButton.style.transform = 'scale(1.1)';
    chatButton.onmouseout = () => chatButton.style.transform = 'scale(1)';
    
    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'ai-chat-window';
    chatWindow.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 9999;
        display: none;
        flex-direction: column;
    `;
    
    chatWindow.innerHTML = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px 15px 0 0;">
            <h3 style="margin: 0; font-size: 18px;">💬 AI Assistant</h3>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Ask me anything about the site!</p>
        </div>
        <div id="chat-messages" style="flex: 1; overflow-y: auto; padding: 20px;"></div>
        <div style="padding: 15px; border-top: 1px solid #eee;">
            <input type="text" id="chat-input" placeholder="Type your message..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 20px; font-size: 14px;">
        </div>
    `;
    
    // Toggle chat
    chatButton.onclick = () => {
        const isVisible = chatWindow.style.display === 'flex';
        chatWindow.style.display = isVisible ? 'none' : 'flex';
    };
    
    // Handle messages
    const chatInput = chatWindow.querySelector('#chat-input');
    const chatMessages = chatWindow.querySelector('#chat-messages');
    
    chatInput.onkeypress = async (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            const userMessage = chatInput.value.trim();
            chatInput.value = '';
            
            // Add user message
            addMessage(userMessage, 'user');
            
            // Get AI response (you'll need to implement this with Gemini API)
            const aiResponse = await getAIResponse(userMessage);
            addMessage(aiResponse, 'ai');
        }
    };
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            margin-bottom: 15px;
            padding: 10px 15px;
            border-radius: 15px;
            ${sender === 'user' 
                ? 'background: #667eea; color: white; margin-left: 50px; text-align: right;' 
                : 'background: #f5f5f5; color: #333; margin-right: 50px;'}
        `;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    async function getAIResponse(message) {
        // TODO: Implement Gemini API call here
        // For now, return a simple response
        return "I'm here to help! This is a demo response. To enable full AI, integrate Gemini API.";
    }
    
    // Add to page
    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);
    
    console.log('💬 Custom AI chat widget loaded');
})();
*/
