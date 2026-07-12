/* ============================================================
   SHARIER SAKIB — PORTFOLIO
   typing.js — Hero code-style typing animation
   ============================================================ */

(function () {
    'use strict';

    /* Roles cycled through the hero "code line" */
    var ROLES = [
        'Graphics Designer',
        'Video Editor',
        'Frontend Developer',
        'AI Enthusiast'
    ];

    var TYPE_SPEED = 90;      // ms per character while typing
    var DELETE_SPEED = 45;    // ms per character while deleting
    var HOLD_TIME = 1600;     // ms to pause once a word is fully typed
    var GAP_TIME = 400;       // ms to pause once a word is fully deleted

    var targetEl = document.getElementById('typingText');
    if (!targetEl) return;

    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function tick() {
        var currentRole = ROLES[roleIndex];

        if (!isDeleting) {
            charIndex++;
            targetEl.textContent = '"' + currentRole.slice(0, charIndex) + '"';

            if (charIndex === currentRole.length) {
                isDeleting = true;
                window.setTimeout(tick, HOLD_TIME);
                return;
            }
            window.setTimeout(tick, TYPE_SPEED);
        } else {
            charIndex--;
            targetEl.textContent = '"' + currentRole.slice(0, charIndex) + '"';

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % ROLES.length;
                window.setTimeout(tick, GAP_TIME);
                return;
            }
            window.setTimeout(tick, DELETE_SPEED);
        }
    }

    /* Kick off after the loader finishes so it feels intentional */
    window.addEventListener('load', function () {
        window.setTimeout(tick, 900);
    });
})();
