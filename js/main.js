document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Theme Toggle Logic
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    /* =========================================
       Navbar Scroll Effect & Mobile Menu
       ========================================= */
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    // Add background to navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        // Toggle Icon between bars and cross
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('nav-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    /* =========================================
       Active Link Highlighting on Scroll
       ========================================= */
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    /* =========================================
       Scroll Reveal Animations
       ========================================= */
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Handle delay if specified
                const delay = entry.target.getAttribute('data-reveal-delay');
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('revealed');
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Trigger reveal for hero section immediately
    setTimeout(() => {
        document.querySelectorAll('.hero [data-reveal]').forEach(el => {
            el.classList.add('revealed');
        });
    }, 100);

    /* =========================================
       Form Submission handled natively by HTML
       ========================================= */

    /* =========================================
       Custom Cursor Logic
       ========================================= */
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const renderCursor = () => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;

            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        const interactables = document.querySelectorAll('a, button, .glass-card, input, textarea');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovering');
            });
        });
    }

    /* =========================================
       Scroll Progress Bar Logic
       ========================================= */
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    /* =========================================
       Card 3D Tilt Effect
       ========================================= */
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // max rotation -5 to 5 deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    /* =========================================
       Preloader Logic
       ========================================= */
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000); // Minimum 1 second for effect
        }

        /* =========================================
           Particles Initialization
           ========================================= */
        if (window.particlesJS) {
            particlesJS("particles-js", {
                "particles": {
                    "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#45f3ff" },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.5, "random": false },
                    "size": { "value": 3, "random": true },
                    "line_linked": { "enable": true, "distance": 150, "color": "#45f3ff", "opacity": 0.2, "width": 1 },
                    "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": { "enable": true, "mode": "grab" },
                        "onclick": { "enable": true, "mode": "push" },
                        "resize": true
                    },
                    "modes": {
                        "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                        "push": { "particles_nb": 4 }
                    }
                },
                "retina_detect": true
            });
        }
    });

    /* =========================================
       Language Switcher Logic
       ========================================= */
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        let currentLang = localStorage.getItem('language') || 'en';

        const updateLanguage = (lang) => {
            const elements = document.querySelectorAll('[data-en][data-bn]');
            elements.forEach(el => {
                el.innerText = el.getAttribute(`data-${lang}`);
            });
            langToggleBtn.innerText = lang === 'en' ? 'BN' : 'EN';
            localStorage.setItem('language', lang);
            currentLang = lang;
        };

        // Initial set
        if (currentLang !== 'en') {
            updateLanguage(currentLang);
        }

        langToggleBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'bn' : 'en';
            updateLanguage(newLang);
        });
    }

    /* =========================================
       Project Filters Logic
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.display = 'flex';
                    }, 10);
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400); // Wait for transition
                }
            });
        });
    });

    /* =========================================
       Back to Top Button Logic
       ========================================= */
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================================
       Blog Fetching Logic (Dev.to)
       ========================================= */
    const blogContainer = document.getElementById('blog-container');
    if (blogContainer) {
        // Since no username was provided, fallback to a popular flutter topic or just sadhindev if exists
        const username = 'sadhindev'; 
        
        // Let's fetch from dev.to tag flutter if username fails, or just fetch tag flutter
        fetch(`https://dev.to/api/articles?tag=flutter&top=10`)
            .then(res => res.json())
            .then(data => {
                blogContainer.innerHTML = ''; // Clear loading
                // Take first 3 articles
                const articles = data.slice(0, 3);
                
                articles.forEach((article, index) => {
                    const delay = index * 200;
                    const date = new Date(article.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    
                    const blogHTML = `
                        <div class="blog-card glass-card revealed" style="animation-delay: ${delay}ms; transition: all 1s ease;">
                            <img src="${article.cover_image || 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop'}" alt="${article.title}">
                            <div class="blog-content">
                                <span class="blog-date">${date}</span>
                                <h3>${article.title}</h3>
                                <a href="${article.url}" target="_blank" class="btn btn-outline">Read More</a>
                            </div>
                        </div>
                    `;
                    blogContainer.insertAdjacentHTML('beforeend', blogHTML);
                });
            })
            .catch(err => {
                blogContainer.innerHTML = `
                    <div class="glass-card text-center" style="grid-column: 1 / -1; padding: 2rem;">
                        <p style="color: var(--text-secondary);">Could not load articles at this time.</p>
                    </div>
                `;
            });
    }
});
