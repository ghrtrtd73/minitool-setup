/**
 * SoftsMac Landing Page JavaScript
 * Handles countdown timer, animations, and page redirects
 */

// ===== Utility Functions =====

/**
 * Safely query DOM elements
 * @param {string} selector - CSS selector
 * @returns {Element|null} - Found element or null
 */
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.error(`Error selecting element: ${selector}`, error);
        return null;
    }
}

/**
 * Add event listener with error handling
 * @param {Element} element - DOM element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 */
function safeAddEventListener(element, event, handler) {
    if (element && typeof handler === 'function') {
        element.addEventListener(event, handler);
    }
}

// ===== Page Detection =====

/**
 * Detect current page and initialize appropriate functionality
 */
function initializePage() {
    const isDownloadPage = document.body.classList.contains('download-page');
    
    if (isDownloadPage) {
        initializeDownloadPage();
    } else {
        initializeIndexPage();
    }
}

// ===== Index Page Functionality =====

/**
 * Initialize index page features
 */
function initializeIndexPage() {
    // Add smooth scrolling and enhanced button interactions
    const downloadBtn = safeQuerySelector('.download-btn');
    
    if (downloadBtn) {
        // Add click analytics or tracking here if needed
        safeAddEventListener(downloadBtn, 'click', function(e) {
            // Optional: Add loading state or transition effect
            console.log('Download button clicked');
        });
        
        // Add keyboard navigation support
        safeAddEventListener(downloadBtn, 'keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                downloadBtn.click();
            }
        });
    }
    
    // Initialize fade-in animations if CSS animations are disabled
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

// ===== Download Page Functionality =====

/**
 * Initialize download page countdown
 */
function initializeDownloadPage() {
    const countdownDisplay = safeQuerySelector('#countdown-display');
    const progressBar = safeQuerySelector('#progress-bar');
    
    if (!countdownDisplay) {
        console.error('Countdown display element not found');
        // Fallback: redirect immediately
        redirectToSoftsMac();
        return;
    }
    
    startCountdown(countdownDisplay, progressBar);
}

/**
 * Start the countdown timer
 * @param {Element} displayElement - Element to show countdown
 * @param {Element} progressElement - Progress bar element
 */
function startCountdown(displayElement, progressElement) {
    let currentCount = 3;
    const totalTime = 3000; // 3 seconds total
    const intervalTime = 1000; // 1 second intervals
    
    // Update progress bar
    if (progressElement) {
        progressElement.style.width = '0%';
        // Animate progress bar to 100% over 3 seconds
        requestAnimationFrame(() => {
            progressElement.style.width = '100%';
        });
    }
    
    // Set initial display
    updateCountdownDisplay(displayElement, currentCount);
    
    // Start countdown interval
    const countdownInterval = setInterval(() => {
        currentCount--;
        
        if (currentCount > 0) {
            updateCountdownDisplay(displayElement, currentCount);
        } else {
            clearInterval(countdownInterval);
            updateCountdownDisplay(displayElement, '0');
            
            // Small delay before redirect for better UX
            setTimeout(() => {
                redirectToSoftsMac();
            }, 500);
        }
    }, intervalTime);
    
    // Safety fallback - redirect after 4 seconds regardless
    setTimeout(() => {
        clearInterval(countdownInterval);
        redirectToSoftsMac();
    }, totalTime + 1000);
}

/**
 * Update countdown display with animation
 * @param {Element} element - Display element
 * @param {string|number} value - Value to display
 */
function updateCountdownDisplay(element, value) {
    if (!element) return;
    
    // Trigger animation by temporarily removing and re-adding animation class
    element.style.animation = 'none';
    element.textContent = value.toString();
    
    // Force reflow to restart animation
    element.offsetHeight;
    element.style.animation = 'countdownPulse 0.5s ease-in-out';
}

/**
 * Redirect to SoftsMac website
 */
function redirectToSoftsMac() {
    const targetUrl = 'https://softsmac.net/';
    
    try {
        // Use window.location.href for compatibility
        window.location.href = targetUrl;
    } catch (error) {
        console.error('Redirect failed:', error);
        
        // Fallback: show manual link
        showManualRedirectLink(targetUrl);
    }
}

/**
 * Show manual redirect link if automatic redirect fails
 * @param {string} url - Target URL
 */
function showManualRedirectLink(url) {
    const container = safeQuerySelector('.countdown-wrapper');
    if (container) {
        container.innerHTML = `
            <div class="manual-redirect">
                <h2 style="margin-bottom: 1rem; font-size: 1.5rem;">Redirecting...</h2>
                <p style="margin-bottom: 1.5rem;">If you are not automatically redirected, please click the link below:</p>
                <a href="${url}" 
                   style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #ff6b6b, #ffa726); color: white; text-decoration: none; border-radius: 12px; font-weight: 600;"
                   target="_blank" 
                   rel="noopener noreferrer">
                   Continue to SoftsMac →
                </a>
            </div>
        `;
    }
}

// ===== Error Handling =====

/**
 * Global error handler
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // If we're on the download page and there's an error, still try to redirect
    if (document.body.classList.contains('download-page')) {
        setTimeout(() => {
            redirectToSoftsMac();
        }, 2000);
    }
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== Page Load Events =====

/**
 * Initialize when DOM is fully loaded
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    // DOM is already loaded
    initializePage();
}

/**
 * Additional initialization when page is fully loaded (including images, etc.)
 */
window.addEventListener('load', function() {
    // Mark page as fully loaded for any additional features
    document.body.classList.add('page-loaded');
    
    // Optional: Remove loading states, enable additional features
    console.log('Page fully loaded');
});

// ===== Performance Optimization =====

/**
 * Preload critical resources for better performance
 */
function preloadCriticalResources() {
    // Preload SoftsMac domain for faster redirect
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = 'https://softsmac.net';
    document.head.appendChild(link);
}

// Initialize preloading
preloadCriticalResources();

// ===== Export for testing (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializePage,
        startCountdown,
        redirectToSoftsMac
    };
}
