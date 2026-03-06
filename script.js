document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('.content-section');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor scrolling

            // Remove active class from all links and sections
            navLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Find target section and activate it
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // If on mobile, close sidebar after clicking
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 900 && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Bio Language Toggle Logic
    const langToggle = document.getElementById('bio-lang-toggle');
    const langOptions = document.querySelectorAll('.lang-option');
    const bioEs = document.getElementById('bio-es');
    const bioEn = document.getElementById('bio-en');

    if (langToggle && bioEs && bioEn) {
        langToggle.addEventListener('click', () => {
            const isEnglish = langToggle.classList.contains('en-active');

            if (isEnglish) {
                // Switch to Spanish
                langToggle.classList.remove('en-active');
                bioEn.classList.remove('active');
                bioEs.classList.add('active');

                langOptions[0].classList.add('active');
                langOptions[1].classList.remove('active');
            } else {
                // Switch to English
                langToggle.classList.add('en-active');
                bioEs.classList.remove('active');
                bioEn.classList.add('active');

                langOptions[0].classList.remove('active');
                langOptions[1].classList.add('active');
            }
        });

        // Allow clicking the text labels "ES" / "EN" to toggle
        langOptions.forEach(option => {
            option.addEventListener('click', function () {
                const lang = this.getAttribute('data-lang');
                if (lang === 'en' && !langToggle.classList.contains('en-active')) {
                    langToggle.click();
                } else if (lang === 'es' && langToggle.classList.contains('en-active')) {
                    langToggle.click();
                }
            });
        });
    }

    // Gallery Scroll Animation (Intersection Observer)
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the image is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class to trigger CSS animation
                    entry.target.classList.add('visible');
                    // Stop observing once it has animated in
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        galleryItems.forEach(item => {
            observer.observe(item);
        });
    }
});
