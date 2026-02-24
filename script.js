/* ==========================================
   WEBSERVICEUDN HOSTING — JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== Navbar Scroll Effect ==========
    const navbar = document.getElementById('navbar');

    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // ========== Mobile Hamburger Menu ==========
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // ========== Active Nav Link on Scroll ==========
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a:not(.btn)');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navAnchors.forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === `#${id}`) {
                        a.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // ========== Region Tab Switching ==========
    document.querySelectorAll('.region-tabs').forEach(tabGroup => {
        const tabs = tabGroup.querySelectorAll('.region-tab');
        const parent = tabGroup.closest('.container');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active from all tabs in this group
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Show correct content
                const targetId = tab.getAttribute('data-target');
                const allContents = parent.querySelectorAll('.tab-content');
                allContents.forEach(content => {
                    content.classList.remove('active');
                });

                const target = document.getElementById(targetId);
                if (target) {
                    target.classList.add('active');
                    // Re-trigger AOS for new content
                    target.querySelectorAll('[data-aos]').forEach(el => {
                        el.classList.add('aos-animate');
                    });
                }
            });
        });
    });

    // ========== FAQ Accordion ==========
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isActive = item.classList.contains('active');

            // Close all others
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ========== AOS (Animate On Scroll) ==========
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply delay if data-aos-delay exists
                const delay = entry.target.getAttribute('data-aos-delay');
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                entry.target.classList.add('aos-animate');
                aosObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        aosObserver.observe(el);
    });

    // ========== Smooth Scroll for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== Typing / Counter Animation for Hero Stats ==========
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const text = counter.textContent;
            // Only animate pure numbers
            if (/^\d+(\.\d+)?%?$/.test(text)) {
                const isPercent = text.includes('%');
                const isDecimal = text.includes('.');
                const target = parseFloat(text);
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    if (isDecimal) {
                        counter.textContent = current.toFixed(1) + (isPercent ? '%' : '');
                    } else {
                        counter.textContent = Math.floor(current) + (isPercent ? '%' : '');
                    }
                }, 40);
            }
        });
    };

    // Trigger counter animation when hero is visible
    const heroSection = document.querySelector('.hero-stats');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        heroObserver.observe(heroSection);
    }

});
