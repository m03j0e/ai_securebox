const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messageFeed = document.getElementById('messageFeed');
const submitBtn = document.getElementById('submitBtn');
const statusMessage = document.getElementById('statusMessage');

// Fetch messages on load
document.addEventListener('DOMContentLoaded', fetchMessages);

// Handle form submission
messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const content = messageInput.value.trim();
    if (!content) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';

    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });

        const data = await response.json();

        if (response.ok) {
            // Success
            messageInput.value = '';
            showStatus('Message sent successfully!', 'success');
            // Prepend the new message immediately for responsiveness
            // Note: The server returns sanitized content.
            addMessageToFeed({ content: data.content, created_at: new Date().toISOString() }, true);
        } else {
            // Error
            const errorMsg = data.errors ? data.errors.map(e => e.msg).join(', ') : 'Failed to send message';
            showStatus(errorMsg, 'error');
        }
    } catch (err) {
        showStatus('Network error occurred.', 'error');
        console.error(err);
    } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Send Message';
    }
});

async function fetchMessages() {
    try {
        const response = await fetch('/api/messages');
        const data = await response.json();

        messageFeed.innerHTML = '';

        if (data.messages && data.messages.length > 0) {
            data.messages.forEach(msg => {
                addMessageToFeed(msg);
            });
        } else {
            messageFeed.innerHTML = '<div class="loading-spinner">No messages yet. Be the first!</div>';
        }
    } catch (err) {
        messageFeed.innerHTML = '<div class="loading-spinner" style="color: var(--error)">Failed to load messages.</div>';
        console.error(err);
    }
}

function addMessageToFeed(msg, isNew = false) {
    const card = document.createElement('div');
    card.className = 'message-card';

    // Sanitize content just in case, though backend also sanitizes.
    // Backend escaping turns <script> into &lt;script&gt;
    // DOMPurify will keep &lt;script&gt; safe.
    // If we passed raw HTML, DOMPurify would strip unsafe tags.
    const cleanContent = DOMPurify.sanitize(msg.content);

    // Format Date
    const date = new Date(msg.created_at).toLocaleString();

    card.innerHTML = `
        <div class="message-content">${cleanContent}</div>
        <div class="message-meta">${date}</div>
    `;

    if (isNew) {
        // Remove "No messages" if it exists
        if (messageFeed.querySelector('.loading-spinner')) {
            messageFeed.innerHTML = '';
        }
        messageFeed.insertBefore(card, messageFeed.firstChild);
    } else {
        messageFeed.appendChild(card);
    }
}

function showStatus(text, type) {
    statusMessage.textContent = text;
    statusMessage.className = `status ${type}`;
    setTimeout(() => {
        statusMessage.textContent = '';
        statusMessage.className = 'status';
    }, 3000);
}
