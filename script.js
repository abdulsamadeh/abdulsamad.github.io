// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
    
    // Theme Toggle
    const themeSwitcher = document.getElementById('theme-switcher');
    const themeIcon = themeSwitcher.querySelector('i');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Toggle theme
    themeSwitcher.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Add transition class for smooth theme change
        document.body.classList.add('theme-transition');
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeIcon.style.transform = 'rotate(180deg)';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeIcon.style.transform = 'rotate(0)';
        }
    }
    
    // AI Bot Functionality
    const aiBotToggle = document.getElementById('ai-bot-toggle');
    const aiBotChat = document.getElementById('ai-bot-chat');
    const closeBot = document.getElementById('close-bot');
    const sendMessageBtn = document.getElementById('send-message');
    const userInput = document.getElementById('user-input');
    const botMessages = document.getElementById('bot-messages');
    const voiceToggle = document.getElementById('voice-toggle');
    const notificationBadge = document.querySelector('.notification-badge');
    
    // Bot responses
    const botResponses = {
        greetings: [
            "Hello! 👋 How can I assist you today?",
            "Hi there! I'm ASEH Assistant, ready to help.",
            "Greetings! What can I do for you today?",
            "Welcome to ASEH WEB! How can I help?"
        ],
        services: [
            "We offer:\n• Custom Web Development\n• UI/UX Design\n• Digital Marketing\n• Consulting Services",
            "Our services include web development, design, marketing, and consulting. Which one interests you?",
            "ASEH WEB provides comprehensive digital solutions. Would you like details on any specific service?"
        ],
        contact: [
            "You can reach us at:\n📞 +1 (555) 123-4567\n📧 info@asehweb.com\n📍 123 Web Street, Digital City",
            "Contact us via phone, email, or visit our office. We're available Mon-Fri, 9 AM - 6 PM.",
            "Need to get in touch? Call us at +1 (555) 123-4567 or email info@asehweb.com"
        ],
        default: [
            "I'm here to help with ASEH WEB services. Feel free to ask about our offerings!",
            "How can I assist you with your digital needs today?",
            "I'm ASEH Assistant, ready to answer your questions about web solutions."
        ]
    };
    
    // Typing effect for bot messages
    function typeMessage(text, element) {
        element.innerHTML = '';
        let i = 0;
        const typingSpeed = 20; // milliseconds per character
        
        function typeChar() {
            if (i < text.length) {
                // Handle line breaks
                if (text.charAt(i) === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    element.innerHTML += text.charAt(i);
                }
                i++;
                setTimeout(typeChar, typingSpeed);
                
                // Scroll to bottom
                botMessages.scrollTop = botMessages.scrollHeight;
            }
        }
        
        typeChar();
    }
    
    // Toggle bot chat
    aiBotToggle.addEventListener('click', function() {
        aiBotChat.classList.toggle('active');
        if (aiBotChat.classList.contains('active')) {
            // Remove notification badge when chat is opened
            notificationBadge.style.display = 'none';
        }
    });
    
    closeBot.addEventListener('click', function() {
        aiBotChat.classList.remove('active');
    });
    
    // Quick reply buttons
    document.querySelectorAll('.quick-reply').forEach(button => {
        button.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            userInput.value = message;
            sendMessage();
        });
    });
    
    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        
        if (message === '') return;
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-time">${getCurrentTime()}</div>
        `;
        botMessages.appendChild(userMessage);
        
        // Clear input
        userInput.value = '';
        
        // Scroll to bottom
        botMessages.scrollTop = botMessages.scrollHeight;
        
        // Bot response after delay
        setTimeout(function() {
            let response = getBotResponse(message);
            
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            
            const messageText = document.createElement('p');
            messageContent.appendChild(messageText);
            
            botMessage.innerHTML = `
                <div class="message-content">
                    <p>${response}</p>
                </div>
                <div class="message-time">${getCurrentTime()}</div>
            `;
            botMessages.appendChild(botMessage);
            
            // Scroll to bottom again
            botMessages.scrollTop = botMessages.scrollHeight;
        }, 800);
    }
    
    function getBotResponse(message) {
        const msg = message.toLowerCase();
        
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
            return randomChoice(botResponses.greetings);
        } else if (msg.includes('service') || msg.includes('offer') || msg.includes('provide')) {
            return randomChoice(botResponses.services);
        } else if (msg.includes('contact') || msg.includes('call') || msg.includes('email') || msg.includes('reach')) {
            return randomChoice(botResponses.contact);
        } else {
            return randomChoice(botResponses.default);
        }
    }
    
    function randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    
    // Send message on button click
    sendMessageBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Voice toggle (simulated)
    let voiceActive = false;
    voiceToggle.addEventListener('click', function() {
        voiceActive = !voiceActive;
        if (voiceActive) {
            this.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            this.style.background = 'var(--danger-color)';
            // In a real implementation, this would start voice recognition
            showNotification('Voice input activated');
        } else {
            this.innerHTML = '<i class="fas fa-microphone"></i>';
            this.style.background = '';
            showNotification('Voice input deactivated');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    const navCenter = document.querySelector('.nav-center');
    
    menuToggle.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navCenter.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navCenter.classList.remove('active');
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Back to top functionality
    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Typed text animation in hero
    const typedText = document.querySelector('.typed-text');
    const texts = ['Digital Presence', 'Business Growth', 'Online Success', 'Brand Identity'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation
    setTimeout(type, 1000);
    
    // Particle animation
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = document.querySelector('.hero').offsetHeight;
        }
        
        function createParticles() {
            particles = [];
            const particleCount = Math.min(100, Math.floor(canvas.width / 10));
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.3 + 0.1})`
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Bounce off edges
                if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
                if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                
                // Draw connections
                particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance/100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        // Initialize particles
        window.addEventListener('resize', function() {
            resizeCanvas();
            createParticles();
        });
        
        resizeCanvas();
        createParticles();
        animateParticles();
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .contact-card, .animated-contact');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial states for animated elements
    document.querySelectorAll('.service-card, .contact-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Show success animation
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--success-color)';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 3000);
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            const button = this.querySelector('button');
            const originalHTML = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
                this.reset();
            }, 2000);
        });
    }
    
    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: var(--bg-card);
            color: var(--text-primary);
            padding: 15px 20px;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            border-left: 4px solid var(--primary-color);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Auto-adjust content based on screen size
    function autoAdjustContent() {
        const heroTitle = document.querySelector('.hero-title');
        const servicesGrid = document.querySelector('.services-grid');
        
        if (window.innerWidth < 768) {
            // Adjust for mobile
            if (heroTitle) {
                heroTitle.style.fontSize = '2.2rem';
            }
            
            if (servicesGrid) {
                servicesGrid.style.gap = 'var(--space-lg)';
            }
        } else {
            // Reset for desktop
            if (heroTitle) {
                heroTitle.style.fontSize = '';
            }
            
            if (servicesGrid) {
                servicesGrid.style.gap = '';
            }
        }
    }
    
    // Run auto-adjust on load and resize
    window.addEventListener('load', autoAdjustContent);
    window.addEventListener('resize', autoAdjustContent);
    
    // Initialize with a welcome notification
    setTimeout(() => {
        showNotification('Welcome to ASEH WEB! Try our AI Assistant for help.');
    }, 3000);
});