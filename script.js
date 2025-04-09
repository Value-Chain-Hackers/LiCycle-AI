// Wait for the document to be fully loaded before initializing
(function() {
    // Function to initialize everything when the DOM is ready
    function initializeAll() {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Offset for the sticky header
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Map initialization is no longer needed for LiCycle AI
        // initCacaoMap();
        
        // Animate supply chain steps on scroll
        const steps = document.querySelectorAll('.step');
        
        function checkScroll() {
            steps.forEach(step => {
                const stepTop = step.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (stepTop < windowHeight * 0.8) {
                    step.classList.add('visible');
                }
            });
        }
        
        // Initial check in case elements are already in view
        checkScroll();
        
        // Check on scroll
        window.addEventListener('scroll', checkScroll);
        
        // Back to top button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.classList.add('back-to-top');
        document.body.appendChild(backToTopBtn);
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        function toggleBackToTopButton() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
        
        window.addEventListener('scroll', toggleBackToTopButton);
        
        // Chat Bot Functionality
        initChatBot();
    }

    // Check if the document is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAll);
    } else {
        // Document already loaded, run initialization immediately
        initializeAll();
    }
})();

// Function to initialize the chat bot
function initChatBot() {
    // Get chat bot elements
    const chatBotBubble = document.getElementById('chatBotBubble');
    const chatBotPanel = document.getElementById('chatBotPanel');
    const chatBotClose = document.getElementById('chatBotClose');
    const chatBotInput = document.getElementById('chatBotInput');
    const chatBotSend = document.getElementById('chatBotSend');
    const chatBotMessages = document.getElementById('chatBotMessages');
    
    // Check if all elements exist
    if (!chatBotBubble || !chatBotPanel || !chatBotClose || !chatBotInput || !chatBotSend || !chatBotMessages) {
        console.error('Chat bot elements not found. Chat functionality will not be available.');
        return;
    }
    
    // API configuration
    const API_URL = 'https://openwebui.valuechainhackers.xyz/api/chat/completions';
    const MODEL_ID = 'licycle-ai';
    
    // Chat history to maintain context
    let chatHistory = [
        {
            role: 'system',
            content: 'You are LiCycle AI, a specialized assistant that provides regulatory guidance on CSRD (Corporate Sustainability Reporting Directive) and CBAM (Carbon Border Adjustment Mechanism) for battery recycling businesses and related industries.'
        }
    ];
    
    // Toggle chat panel when bubble is clicked
    chatBotBubble.addEventListener('click', function() {
        chatBotPanel.classList.toggle('active');
        if (chatBotPanel.classList.contains('active')) {
            chatBotInput.focus();
        }
    });
    
    // Close chat panel when close button is clicked
    chatBotClose.addEventListener('click', function() {
        chatBotPanel.classList.remove('active');
    });
    
    // Send message when send button is clicked
    chatBotSend.addEventListener('click', sendMessage);
    
    // Send message when Enter key is pressed in the input field
    chatBotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Function to send message
    function sendMessage() {
        const message = chatBotInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessageToChat('user', message);
        
        // Add to chat history
        chatHistory.push({
            role: 'user',
            content: message
        });
        
        // Clear input
        chatBotInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Send message to API
        sendMessageToAPI(message);
    }
    
    // Function to add message to chat
    function addMessageToChat(sender, content) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-bot-message', sender);
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('chat-bot-message-content');
        messageContent.textContent = content;
        
        messageElement.appendChild(messageContent);
        chatBotMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatBotMessages.scrollTop = chatBotMessages.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('chat-bot-message', 'bot', 'typing-indicator');
        
        const typingContent = document.createElement('div');
        typingContent.classList.add('chat-bot-typing');
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('chat-bot-typing-dot');
            typingContent.appendChild(dot);
        }
        
        typingElement.appendChild(typingContent);
        chatBotMessages.appendChild(typingElement);
        
        // Scroll to bottom
        chatBotMessages.scrollTop = chatBotMessages.scrollHeight;
        
        return typingElement;
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = chatBotMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            chatBotMessages.removeChild(typingIndicator);
        }
    }
    
    // Function to send message to API
    function sendMessageToAPI(message) {
        try {
            // In a real implementation, you would need to obtain an API key
            // For demonstration purposes, we'll simulate a response
            
            // Simulate API call delay
            setTimeout(() => {
                // Remove typing indicator
                removeTypingIndicator();
                
                // Generate a response based on the message
                let response;
                
                if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                    response = "Hello! I'm LiCycle AI, your regulatory compliance assistant. How can I help you with CSRD or CBAM questions today?";
                } else if (message.toLowerCase().includes('csrd')) {
                    response = "The Corporate Sustainability Reporting Directive (CSRD) is an EU regulation that requires nearly 50,000 companies to report detailed environmental and social information. It applies to large companies first (reporting from 2025), then to mid-sized companies (from 2026). For battery recycling companies, this means disclosing information about environmental impact, social responsibility, and governance practices.";
                } else if (message.toLowerCase().includes('cbam')) {
                    response = "The Carbon Border Adjustment Mechanism (CBAM) is an EU carbon tariff system that puts a price on carbon emissions for certain imports into the EU. During the transitional phase (2023-2025), importers must report embedded emissions. From 2026, companies will need to purchase carbon certificates for imports. This may affect battery recyclers importing materials or exporting recycled components to the EU.";
                } else if (message.toLowerCase().includes('battery') || message.toLowerCase().includes('recycling')) {
                    response = "Battery recycling companies face specific regulatory challenges under CSRD and CBAM. If your company meets size thresholds for CSRD, you'll need to report on sustainability metrics. For CBAM, if you import materials like metals or export recycled battery components to the EU, you may need to account for carbon emissions. Additionally, the EU Battery Regulation imposes requirements like carbon footprint declarations and recycled content quotas.";
                } else if (message.toLowerCase().includes('compliance') || message.toLowerCase().includes('report')) {
                    response = "For compliance with CSRD and CBAM, companies need to: 1) Determine if they're in scope based on size and operations, 2) Understand the specific reporting requirements and timelines, 3) Set up data collection systems for environmental and social metrics, 4) Prepare for external verification of reports, and 5) Stay updated on evolving standards. I can help with specific questions about these steps.";
                } else {
                    response = "I'm here to help with your questions about CSRD and CBAM regulations, especially as they apply to battery recycling businesses. Feel free to ask about reporting requirements, compliance timelines, or how these regulations might affect your operations.";
                }
                
                // Add bot response to chat
                addMessageToChat('bot', response);
                
                // Add to chat history
                chatHistory.push({
                    role: 'assistant',
                    content: response
                });
                
            }, 1500);
            
            // In a real implementation with API key, you would make an actual API call like this:
            /*
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer YOUR_API_KEY`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: MODEL_ID,
                    messages: chatHistory
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Remove typing indicator
                removeTypingIndicator();
                
                // Add bot response to chat
                if (data.choices && data.choices.length > 0) {
                    const botResponse = data.choices[0].message.content;
                    addMessageToChat('bot', botResponse);
                    
                    // Add to chat history
                    chatHistory.push({
                        role: 'assistant',
                        content: botResponse
                    });
                } else {
                    addMessageToChat('bot', 'Sorry, I encountered an error. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error sending message to API:', error);
                
                // Remove typing indicator
                removeTypingIndicator();
                
                // Add error message to chat
                addMessageToChat('bot', 'Sorry, I encountered an error. Please try again.');
            });
            */
            
        } catch (error) {
            console.error('Error sending message to API:', error);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add error message to chat
            addMessageToChat('bot', 'Sorry, I encountered an error. Please try again.');
        }
    }
}

// Function to initialize the cacao production map (kept for reference but not used)
function initCacaoMap() {
    // Check if the map element exists
    const mapElement = document.getElementById('cacao-map');
    if (!mapElement) return;
    
    // Map initialization code removed as it's no longer needed for LiCycle AI
}
