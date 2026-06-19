// ==UserScript==
// @name         SOS POS - Ticket PIN One-Click Copy v1
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  Adds one-click copy and pin enlarger to Ticket Numbers (e.g., A0935)
// @author       Gemini
// @match        https://app.sospos.com.au/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Selector for the Ticket PIN based on your DevTools image
    const TICKET_SELECTOR = 'div.px-2.text-sm.font-semibold';

    function setupTicketActions() {
        const tickets = document.querySelectorAll(TICKET_SELECTOR);

        tickets.forEach(ticket => {
            if (!ticket.hasAttribute('data-copy-enabled')) {
                ticket.setAttribute('data-copy-enabled', 'true');
                ticket.classList.add('ticket-pin-helper');
                ticket.title = "Click to Copy PIN";

                // Click to Copy Logic
                ticket.addEventListener('click', (e) => {
                    // Stop the click from opening the ticket details if you just want to copy
                    e.preventDefault();
                    e.stopPropagation();

                    const pinValue = ticket.innerText.trim();
                    navigator.clipboard.writeText(pinValue).then(() => {
                        // Visual Feedback
                        const originalBg = ticket.style.backgroundColor;
                        ticket.style.backgroundColor = '#4ade80'; // Success Green
                        ticket.innerText = "COPIED!";

                        setTimeout(() => {
                            ticket.style.backgroundColor = originalBg;
                            ticket.innerText = pinValue;
                        }, 600);
                    });
                });
            }
        });
    }

    // Styling for the Enlarger and Hover effects
    const style = document.createElement('style');
    style.innerHTML = `
        .ticket-pin-helper {
            cursor: copy !important;
            transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: inline-flex;
            align-items: center;
            border-radius: 4px;
            border: 1px solid transparent;
        }

        /* The "Pin Enlarger" Effect on Hover */
        .ticket-pin-helper:hover {
            transform: scale(2.2);
            background-color: #0d9488 !important;
            color: white !important;
            z-index: 9999;
            position: relative;
            box-shadow: 0 4px 12px rgba(13,148,136,0.35);
            border: 1px solid #14b8a6;
        }
    `;
    document.head.appendChild(style);

    // Watch for new tickets loading in the list
    const observer = new MutationObserver(setupTicketActions);
    observer.observe(document.body, { childList: true, subtree: true });

    setupTicketActions();
})();