document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic Background Animation (Simple Example: Moving Bubbles)
    const hero = document.getElementById('hero');
    const dynamicBg = hero.querySelector('.dynamic-background');

    if (dynamicBg) {
        for (let i = 0; i < 20; i++) { // Create 20 bubbles
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.style.width = `${Math.random() * 20 + 5}px`; // Random size
            bubble.style.height = bubble.style.width;
            bubble.style.left = `${Math.random() * 100}%`; // Random horizontal position
            bubble.style.animationDuration = `${Math.random() * 10 + 10}s`; // Random speed
            bubble.style.animationDelay = `${Math.random() * 5}s`; // Random start delay
            dynamicBg.appendChild(bubble);
        }
    }
    // Add CSS for bubbles in style.css if not already present
    // Example CSS for .bubble:
    /*
    .bubble {
        position: absolute;
        bottom: -30px; // Start from below the screen
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        animation: rise linear infinite;
        pointer-events: none; // So they don't interfere with clicks
    }

    @keyframes rise {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-110vh) scale(0.5); // Rise above the hero section
            opacity: 0;
        }
    }
    */


    // Project Card Hover Effects (already handled by CSS, but JS can enhance if needed)
    // For example, if you wanted to add a class on hover for more complex animations:
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Example: card.classList.add('hovered');
        });
        card.addEventListener('mouseleave', () => {
            // Example: card.classList.remove('hovered');
        });
    });

    // Contact Form Submission (Basic Example)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission for this demo

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert(`Thank you, ${name}! Your message has been "sent".\nEmail: ${email}\nMessage: ${message}`);
                contactForm.reset(); // Clear the form
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Floating icons animation is primarily CSS-driven.
    // JS can be used for more complex interactions or physics-based floating if desired.

    // Observe elements for animations on scroll (Intersection Observer API)
    const animatedElements = document.querySelectorAll('.service-item, .project-card, #about .about-text, #about .about-image');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // Optional: unobserve after animation to save resources
                // observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    animatedElements.forEach(el => {
        // Initial state for animation (set in CSS or here)
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

});

// Add the bubble CSS to style.css:
/*
.dynamic-background .bubble {
    position: absolute;
    bottom: -50px;
    background-color: rgba(241, 196, 15, 0.3); // Secondary color with alpha
    border-radius: 50%;
    animation: rise linear infinite;
    pointer-events: none;
    z-index: 0;
}

@keyframes rise {
    0% {
        transform: translateY(0) scale(1);
        opacity: 0.7;
    }
    50% {
        opacity: 0.3;
    }
    100% {
        transform: translateY(-120vh) scale(0.3);
        opacity: 0;
    }
}
*/
