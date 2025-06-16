document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const searchIconMobile = document.querySelector('.search-icon-mobile');
    const searchContainer = document.querySelector('.search-container');
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        searchContainer.classList.remove('active');
    });
    
    searchIconMobile.addEventListener('click', function(e) {
        e.stopPropagation();
        searchContainer.classList.toggle('active');
        navLinks.classList.remove('active');
    });
    
    // Dropdown menu for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close menus when clicking outside
    document.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            searchContainer.classList.remove('active');
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Prevent closing when clicking inside menus
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    searchContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.startsWith('#!')) return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Mobile search toggle
        const searchIconMobile = document.querySelector('.search-icon-mobile');
        const searchContainer = document.querySelector('.search-container');
        const searchInput = searchContainer.querySelector('input');
        
        searchIconMobile.addEventListener('click', function() {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container') && !e.target.closest('.search-icon-mobile')) {
                searchContainer.classList.remove('active');
            }
        });
        
        // Prevent closing when clicking inside search
        searchContainer.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});