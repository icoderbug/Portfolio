document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update last updated date
    document.getElementById('lastUpdated').textContent = "2025-08-25";

    // Form submission handler with Formspree
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            document.querySelector('.submit-btn').textContent = 'Sending...';
            document.querySelector('.submit-btn').disabled = true;
            
            // Create FormData object from the form
            const formData = new FormData(contactForm);
            
            // Use fetch API to send the form data to Formspree
            fetch('https://formspree.io/f/xwpnejzv', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    showToast('success', 'Message sent successfully!');
                    contactForm.reset();
                } else {
                    // Show error message
                    showToast('error', 'Failed to send message. Please try again.');
                }
                document.querySelector('.submit-btn').textContent = 'Send Message';
                document.querySelector('.submit-btn').disabled = false;
            })
            .catch(error => {
                console.error('Error:', error);
                showToast('error', 'Failed to send message. Please try again.');
                document.querySelector('.submit-btn').textContent = 'Send Message';
                document.querySelector('.submit-btn').disabled = false;
            });
        });
    }

    // Animation on scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Function to display toast notifications
function showToast(type, message) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => {
        document.body.removeChild(toast);
    });
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    if (type === 'success') {
        toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        toast.style.backgroundColor = 'var(--secondary-color)';
    } else {
        toast.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        toast.style.backgroundColor = '#e74c3c';
    }
    
    document.body.appendChild(toast);
    
    // Show the toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide and remove the toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Function to handle animations on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-title, .about-content, .skill-category, .profile-card, .project-card, .contact-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.section-title, .about-content, .skill-category, .profile-card, .project-card, .contact-content');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation
    setTimeout(animateOnScroll, 300);
});

// Mobile Navigation
const setupMobileNav = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (!nav || !navLinks) return;
    
    // Create mobile toggle button if it doesn't exist
    if (!document.querySelector('.mobile-nav-toggle')) {
        const mobileNavToggle = document.createElement('div');
        mobileNavToggle.className = 'mobile-nav-toggle';
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        nav.querySelector('.container').appendChild(mobileNavToggle);
        
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and times
            if (navLinks.classList.contains('active')) {
                mobileNavToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
};

// Call setupMobileNav on load and resize
document.addEventListener('DOMContentLoaded', setupMobileNav);
window.addEventListener('resize', setupMobileNav);

// Scroll to top button
const createScrollToTopButton = () => {
    // Remove any existing scroll-to-top button
    const existingButton = document.querySelector('.scroll-top');
    if (existingButton) {
        document.body.removeChild(existingButton);
    }
    
    // Create the button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add styles for the button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s, transform 0.3s;
            z-index: 999;
        }
        
        .scroll-top.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-top:hover {
            background-color: var(--accent-color);
            transform: translateY(-3px);
        }
        
        @media screen and (max-width: 768px) {
            .scroll-top {
                width: 40px;
                height: 40px;
                right: 20px;
                bottom: 20px;
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
};

// Create scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);


