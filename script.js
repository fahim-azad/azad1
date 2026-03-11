document.addEventListener('DOMContentLoaded', () => {
    // ---- Sticky Header ----
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ---- Mobile Menu Toggle ----
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const icon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        });
    });

    // ---- Active Link highlighting on scroll ----
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ---- Smooth scrolling for anchor links (fallback/enhancement) ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Form Submission (Prevent default for UI demo) ----
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.style.backgroundColor = '#4CAF50';
                btn.style.borderColor = '#4CAF50';
                btn.style.color = '#fff';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.removeAttribute('style');
                }, 3000);
            }, 1500);
        });
    }

    // ---- Custom Cursor & Sparkles Logic ----
    const cursorDot = document.querySelector('.cursor-dot');
    const sparkleContainer = document.getElementById('sparkle-container');
    
    // Check if it's a device with a fine pointer (like a mouse)
    if (window.matchMedia("(pointer: fine)").matches && cursorDot && sparkleContainer) {
        
        let mouseX = 0;
        let mouseY = 0;
        let lastSparkleTime = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move cursor dot
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

            // Create sparkles at intervals to not overload DOM
            const now = Date.now();
            if (now - lastSparkleTime > 30) { 
                createSparkle(mouseX, mouseY);
                lastSparkleTime = now;
            }
        });

        function createSparkle(x, y) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            // Random size and offset
            const size = Math.random() * 6 + 4;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            
            // Random translation values for animation
            const tx = (Math.random() - 0.5) * 80;
            const ty = Math.random() * 50 + 20; // Fall downwards mostly
            sparkle.style.setProperty('--tx', `${tx}px`);
            sparkle.style.setProperty('--ty', `${ty}px`);
            
            // Random color
            sparkle.style.backgroundColor = Math.random() > 0.5 ? 'var(--color-primary)' : '#fff';

            sparkleContainer.appendChild(sparkle);

            // Remove sparkle after animation ends
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
        
        // Add hover effects for interactive elements
        const iteractables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .nav-link');
        iteractables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hovering');
            });
        });
    } else {
        if (cursorDot) cursorDot.style.display = 'none';
        if (sparkleContainer) sparkleContainer.style.display = 'none';
        document.body.style.cursor = 'auto';
        document.querySelectorAll('a, button, input, textarea, .btn, .project-card, .skill-card, .nav-link').forEach(el => {
            el.style.cursor = 'pointer';
        });
    }

});
