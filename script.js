// Header Scroll Effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.style.background = 'rgba(10, 14, 39, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0, 212, 255, 0.15)';
    } else {
        header.style.background = 'rgba(10, 14, 39, 0.9)';
        header.style.boxShadow = '0 4px 30px rgba(0, 212, 255, 0.1)';
    }
});

// Scroll Animation for Product Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all product cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        // Stagger animation
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// Product Card Click Animation
document.querySelectorAll('.btn-product').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
