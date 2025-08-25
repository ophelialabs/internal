// static/scripts/site.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
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

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Sanitize HTML (basic)
    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    // Highlight search terms
    function highlightTerm(text, term) {
        if (!term) return text;
        const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return text.replace(new RegExp(`(${safeTerm})`, 'gi'), '<mark>$1</mark>');
    }

    // Load header
    fetch('header.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const header = document.getElementById('header-placeholder');
            if (header) header.innerHTML = data;

            // Attach search bar event listener AFTER header loads
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                // Accessibility
                searchInput.setAttribute('aria-label', 'Site search');
                searchInput.setAttribute('autocomplete', 'off');

                // Mobile-friendly styling (optional, can also be done in CSS)
                searchInput.classList.add('w-100', 'mb-2');

                // Loading indicator
                let loadingIndicator = null;

                // Instant search suggestions
                const suggestionBox = document.createElement('div');
                suggestionBox.className = 'list-group position-absolute w-100 shadow';
                suggestionBox.style.zIndex = 1000;
                suggestionBox.style.display = 'none';
                searchInput.parentNode.appendChild(suggestionBox);

                function showSuggestions(results, query) {
                    suggestionBox.innerHTML = '';
                    if (results.length === 0) {
                        suggestionBox.style.display = 'none';
                        return;
                    }
                    results.slice(0, 5).forEach(r => {
                        const item = document.createElement('button');
                        item.type = 'button';
                        item.className = 'list-group-item list-group-item-action';
                        item.innerHTML = highlightTerm(sanitizeHTML(r.title), query);
                        item.onclick = () => window.location.href = r.url;
                        suggestionBox.appendChild(item);
                    });
                    suggestionBox.style.display = 'block';
                }

                function hideSuggestions() {
                    suggestionBox.style.display = 'none';
                }

                // Debounced instant search
                searchInput.addEventListener('input', debounce(function(e) {
                    const query = this.value.trim();
                    if (!query) {
                        hideSuggestions();
                        return;
                    }
                    // Show loading indicator
                    if (!loadingIndicator) {
                        loadingIndicator = document.createElement('div');
                        loadingIndicator.className = 'spinner-border spinner-border-sm ms-2';
                        loadingIndicator.setAttribute('role', 'status');
                        loadingIndicator.setAttribute('aria-hidden', 'true');
                        this.parentNode.appendChild(loadingIndicator);
                    }
                    loadingIndicator.style.display = 'inline-block';

                    fetch('/static/content/site-index.json')
                        .then(res => res.json())
                        .then(pages => {
                            const results = pages.filter(page =>
                                page.title.toLowerCase().includes(query.toLowerCase()) ||
                                page.content.toLowerCase().includes(query.toLowerCase())
                            );
                            showSuggestions(results, query);
                        })
                        .catch(() => hideSuggestions())
                        .finally(() => {
                            if (loadingIndicator) loadingIndicator.style.display = 'none';
                        });
                }, 300));

                // Hide suggestions on blur
                searchInput.addEventListener('blur', () => setTimeout(hideSuggestions, 200));

                // Enter key triggers redirect to search.html
                searchInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        const query = encodeURIComponent(this.value.trim());
                        if (query) {
                            window.location.href = `/search.html?q=${query}`;
                        }
                    }
                });
            }
        })
        .catch(() => {});

    // Load Pipeline
    fetch('pipeline/tabs.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const header = document.getElementById('pipeline-placeholder');
            if (header) header.innerHTML = data;
        })
        .catch(() => {});

    // Load Tech Stack
    fetch('stack/stack.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const header = document.getElementById('techstack-placeholder');
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
});
// static/scripts/site.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
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

    // Enhanced search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            // Implement advanced search logic here
            console.log('Searching:', e.target.value);
        }, 300));
    }

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Load header
    fetch('header.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const header = document.getElementById('header-placeholder');
            if (header) header.innerHTML = data;
        })
        .catch(() => {});

    // Load Pipeline
    fetch('pipeline/tabs.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const header = document.getElementById('pipeline-placeholder');
            if (header) header.innerHTML = data;
        })
        .catch(() => {});

    // Load Tech Stack
    fetch('stack/stack.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const header = document.getElementById('techstack-placeholder');
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
});
