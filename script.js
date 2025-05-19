// Theme functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Check for saved theme preference or use device preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else if (prefersDarkScheme.matches) {
    setTheme('dark');
}

// Toggle theme when button is clicked
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Apply subtle animation to the toggle
        themeToggle.style.animation = 'subtlePulse 0.5s ease-in-out';
        setTimeout(() => {
            themeToggle.style.animation = '';
        }, 500);
        
        setTheme(newTheme);
    });
}

// Page loading functionality
window.addEventListener('load', function() {
    // Hide loader after page is fully loaded
    setTimeout(function() {
        document.querySelector('.page-loader').classList.add('loaded');
        document.body.classList.add('loaded');
    }, 500); // Small delay for smoother transition
    
    // Initialize AOS (Animate On Scroll) with subtle settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50,
        disable: 'mobile' // Disable on mobile for better performance
    });
    
    // Add micro-interactions to buttons
    addMicroInteractions();
});

// Function to add micro-interactions to elements
function addMicroInteractions() {
    // Add subtle hover effects to buttons
    const buttons = document.querySelectorAll('.cta-button, #theme-toggle, .carousel-button, .slider-prev, .slider-next');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'subtlePulse 0.5s ease-in-out';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
    
    // Add subtle interactions to cards
    const cards = document.querySelectorAll('.feature, .service-card, .portfolio-item, .audience-item, .process-step');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'subtleGlow 2s infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
}

// Cross-browser compatibility helper
var isIE = !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
var isOldBrowser = isIE || isEdge;

// Polyfill for Element.closest for IE
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Typing animation
    const texts = [
        'Affordable one-page websites for small businesses.',
        'Get a beautiful, high-converting landing page.',
        'Quick turnaround with mobile-first design.',
        'Stand out online and convert visitors into customers.',
        'Affordable one-page websites for small businesses. Get a beautiful, high-converting landing page with quick turnaround and mobile-first design.'
    ];
    const typingText = document.querySelector('.typing-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 30 : 50;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            textIndex = (textIndex + 1) % texts.length;
            isDeleting = false;
            typeSpeed = 500; // Pause before starting new text
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000); // Start after 1 second
    // Read More Button for About Section
    const readMoreBtn = document.querySelector('.read-more-btn');
    const expandableText = document.querySelector('.about-text-expandable');
    
    if (readMoreBtn && expandableText) {
        readMoreBtn.addEventListener('click', function() {
            expandableText.classList.toggle('expanded');
            this.textContent = expandableText.classList.contains('expanded') ? 'Read Less' : 'Read More';
        });
    }
    
    
    // Mobile Carousel Functionality
    function initCarousels() {
        if (window.innerWidth <= 992) {
            setupCarousel('.features', '.feature');
            setupCarousel('.process-steps', '.process-step');
            setupCarousel('.service-cards', '.service-card');
            setupCarousel('.portfolio-grid', '.portfolio-item');
            setupCarousel('.audience-grid', '.audience-item');
        }
    }
    
    function setupCarousel(containerSelector, itemSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        
        const items = container.querySelectorAll(itemSelector);
        if (items.length <= 1) return;
        
        // Create carousel structure
        container.classList.add('carousel-container');
        
        // Create track to hold all items
        const track = document.createElement('div');
        track.classList.add('carousel-track');
        
        // Wrap each item in a carousel item div
        items.forEach(item => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            // Move the item into the carousel item
            carouselItem.appendChild(item.cloneNode(true));
            track.appendChild(carouselItem);
        });
        
        // Replace container contents with the track
        container.innerHTML = '';
        container.appendChild(track);
        
        // Add navigation
        const nav = document.createElement('div');
        nav.classList.add('carousel-nav');
        
        const prevButton = document.createElement('button');
        prevButton.classList.add('carousel-button', 'prev');
        prevButton.innerHTML = '<i class="fa fa-chevron-left" aria-hidden="true"></i>';
        prevButton.setAttribute('aria-label', 'Previous');
        
        const nextButton = document.createElement('button');
        nextButton.classList.add('carousel-button', 'next');
        nextButton.innerHTML = '<i class="fa fa-chevron-right" aria-hidden="true"></i>';
        nextButton.setAttribute('aria-label', 'Next');
        
        nav.appendChild(prevButton);
        nav.appendChild(nextButton);
        container.appendChild(nav);
        
        // Add dots for navigation
        const dots = document.createElement('div');
        dots.classList.add('carousel-dots');
        
        for (let i = 0; i < items.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dots.appendChild(dot);
        }
        
        container.appendChild(dots);
        
        // Set up carousel functionality
        let currentIndex = 0;
        const dotElements = dots.querySelectorAll('.carousel-dot');
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots
            dotElements.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Update button states
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === items.length - 1;
        }
        
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        nextButton.addEventListener('click', () => {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Enable dot navigation
        dotElements.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Initialize button states
        updateCarousel();
    }
    
    // Initialize carousels on load and resize
    initCarousels();
    window.addEventListener('resize', initCarousels);
    
    // Interactive Service Cards
    function initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        const serviceCardsContainer = document.querySelector('.service-cards');
        
        if (serviceCards.length < 2 || !serviceCardsContainer) return;
        
        // Store original order of cards
        const originalOrder = Array.from(serviceCards).map(card => {
            // Clone the card but remove any middle class
            const clone = card.cloneNode(true);
            clone.classList.remove('middle');
            return clone;
        });
        
        serviceCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                // Don't do anything if this card is already in the middle
                if (card.classList.contains('middle')) return;
                
                // On desktop, rearrange cards to put the clicked one in the middle
                if (window.innerWidth > 768) {
                    // Remove all cards
                    serviceCardsContainer.innerHTML = '';
                    
                    // Create a new array with the clicked card in the middle
                    const newOrder = [...originalOrder];
                    
                    // Remove the clicked card from its original position
                    newOrder.splice(index, 1);
                    
                    // Calculate middle position
                    const middleIndex = Math.floor(newOrder.length / 2);
                    
                    // Create the middle card
                    const middleCard = originalOrder[index].cloneNode(true);
                    middleCard.classList.add('middle');
                    
                    // Insert the middle card
                    newOrder.splice(middleIndex, 0, middleCard);
                    
                    // Add all cards back to the container
                    newOrder.forEach(c => {
                        const newCard = c.cloneNode(true);
                        serviceCardsContainer.appendChild(newCard);
                    });
                    
                    // Re-initialize service cards to add event listeners to the new cards
                    initServiceCards();
                }
            });
        });
    }
    
    // Initialize service cards
    initServiceCards();

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        // Calculate scroll progress percentage
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        // Update progress bar width
        scrollProgress.style.width = scrollPercent + '%';
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Function to update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Get current scroll position with a small offset
        const scrollPosition = window.scrollY + 100;
        
        // Find the current active section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const currentLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                }
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return; // Skip empty hrefs
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

