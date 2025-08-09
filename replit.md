# Overview

SoftsMac is a modern, lightweight landing page project designed for software downloads. It consists of a welcome page that showcases key features (fast downloads, security, latest versions) and a download redirect page with an animated countdown timer. The project uses pure HTML, CSS, and vanilla JavaScript to create a premium user experience with animated gradients, smooth transitions, and responsive design. The system is optimized for high conversion rates and fast loading times without relying on heavy frameworks.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The project follows a simple multi-page architecture with two main pages:

**Page Structure:**
- `index.html` - Main landing page with welcome message, feature highlights, and call-to-action
- `download.html` - Countdown redirect page that automatically forwards users to the main SoftsMac website

**Technology Stack:**
- Pure HTML5 with semantic structure
- Vanilla CSS3 with CSS variables and animations
- Vanilla JavaScript (no frameworks or libraries)
- Google Fonts (Poppins) for typography

**Design Patterns:**
- **Component-based CSS**: Uses CSS variables for consistent theming and easy customization
- **Progressive Enhancement**: Core functionality works without JavaScript, with JS adding enhanced animations
- **Mobile-first Responsive Design**: Uses clamp() functions and flexible units for optimal display across devices

## Animation and User Experience
**Gradient Background System:**
- Animated CSS gradients that subtly shift colors over time (15-second duration)
- Consistent across all pages for visual continuity
- Uses CSS custom properties for easy theme modifications

**Animation Strategy:**
- Fade-in animations on page load for premium feel
- Staggered animation delays for visual hierarchy
- Smooth scale animations for countdown numbers
- Hardware-accelerated transforms for optimal performance

## JavaScript Architecture
**Modular Function Design:**
- Utility functions for safe DOM manipulation
- Page detection system to initialize appropriate functionality
- Error handling for robust operation
- Separation of concerns between index and download page logic

**Countdown System:**
- 3-second countdown timer with visual progress indicator
- Scale-up animation effects for each countdown number
- Automatic redirect to external domain (softsmac.net)
- Fallback mechanisms for edge cases

## Performance Optimization
**Loading Strategy:**
- Minimal HTTP requests (4 files total)
- Preloading critical resources
- DNS prefetching for redirect destination
- Optimized font loading with display=swap

**Code Organization:**
- CSS variables for maintainability
- Commented code structure for easy modification
- Responsive units (clamp, vw, vh) to minimize media queries
- Semantic HTML5 for accessibility and SEO

# External Dependencies

## Third-party Services
- **Google Fonts API**: Provides Poppins font family with multiple weights (300, 400, 500, 600, 700)
- **External Redirect**: Automatically redirects to `https://softsmac.net/` after countdown completion

## Font Loading
- Uses Google Fonts with preconnect optimization for faster loading
- Font display strategy set to 'swap' for better performance
- Fallback font stack includes system fonts for reliability

## DNS and Performance
- DNS prefetching enabled for the redirect destination domain
- Preloading of critical JavaScript resources
- No external CSS frameworks or JavaScript libraries required

## Hosting Compatibility
- Designed for GitHub Pages deployment
- Static files only (no server-side requirements)
- Cross-browser compatible with modern browsers
- Progressive enhancement ensures functionality across different environments