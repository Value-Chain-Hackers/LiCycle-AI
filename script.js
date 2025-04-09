document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const createMobileNav = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Create mobile nav toggle button
        const mobileToggle = document.createElement('div');
        mobileToggle.className = 'mobile-nav-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        header.querySelector('.container').appendChild(mobileToggle);
        
        // Add mobile nav class to existing nav
        nav.classList.add('desktop-nav');
        
        // Toggle mobile navigation
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !mobileToggle.contains(event.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };
    
    // Only create mobile nav if screen width is below 768px
    if (window.innerWidth < 768) {
        createMobileNav();
    }
    
    // Re-check on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768 && !document.querySelector('.mobile-nav-toggle')) {
            createMobileNav();
        }
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile nav if open
            const mobileNav = document.querySelector('nav.desktop-nav');
            const mobileToggle = document.querySelector('.mobile-nav-toggle');
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Scroll to target
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us, ${name}. We'll get back to you shortly.</p>
                <button class="btn btn-primary" id="resetForm">Send Another Message</button>
            `;
            
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
            
            // Reset form button
            document.getElementById('resetForm').addEventListener('click', function() {
                formContainer.innerHTML = '';
                formContainer.appendChild(contactForm);
                contactForm.reset();
            });
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real application, you would send this data to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            const formContainer = newsletterForm.parentElement;
            const originalContent = formContainer.innerHTML;
            
            formContainer.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for subscribing to our newsletter!</p>
                </div>
            `;
            
            // Reset after 3 seconds
            setTimeout(() => {
                formContainer.innerHTML = originalContent;
                const newForm = document.getElementById('newsletterForm');
                if (newForm) {
                    newForm.querySelector('input[type="email"]').value = '';
                    
                    // Re-attach event listener to new form
                    newForm.addEventListener('submit', arguments.callee);
                }
            }, 3000);
        });
    }
    
    // Animate circular diagram on scroll
    const animateCircularDiagram = () => {
        const circleContainer = document.querySelector('.circle-container');
        if (!circleContainer) return;
        
        const circleItems = document.querySelectorAll('.circle-item');
        const circleCenter = document.querySelector('.circle-center');
        
        // Check if element is in viewport
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        };
        
        // Add animation classes when in viewport
        if (isInViewport(circleContainer) && !circleContainer.classList.contains('animated')) {
            circleContainer.classList.add('animated');
            
            // Animate circle center
            circleCenter.style.opacity = '0';
            circleCenter.style.transform = 'translate(-50%, -50%) scale(0.5)';
            
            setTimeout(() => {
                circleCenter.style.transition = 'all 0.6s ease-out';
                circleCenter.style.opacity = '1';
                circleCenter.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 300);
            
            // Animate circle items one by one
            circleItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.5)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.5s ease-out';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 600 + (index * 200));
            });
        }
    };
    
    // Call on scroll
    window.addEventListener('scroll', animateCircularDiagram);
    // Call once on page load
    setTimeout(animateCircularDiagram, 500);
    
    // Add CSS for animations
    const addAnimationStyles = () => {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .stat-item, .service-card, .benefit-item {
                opacity: 0;
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            .stat-item:nth-child(1) { animation-delay: 0.2s; }
            .stat-item:nth-child(2) { animation-delay: 0.4s; }
            .stat-item:nth-child(3) { animation-delay: 0.6s; }
            
            .service-card:nth-child(1) { animation-delay: 0.2s; }
            .service-card:nth-child(2) { animation-delay: 0.4s; }
            .service-card:nth-child(3) { animation-delay: 0.6s; }
            .service-card:nth-child(4) { animation-delay: 0.8s; }
            
            .benefit-item:nth-child(1) { animation-delay: 0.2s; }
            .benefit-item:nth-child(2) { animation-delay: 0.4s; }
            .benefit-item:nth-child(3) { animation-delay: 0.6s; }
            
            /* Mobile nav styles */
            @media (max-width: 768px) {
                .mobile-nav-toggle {
                    display: block;
                    cursor: pointer;
                    font-size: 1.5rem;
                    z-index: 100;
                }
                
                nav.desktop-nav {
                    position: fixed;
                    top: 0;
                    right: -250px;
                    width: 250px;
                    height: 100vh;
                    background-color: var(--white-color);
                    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                    padding: 80px 20px 20px;
                    transition: right 0.3s ease;
                    z-index: 99;
                }
                
                nav.desktop-nav.active {
                    right: 0;
                }
                
                nav.desktop-nav ul {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                nav.desktop-nav ul li {
                    margin: 15px 0;
                    width: 100%;
                }
                
                nav.desktop-nav ul li a {
                    display: block;
                    padding: 5px 0;
                }
            }
            
            /* Success message styles */
            .success-message {
                text-align: center;
                padding: 30px;
                background-color: var(--light-color);
                border-radius: 10px;
                animation: fadeInUp 0.5s ease-out;
            }
            
            .success-message i {
                font-size: 3rem;
                color: var(--primary-color);
                margin-bottom: 15px;
            }
        `;
        document.head.appendChild(styleElement);
    };
    
    addAnimationStyles();
});
