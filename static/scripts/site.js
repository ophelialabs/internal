document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach(el => new bootstrap.Tooltip(el));

    // Load nav
    fetch('main/nav.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const header = document.getElementById('nav-placeholder');
            if (header) header.innerHTML = data;
        })
        .catch(() => {});

    // Load main
    fetch('main/main.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const header = document.getElementById('main-content-placeholder');
            if (header) header.innerHTML = data;
        })
        .catch(() => {});

    // Load footer
    fetch('main/footer.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const footer = document.getElementById('footer-placeholder');
            if (footer) footer.innerHTML = data;
        })
        .catch(() => {});
    ('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach(el => new bootstrap.Tooltip(el));

    // Initialize popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].forEach(el => new bootstrap.Popover(el));

    // Initialize modals
    const modalTriggerList = document.querySelectorAll('[data-bs-toggle="modal"]');
    [...modalTriggerList].forEach(el => new bootstrap.Modal(el));

    // Initialize dropdowns
    const dropdownTriggerList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    [...dropdownTriggerList].forEach(el => new bootstrap.Dropdown(el));

    // Initialize sidebars (offcanvas)
    const sidebarTriggerList = document.querySelectorAll('[data-bs-toggle="offcanvas"]');
    [...sidebarTriggerList].forEach(el => new bootstrap.Offcanvas(el));

    // Initialize carousels
    const carouselTriggerList = document.querySelectorAll('.carousel');
    [...carouselTriggerList].forEach(el => new bootstrap.Carousel(el));

    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Sanitize HTML (basic)
    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    // Load page components
    Promise.all([
        fetch('main/nav.html').then(res => res.ok ? res.text() : Promise.reject(res)),
        fetch('main/welcome.html').then(res => res.ok ? res.text() : Promise.reject(res)),
        fetch('main/footer.html').then(res => res.ok ? res.text() : Promise.reject(res))
    ])
    .then(([navContent, headContent, footerContent]) => {
        // Insert the content
        const navPlaceholder = document.getElementById('nav-placeholder');
        const headPlaceholder = document.getElementById('head-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        if (navPlaceholder) navPlaceholder.innerHTML = navContent;
        if (headPlaceholder) headPlaceholder.innerHTML = headContent;
        if (footerPlaceholder) footerPlaceholder.innerHTML = footerContent;

    // Initialize Bootstrap components
    function initializeBootstrapComponents(container = document) {
        // Initialize all Bootstrap components
        ['tooltip', 'popover', 'dropdown', 'modal', 'offcanvas'].forEach(type => {
            const elements = container.querySelectorAll(`[data-bs-toggle="${type}"]`);
            elements.forEach(el => new bootstrap[type.charAt(0).toUpperCase() + type.slice(1)](el));
        });

        // Initialize carousels
        container.querySelectorAll('.carousel').forEach(el => new bootstrap.Carousel(el));
    }

// Initialize app
    async function initializeApp() {
        try {
            await Promise.all([
                loadContent('main/nav.html', 'nav-placeholder'),
                loadContent('main/main.html', 'main-content-placeholder'),
                loadContent('main/footer.html', 'footer-placeholder')
            ]);

            // Set initial active states
            updateActiveStates(window.location.href);
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    // Start the application
    initializeApp();
});