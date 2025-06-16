// Products functionality
document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const mensProducts = [
        {
            id: 1,
            badge: "New",
            image: "https://m.media-amazon.com/images/I/61HS4sTDnPL._UY1100_.jpg",
            brand: "Nike",
            title: "Men's Dry Fit Training T-Shirts",
            currentPrice: "$29.99",
            originalPrice: "$39.99",
            discount: "25% OFF",
            rating: 4.5,
            reviews: 124
        },
        {
            id: 2,
            badge: "Bestseller",
            image: "https://m.media-amazon.com/images/I/71ts9CewHqL._AC_UY1100_.jpg",
            brand: "Tommy Hilfiger",
            title: "Men's Regular Fit Formal Shirts",
            currentPrice: "$49.99",
            originalPrice: "$59.99",
            discount: "17% OFF",
            rating: 4,
            reviews: 89
        },
        {
            id: 3,
            image: "https://m.media-amazon.com/images/I/91x4i8nS1nL._AC_UY1100_.jpg",
            brand: "Levi's",
            title: "Men's 511 Slim Fit Jeans",
            currentPrice: "$59.99",
            originalPrice: "$79.99",
            discount: "25% OFF",
            rating: 5,
            reviews: 215
        },
        {
            id: 4,
            badge: "Limited",
            image: "https://m.media-amazon.com/images/I/61fH5qTCFvL._AC_UY1100_.jpg",
            brand: "Adidas",
            title: "Men's Trefoil Hoodies",
            currentPrice: "$64.99",
            originalPrice: "$79.99",
            discount: "19% OFF",
            rating: 4.5,
            reviews: 142
        }
    ];

    const womensProducts = [
        {
            id: 5,
            badge: "New",
            image: "https://m.media-amazon.com/images/I/81POvlTo2nL._AC_UY1100_.jpg",
            brand: "Zara",
            title: "Women's V-Neck Blouse",
            currentPrice: "$34.99",
            originalPrice: "$49.99",
            discount: "30% OFF",
            rating: 4,
            reviews: 76
        },
        {
            id: 6,
            badge: "Trending",
            image: "https://m.media-amazon.com/images/I/71ZARINFaeL._AC_UY1100_.jpg",
            brand: "H&M",
            title: "Women's Summer Floral Dress",
            currentPrice: "$45.99",
            originalPrice: "$59.99",
            discount: "23% OFF",
            rating: 4.5,
            reviews: 112
        },
        {
            id: 7,
            image: "https://m.media-amazon.com/images/I/715l5UV0eHL._AC_UY1100_.jpg",
            brand: "Lee",
            title: "Women's Skinny Fit Jeans",
            currentPrice: "$54.99",
            originalPrice: "$69.99",
            discount: "21% OFF",
            rating: 4,
            reviews: 93
        },
        {
            id: 8,
            badge: "Sale",
            image: "https://m.media-amazon.com/images/I/61PY6RH1k7L._AC_UY1100_.jpg",
            brand: "The North Face",
            title: "Women's Lightweight Jackets",
            currentPrice: "$89.99",
            originalPrice: "$119.99",
            discount: "25% OFF",
            rating: 5,
            reviews: 167
        },
        {
            id: 9,
            badge: "Most Selling",
            image: "https://m.media-amazon.com/images/I/71Tu5OHZPgL._SY879_.jpg",
            brand: "Leriya Fashion",
            title: "LERIYA FASHION Sleeveless Regular Fit Tops",
            currentPrice: "$90.900",
            originalPrice: "$100.00",
            discount: "10% OFF",
            rating: 4.9,
            reviews: 107
        },
        {
            id: 9,
            badge: "Top Rated",
            image: "https://m.media-amazon.com/images/I/51uq-nJsggL._SX679_.jpg",
            brand: "Alyne Store",
            title: "ALYNE Girl's/Women's Classic Stretchy All Time Classy Flared Skater Skirts",
            currentPrice: "$100.900",
            originalPrice: "$112.00",
            discount: "2% OFF",
            rating: 5,
            reviews: 1000
        }
    ];

    // Render products
    function renderProducts(products, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        products.forEach(product => {
            const ratingStars = Array.from({ length: 5 }, (_, i) => {
                if (i < Math.floor(product.rating)) {
                    return '<i class="fas fa-star"></i>';
                } else if (i === Math.floor(product.rating) && product.rating % 1 >= 0.5) {
                    return '<i class="fas fa-star-half-alt"></i>';
                } else {
                    return '<i class="far fa-star"></i>';
                }
            }).join('');

            const productHTML = `
                <div class="product-card" data-id="${product.id}">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="product-actions">
                            <button class="action-btn"><i class="far fa-heart"></i></button>
                            <button class="action-btn"><i class="fas fa-shopping-cart"></i></button>
                            <button class="action-btn"><i class="fas fa-eye"></i></button>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-brand">${product.brand}</div>
                        <div class="product-title">${product.title}</div>
                        <div class="product-price">
                            <span class="current-price">${product.currentPrice}</span>
                            <span class="original-price">${product.originalPrice}</span>
                            <span class="discount">${product.discount}</span>
                        </div>
                        <div class="product-rating">
                            <div class="rating-stars">
                                ${ratingStars}
                            </div>
                            <span class="rating-count">(${product.reviews})</span>
                        </div>
                    </div>
                </div>
            `;

            container.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    // Initial render
    renderProducts(mensProducts, 'mens-products');
    renderProducts(womensProducts, 'womens-products');

    // Category tabs functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const container = tab.closest('.categories-section');
            
            // Remove active class from all tabs in this container
            container.querySelectorAll('.category-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Filter products (simplified for demo - would normally fetch from API)
            const category = tab.textContent.trim().toLowerCase();
            const productsGrid = container.querySelector('.products-grid');
            const productCards = productsGrid.querySelectorAll('.product-card');
            
            if (category === 'all' || category === 'dresses') {
                productCards.forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                productCards.forEach(card => {
                    const title = card.querySelector('.product-title').textContent.toLowerCase();
                    if (title.includes(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });

    // Product click redirect to coming soon page
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't redirect if clicking on action buttons
            if (!e.target.closest('.product-actions') && !e.target.closest('.product-badge')) {
                const productId = card.getAttribute('data-id');
                window.location.href = `product-description.html?id=${productId}`;
            }
        });
    });
});