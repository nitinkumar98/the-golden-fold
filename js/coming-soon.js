// Create starfield background
document.addEventListener('DOMContentLoaded', function() {
    const bgAnimation = document.getElementById('bgAnimation');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random properties
        const size = Math.random() * 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 5;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${delay}s`;
        
        bgAnimation.appendChild(star);
    }

    // Set your launch date (YYYY, MM-1, DD)
    const launchDate = new Date(Date.UTC(2026, 11, 31, 0, 0, 0));
    
    // DOM elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const form = document.getElementById('subscriptionForm');
    
    // Update countdown every second
    const countdown = setInterval(function() {
        const now = new Date();
        const distance = launchDate - now;
        
        // If launch date passed
        if (distance < 0) {
            clearInterval(countdown);
            document.querySelector('.content-box').innerHTML = `
                <div class="logo">OCEAN</div>
                <h1>We're Live Now!</h1>
                <p class="subtitle">Thank you for your patience. Our website is now live.</p>
                <a href="/" class="submit-btn" style="display: inline-block; width: auto; padding: 1rem 2rem; margin-top: 2rem;">
                    Visit Website
                </a>
            `;
            return;
        }
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display with animation if changed
        updateWithAnimation(daysEl, days);
        updateWithAnimation(hoursEl, hours);
        updateWithAnimation(minutesEl, minutes);
        updateWithAnimation(secondsEl, seconds);
        
    }, 1000);
    
    // Helper function to update with animation
    function updateWithAnimation(element, value) {
        if (element.textContent !== value.toString().padStart(2, '0')) {
            element.classList.add('changing');
            element.textContent = value.toString().padStart(2, '0');
            setTimeout(() => {
                element.classList.remove('changing');
            }, 500);
        }
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('.email-input').value;
        
        // Here you would typically send to your backend
        // For demo, we'll just show a message
        this.innerHTML = `
            <div style="padding: 1.5rem; background-color: #f0f9ff; border-radius: 8px; color: var(--primary);">
                <p style="margin-bottom: 0;">Thank you! We'll notify you at <strong>${email}</strong> when we launch.</p>
            </div>
        `;
    });
});