// Modal functionality
const modal = document.getElementById('booking-modal');
const closeModalBtn = document.querySelector('.close-modal');
const openModalButtons = document.querySelectorAll('.open-modal');

// Function to open modal
function openModalFunc() {
    if (modal) {
        modal.style.display = 'block';
        modal.offsetWidth; // Trigger reflow before adding the show class
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

// Function to close modal
function closeModalFunc() {
    if (modal) {
        modal.classList.remove('show');
        setTimeout(function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 300); // Match transition duration
    }
}

// Add click event to close button
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModalFunc);
}

// Add event listeners to all open-modal buttons
openModalButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        openModalFunc();
    });
});

// Add click event to book now button
const bookNowBtn = document.getElementById('book-now-btn');
if (bookNowBtn) {
    bookNowBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModalFunc();
    });
}

// Add click events to all get started buttons
const getStartedBtns = document.querySelectorAll('.get-started-btn');
if (getStartedBtns) {
    getStartedBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModalFunc();
        });
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
        closeModalFunc();
    }
});

// Booking form submission with WhatsApp
const bookingForm = document.getElementById('booking-form');
const whatsappSubmit = document.getElementById('whatsapp-submit');

if (whatsappSubmit && bookingForm) {
    // Prevent default form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
    });

    // Handle WhatsApp submission
    whatsappSubmit.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove any existing validation messages
        const existingMessages = document.querySelectorAll('.validation-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Get form values directly from form elements
        const fullNameInput = document.getElementById('fullName');
        const businessNameInput = document.getElementById('businessName');
        const websiteGoalInput = document.getElementById('websiteGoal');
        const budgetInput = document.getElementById('budget');
        const timelineInput = document.getElementById('timeline');
        const messageInput = document.getElementById('message');

        // Get values and trim whitespace
        const fullName = fullNameInput?.value?.trim() || '';
        const businessName = businessNameInput?.value?.trim() || '';
        const websiteGoal = websiteGoalInput?.value?.trim() || '';
        const budget = budgetInput?.value?.trim() || 'Not specified';
        const timeline = timelineInput?.value?.trim() || '';
        const message = messageInput?.value?.trim() || 'No additional details';
        
        // Debug log
        console.log('Form Values:', {
            fullName,
            email,
            businessName,
            websiteGoal,
            budget,
            timeline,
            message
        });
        
        // Validate required fields
        const requiredFields = [
            { input: fullNameInput, value: fullName, label: 'Full Name' },
            { input: businessNameInput, value: businessName, label: 'Business Name' },
            { input: websiteGoalInput, value: websiteGoal, label: 'Website Goal' },
            { input: timelineInput, value: timeline, label: 'Timeline' }
        ];
        
        // Add input event listeners to all required fields
        requiredFields.forEach(field => {
            if (field.input) {
                field.input.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.classList.remove('error');
                    }
                });
            }
        });

        // Check for missing fields
        const missingFields = requiredFields.filter(field => {
            const isEmpty = !field.value;
            if (isEmpty && field.input) {
                field.input.classList.add('error');
            } else if (field.input) {
                field.input.classList.remove('error');
            }
            return isEmpty;
        });
        
        if (missingFields.length > 0) {
            // Remove any existing validation messages
            const existingMessages = document.querySelectorAll('.validation-message');
            existingMessages.forEach(msg => msg.remove());
            
            const validationDiv = document.createElement('div');
            validationDiv.className = 'validation-message';
            validationDiv.innerHTML = `
                <p>Please fill in the following required fields:</p>
                <ul>
                    ${missingFields.map(field => `<li>${field.label}</li>`).join('')}
                </ul>
            `;
            validationDiv.style.color = '#ff3860';
            validationDiv.style.marginBottom = '15px';
            validationDiv.style.textAlign = 'left';
            
            const submitButtons = document.querySelector('.form-buttons');
            if (submitButtons) {
                submitButtons.parentNode.insertBefore(validationDiv, submitButtons);
            }
            return;
        }
        
        try {
            // Format WhatsApp message
            const whatsappMessage = [
                "Hello Sarah, I'm interested in your web design services.",
                "",
                `Name: ${fullName}`,
                `Business: ${businessName}`,
                `Website Goal: ${websiteGoal}`,
                `Budget: ${budget}`,
                `Timeline: ${timeline}`,
                "",
                `Additional Details: ${message}`
            ].join('\n');

            // Show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'validation-message success';
            successDiv.textContent = 'Opening WhatsApp...';
            successDiv.style.color = '#00c853';
            successDiv.style.marginBottom = '15px';
            successDiv.style.textAlign = 'center';
            
            const submitArea = document.querySelector('.form-buttons');
            if (submitArea) {
                submitArea.parentNode.insertBefore(successDiv, submitArea);
            }

            // Open WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            window.open(`https://wa.me/2348084077486?text=${encodedMessage}`, '_blank');
            
            // Reset form and close modal
            bookingForm.reset();
            closeModalFunc();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successDiv.remove();
            }, 3000);
            
        } catch (error) {
            console.error('Error sending message:', error);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'validation-message error';
            errorDiv.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
            errorDiv.style.color = '#ff3860';
            errorDiv.style.marginBottom = '15px';
            errorDiv.style.textAlign = 'center';
            
            const errorArea = document.querySelector('.form-buttons');
            if (errorArea) {
                errorArea.parentNode.insertBefore(errorDiv, errorArea);
            }
        }
    });
}

