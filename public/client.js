document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const typingIndicator = document.getElementById('typingIndicator');
    
    document.getElementById('welcome-time').textContent = getCurrentTime();
    
    chatInput.focus();
    
    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        
        if (message === '') return;
        
        addMessage(message, 'user');
        
        chatInput.value = '';
        
        showTypingIndicator();
        
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            hideTypingIndicator();
            
            setTimeout(() => {
                addMessage(data.response, 'bot');
            }, 500);
        })
        .catch(error => {
            hideTypingIndicator();
            
            setTimeout(() => {
                addMessage('Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại!', 'bot');
            }, 500);
            
            console.error('Error:', error);
        });
    }
    
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        
        const bubbleElement = document.createElement('div');
        bubbleElement.classList.add('message-bubble');
        bubbleElement.textContent = text;
        
        const timeElement = document.createElement('div');
        timeElement.classList.add('message-time');
        timeElement.textContent = getCurrentTime();
        
        bubbleElement.appendChild(timeElement);
        messageElement.appendChild(bubbleElement);
        
        chatMessages.appendChild(messageElement);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }
    
    fetch('/api/history')
        .then(response => response.json())
        .then(history => {
            if (history.length > 0) {
                history.forEach(entry => {
                    addMessage(entry.user, 'user');
                    addMessage(entry.bot, 'bot');
                });
            }
        })
        .catch(error => {
            console.error('Error loading chat history:', error);
        });
});