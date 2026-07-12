/* ============================================================
   SHARIER SAKIB — PORTFOLIO
   scroll.js — Scroll reveal, progress bar, parallax, header state
   ============================================================ */

(function () {
    'use strict';

    /* ------------------------------------------------------------
       1. SCROLL-TRIGGERED REVEAL (IntersectionObserver)
       ------------------------------------------------------------ */
    var revealEls = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window && revealEls.length) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        /* Reset once it leaves the viewport so the motion replays on return. */
                        entry.target.classList.remove('in-view');
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
        );

        revealEls.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add('in-view');
        });
    }

    /* ------------------------------------------------------------
       2. SKILL BAR FILL ANIMATION
       ------------------------------------------------------------ */
    var skillBars = document.querySelectorAll('.skill-bar-fill');

    if ('IntersectionObserver' in window && skillBars.length) {
        var skillObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var width = entry.target.getAttribute('data-width') || 0;
                        entry.target.style.width = width + '%';
                        skillObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        skillBars.forEach(function (bar) {
            skillObserver.observe(bar);
        });
    }

    /* ------------------------------------------------------------
       3. HEADER STATE + SCROLL PROGRESS BAR + HERO PARALLAX
       ------------------------------------------------------------ */
    var header = document.getElementById('header');
    var progressBar = document.getElementById('scrollProgress');
    var root = document.documentElement;
    var heroHeight = window.innerHeight;

    var ticking = false;

    function updateOnScroll() {
        var scrollY = window.scrollY || window.pageYOffset;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;

        /* Sticky header state */
        if (header) {
            header.classList.toggle('scrolled', scrollY > 40);
        }

        /* Progress bar */
        if (progressBar && docHeight > 0) {
            var progressPct = (scrollY / docHeight) * 100;
            progressBar.style.width = progressPct + '%';
        }

        /* Hero parallax — exposed as CSS custom properties */
        var heroProgress = Math.min(scrollY / heroHeight, 1);
        root.style.setProperty('--scroll-y', scrollY + 'px');
        root.style.setProperty('--scroll-progress', heroProgress.toFixed(3));

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', function () {
        heroHeight = window.innerHeight;
    });

    /* Run once on load in case the page is refreshed mid-scroll */
    updateOnScroll();

    /* ------------------------------------------------------------
       4. ACTIVE NAV LINK ON SCROLL
       ------------------------------------------------------------ */
    var sections = document.querySelectorAll('main section[id], header + main section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    if ('IntersectionObserver' in window && sections.length) {
        var navObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var id = entry.target.getAttribute('id');
                        navLinks.forEach(function (link) {
                            link.classList.toggle('active', link.getAttribute('data-nav') === id);
                        });
                    }
                });
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
        );

        sections.forEach(function (section) {
            navObserver.observe(section);
        });
    }
})();
/* ===============================
      HERO PARALLAX
================================ */

const hero = document.querySelector(".hero");
const heroBg = document.querySelector(".hero-bg-image img");

window.addEventListener("scroll",()=>{

    const scrolled = window.scrollY;

    if(heroBg){

        heroBg.style.transform =
        `translateY(${scrolled*0.35}px) scale(1.08)`;

        heroBg.style.opacity =
        1-(scrolled/650);

    }

});