// Regular contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get form values for validation
        const name = document.getElementById('name')?.value?.trim() || '';
        const email = document.getElementById('email')?.value?.trim() || '';
        const message = document.getElementById('message')?.value?.trim() || '';
        
        // Validate required fields
        if (!name || !email || !message) {
            e.preventDefault(); // Prevent submission if validation fails
            
            // Remove any existing validation messages
            const existingMessages = contactForm.querySelectorAll('.validation-message');
            existingMessages.forEach(msg => msg.remove());
            
            const validationDiv = document.createElement('div');
                validationDiv.innerHTML = `
                    <p>Please fill in all required fields:</p>
                    <ul>
                        ${!name ? '<li>Name</li>' : ''}
                        ${!email ? '<li>Email</li>' : ''}
                        ${!message ? '<li>Message</li>' : ''}
                    </ul>
                `;
                validationDiv.style.color = '#ff3860';
                validationDiv.style.marginBottom = '15px';
                validationDiv.style.textAlign = 'left';
                
                const submitButton = contactForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.parentNode.insertBefore(validationDiv, submitButton);
                }
                return;
            }
            
            // If validation passes, the form will submit naturally to the mailto: handler
            // This will open the user's default email client with a pre-filled email
            
            // Show a helpful message after successful submission
            setTimeout(() => {
                const successDiv = document.createElement('div');
                successDiv.className = 'validation-message success';
                successDiv.textContent = 'Opening your email client...';
                successDiv.style.color = '#00c853';
                successDiv.style.marginBottom = '15px';
                successDiv.style.textAlign = 'center';
                
                const submitButton = contactForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.parentNode.insertBefore(successDiv, submitButton);
                }
                
                // Remove the message after 5 seconds
                setTimeout(() => {
                    successDiv.remove();
                }, 5000);
            }, 100);
        });
    }
    
    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
});
