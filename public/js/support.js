
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('loginModal');
    const btn = document.querySelector('.login-btn');
    const close = document.querySelector('.close-modal');
    const form = document.getElementById('loginForm');
    const msg = document.getElementById('loginMessage');

    // Check login state from localStorage
    function isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    function setLoggedIn(loggedIn) {
        localStorage.setItem('isLoggedIn', loggedIn ? 'true' : 'false');
    }

    function updateLoginButton() {
        if (isLoggedIn()) {
            btn.textContent = 'Đăng xuất';
            btn.classList.add('logout-btn');
            btn.classList.remove('login-btn');
            btn.style.color = "#f44336";
            btn.style.borderColor = "#f44336";
            btn.style.background = "#fff";
        } else {
            btn.textContent = 'Đăng nhập';
            btn.classList.add('login-btn');
            btn.classList.remove('logout-btn');
            btn.style.color = "#1a73e8";
            btn.style.borderColor = "#1a73e8";
            btn.style.background = "#fff";
        }
    }

    // Initial button state
    updateLoginButton();

    // Button click handler
    btn.addEventListener('click', function (e) {
        if (isLoggedIn()) {
            // Đăng xuất
            setLoggedIn(false);
            updateLoginButton();
            e.preventDefault();
            alert('Bạn đã đăng xuất!');
        } else {
            // Đăng nhập
            e.preventDefault();
            modal.style.display = 'block';
            msg.textContent = '';
            form.reset();
            setTimeout(() => {
                document.getElementById('username').focus();
            }, 200);
        }
    });

    // Close modal
    close.onclick = function () { modal.style.display = 'none'; }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Đăng nhập logic (demo)
    form.onsubmit = function (e) {
        e.preventDefault();
        const username = form.username.value.trim();
        const password = form.password.value;
        // Demo: accept username 'admin' and password '123456'
        if (username === 'admin' && password === '123456') {
            msg.style.color = '#2ecc40';
            msg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Đăng nhập thành công!';
            setLoggedIn(true);
            updateLoginButton();
            setTimeout(() => { modal.style.display = 'none'; }, 900);
        } else {
            msg.style.color = '#e74c3c';
            msg.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Tên đăng nhập hoặc mật khẩu không đúng!';
        }
    }
});

// FAQ toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

// Chatbox functionality
const chatbox = document.getElementById('chatbox');
const chatboxContent = document.getElementById('chatboxContent');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const closeChat = document.querySelector('.close-chat');

closeChat.addEventListener('click', () => {
    chatbox.style.display = 'none';
});

sendMessage.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
});

function sendChatMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Add user message
    addMessage('user', userMessage);
    chatInput.value = '';

    // Simulate bot response
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        addMessage('bot', botResponse);
    }, 500);
}

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<div class="message-text">${text}</div>`;
    chatboxContent.appendChild(messageDiv);
    chatboxContent.scrollTop = chatboxContent.scrollHeight;
}

function getBotResponse(input) {
    if (input.includes('đặt phòng')) return 'Bạn có thể đặt phòng qua hotline: 0788 0646 458.';
    if (input.includes('hủy phòng')) return 'Chính sách hủy phòng phụ thuộc vào từng khách sạn.';
    return 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Vui lòng thử lại!';
}