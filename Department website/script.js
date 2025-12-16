document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Link Highlighting (Adds fluidity/UX)
    const navLinks = document.querySelectorAll('#nav a');
    const currentPath = window.location.pathname.split('/').pop(); // Get filename (e.g., index.html)

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Handle both standard links and frames.html link
        if (linkHref === currentPath || (linkHref === 'frames.html' && currentPath === 'frames.html')) {
            link.classList.add('active-nav'); // Applies the active CSS style
        } else if (currentPath === '' && linkHref === 'index.html') {
             // Handle case where path is just '/'
             link.classList.add('active-nav');
        }
    });

    // 2. Scroll-Based Content Fade-In Animation (Adds visual fluidity)
    const contentSections = document.querySelectorAll('main > .content-section');
    if (contentSections.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in'); 
                    obs.unobserve(entry.target);
                }
            });
        }, { 
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the section is visible
        });

        contentSections.forEach(section => {
            observer.observe(section);
        });
    }

    // 3. Contact Form Validation (Required for contact.html)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                event.preventDefault(); // Stop default submission
                alert('ERROR: Please fill in your Name, Email, and Message fields to submit the inquiry.');
            } else {
                // If validation passes, typically the form would be submitted to a server.
                // For this assignment, we will simulate success.
                event.preventDefault(); 
                alert(`Thank you, ${name}! Your inquiry has been submitted successfully.`);
                contactForm.reset();
            }
        });
    }
});