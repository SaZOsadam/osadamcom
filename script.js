document.addEventListener('DOMContentLoaded', function() {
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
    const closeModal = document.querySelector('.close-modal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    
    // Function to open modal
    function openModalFunc() {
        modal.style.display = 'block';
        // Trigger reflow before adding the show class for animation
        modal.offsetWidth;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close modal
    function closeModalFunc() {
        modal.classList.remove('show');
        setTimeout(function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 300); // Match transition duration
    }
    
    // Add event listeners to all open-modal buttons
    openModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModalFunc();
        });
    });

    const bookNowBtn = document.getElementById('book-now-btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModalFunc();
        });
    }

    const getStartedBtns = document.querySelectorAll('.get-started-btn');
    if (getStartedBtns) {
        getStartedBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                openModalFunc();
            });
        });
    }
    
    // Event listeners for closing modal
    closeModal.addEventListener('click', closeModalFunc);
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunc();
        }
    });

    // Booking form submission with WhatsApp
    const bookingForm = document.getElementById('booking-form');
    const whatsappSubmit = document.getElementById('whatsapp-submit');
    
    // WhatsApp submit button
    if (whatsappSubmit) {
        whatsappSubmit.addEventListener('click', function() {
            // Get form values
            const fullName = document.getElementById('fullName').value || '';
            const email = document.getElementById('email').value || '';
            const businessName = document.getElementById('businessName').value || '';
            const websiteGoal = document.getElementById('websiteGoal').value || '';
            const budget = document.getElementById('budget').value || 'Not specified';
            const timeline = document.getElementById('timeline').value || '';
            const message = document.getElementById('message').value || 'No additional details';
            
            // Validate required fields
            if (!fullName || !email || !businessName || !websiteGoal || !timeline) {
                alert('Please fill in all required fields before sending to WhatsApp');
                return;
            }
            
            // Create WhatsApp message
            let whatsappMessage = `Hello Sarah, I'm interested in your web design services.

`;
            whatsappMessage += `Name: ${fullName}
`;
            whatsappMessage += `Email: ${email}
`;
            whatsappMessage += `Business: ${businessName}
`;
            whatsappMessage += `Website Goal: ${websiteGoal}
`;
            whatsappMessage += `Budget: ${budget}
`;
            whatsappMessage += `Timeline: ${timeline}
`;
            whatsappMessage += `Message: ${message}`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp with pre-filled message
            window.open(`https://wa.me/2348084077486?text=${encodedMessage}`, '_blank');
            
            // Reset the form and close modal
            bookingForm.reset();
            closeModalFunc();
        });
    }
    
    // Regular contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.feature, .service-card, .portfolio-item, .audience-item, .process-step');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Add CSS class for animation
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
});
