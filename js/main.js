// Main functionality
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            const products = document.querySelectorAll('.product-title');
            let found = false;
            
            products.forEach(product => {
                const productText = product.textContent.toLowerCase();
                const productCard = product.closest('.product-card');
                
                if (productText.includes(searchTerm)) {
                    productCard.style.display = 'block';
                    found = true;
                    
                    // Scroll to the first matching product
                    if (!found) {
                        productCard.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                } else {
                    productCard.style.display = 'none';
                }
            });
            
            if (!found) {
                alert('No products found matching your search.');
            }
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});