/* ============================================================
   SHARIER SAKIB — PORTFOLIO
   main.js — Loader, navigation, particles, cursor, filters, form
   ============================================================ */

(function () {
    'use strict';

    /* ------------------------------------------------------------
       1. PAGE LOADER
       ------------------------------------------------------------ */
    var loader = document.getElementById('loader');

    window.addEventListener('load', function () {
        if (loader) {
            window.setTimeout(function () {
                loader.classList.add('loaded');
            }, 650);
        }
    });

    /* ------------------------------------------------------------
       2. MOBILE NAV TOGGLE
       ------------------------------------------------------------ */
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ------------------------------------------------------------
       3. CURSOR GLOW (desktop only — guarded by CSS hover:none too)
       ------------------------------------------------------------ */
    var cursorGlow = document.querySelector('.cursor-glow');

    if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
        window.addEventListener('mousemove', function (e) {
            cursorGlow.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px) translate(-50%, -50%)';
        }, { passive: true });
    }

    /* ------------------------------------------------------------
       4. HERO PARTICLE CANVAS
       ------------------------------------------------------------ */
    var canvas = document.getElementById('particleCanvas');

    if (canvas && canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var particleCount = window.innerWidth < 768 ? 35 : 70;
        var heroSection = document.getElementById('hero');

        function resizeCanvas() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        }

        function createParticles() {
            particles = [];
            for (var i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 1.6 + 0.6,
                    vx: (Math.random() - 0.5) * 0.25,
                    vy: (Math.random() - 0.5) * 0.25,
                    alpha: Math.random() * 0.5 + 0.15
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(124, 168, 255, ' + p.alpha + ')';
                ctx.fill();
            }

            window.requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        createParticles();
        drawParticles();

        window.addEventListener('resize', function () {
            resizeCanvas();
            createParticles();
        });
    }

    /* ------------------------------------------------------------
       5. PROJECTS FILTER
       ------------------------------------------------------------ */
    var filterBtns = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');

            projectCards.forEach(function (card) {
                var category = card.getAttribute('data-category');
                var show = filter === 'all' || filter === category;
                card.classList.toggle('hidden', !show);
            });
        });
    });

    var linkedProjectCards = document.querySelectorAll('.project-card[data-project-url]');

    linkedProjectCards.forEach(function (card) {
        function openProject() {
            var url = card.getAttribute('data-project-url');
            var target = card.getAttribute('data-project-target');

            if (target === '_blank') {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                window.location.assign(url);
            }
        }

        card.addEventListener('click', function (event) {
            if (event.target.closest('a, button, input, select, textarea, label')) return;
            openProject();
        });

        card.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openProject();
            }
        });
    });

    /* ------------------------------------------------------------
       6. CONTACT FORM (client-side only — no backend wired yet)
       ------------------------------------------------------------ */
    var contactForm = document.querySelector('.contact-form');
    var formNote = document.getElementById('formNote');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = contactForm.elements.fullName.value.trim();
            var email = contactForm.elements.email.value.trim();
            var subject = contactForm.elements.subject.value.trim();
            var message = contactForm.elements.message.value.trim();
            var whatsappMessage =
                '*New portfolio enquiry*\n\n' +
                '*Name:* ' + name + '\n' +
                '*Email:* ' + email + '\n' +
                '*Subject:* ' + subject + '\n\n' +
                '*Message:*\n' + message;
            var whatsappUrl = 'https://wa.me/8801868457416?text=' + encodeURIComponent(whatsappMessage);

            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

            if (formNote) {
                formNote.textContent = 'Opening WhatsApp with your message…';
            }

            contactForm.reset();
        });
    }

    /* ------------------------------------------------------------
       7. BACK TO TOP
       ------------------------------------------------------------ */
    var backToTop = document.getElementById('backToTop');

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
