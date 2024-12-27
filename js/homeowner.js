document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messagesContainer = document.getElementById('messages');

    // Function to display messages from localStorage
    function displayMessages() {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messagesContainer.innerHTML = '';  // Clear previous messages

        // Display each message
        messages.forEach((msg) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message');
            messageElement.textContent = `${msg.sender}: ${msg.message}`;
            messagesContainer.appendChild(messageElement);
        });

        // Scroll to the bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Display messages when the page loads
    displayMessages();

    // Send message when user clicks send button
    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            // Save the message in localStorage
            let messages = JSON.parse(localStorage.getItem('messages')) || [];
            messages.push({ sender: 'homeowner', message: message });
            localStorage.setItem('messages', JSON.stringify(messages)); // Save to localStorage
            messageInput.value = ''; // Clear input field

            // Immediately update the display with the new message
            displayMessages();
        }
    });

    // Optional: Allow sending a message when pressing Enter
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Prevent form submission
            sendButton.click(); // Trigger send button click
        }
    });

    // Polling every 2-3 seconds to update messages
    setInterval(() => {
        displayMessages();
    }, 3000);

    // Clear messages when the user leaves the page
    window.addEventListener('beforeunload', () => {
        // Clear the messages from localStorage to start fresh next time
        localStorage.removeItem('messages');
    });
});