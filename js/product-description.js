// Product database (in a real app, this would come from an API)
const products = {
    1: {
        id: 1,
        badge: "New",
        image: "https://m.media-amazon.com/images/I/61HS4sTDnPL._UY1100_.jpg",
        brand: "Nike",
        title: "Men's Dry Fit Training T-Shirts",
        currentPrice: "$29.99",
        originalPrice: "$39.99",
        discount: "25% OFF",
        rating: 4.5,
        reviews: 124,
        description: "The Nike Men's Dry Fit Training T-Shirt is designed for maximum comfort during workouts. Made with breathable Dri-FIT technology that helps keep you dry and comfortable. The lightweight fabric moves with you for a full range of motion, while the relaxed fit provides a comfortable feel. Perfect for training sessions, running, or casual wear.",
        features: [
            "100% Polyester",
            "Machine wash",
            "Dri-FIT technology wicks sweat to keep you dry and comfortable",
            "Standard fit for a relaxed, easy feel",
            "Ribbed crew neck"
        ],
        reviewsData: [
            {
                author: "John D.",
                rating: 5,
                date: "June 15, 2025",
                text: "This shirt is incredibly comfortable and keeps me dry during intense workouts. The fit is perfect and the material feels high quality. Highly recommend!"
            },
            {
                author: "Michael T.",
                rating: 4,
                date: "May 28, 2025",
                text: "Great shirt for the gym. The material is lightweight and breathable. Only reason I didn't give 5 stars is that it runs slightly large."
            }
        ]
    },
    2: {
        id: 2,
        badge: "Bestseller",
        image: "https://m.media-amazon.com/images/I/71ts9CewHqL._AC_UY1100_.jpg",
        brand: "Tommy Hilfiger",
        title: "Men's Regular Fit Formal Shirts",
        currentPrice: "$49.99",
        originalPrice: "$59.99",
        discount: "17% OFF",
        rating: 4,
        reviews: 89,
        description: "The Adidas Women's Running T-Shirt features Climalite technology that wicks sweat to keep you dry and comfortable. The regular fit provides freedom of movement while the short sleeves keep you cool during runs.",
        features: [
            "100% Polyester",
            "Machine wash",
            "Climalite technology",
            "Regular fit",
            "Short sleeves"
        ],
        reviewsData: [
            {
                author: "Sarah K.",
                rating: 5,
                date: "April 10, 2025",
                text: "Absolutely love this shirt! It's my go-to for running. Washes well and maintains its shape after multiple washes."
            }
        ]
    }
};

// Function to render stars based on rating
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    
    return starsHTML;
}

// Function to generate the product page HTML
function generateProductHTML(product) {
    return `
        <div class="product-gallery">
            <img src="${product.image}" alt="${product.title}" class="main-image" id="mainImage">
            <div class="thumbnail-container">
                <img src="${product.image}" alt="Thumbnail 1" class="thumbnail active" onclick="changeImage(this)">
                
            </div>
        </div>
        
        <div class="product-info">
            <span class="brand">${product.brand}</span>
            <h1 class="product-title">${product.title}</h1>
            
            <div class="price-container">
                <span class="current-price" id="currentPrice">${product.currentPrice}</span>
                ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                ${product.discount ? `<span class="discount">${product.discount}</span>` : ''}
            </div>
            
            <div class="rating-container">
                <div class="stars">
                    ${renderStars(product.rating)}
                </div>
                <span class="rating-count">${product.reviews} reviews</span>
            </div>
            
            <div class="size-selection">
                <div class="size-title">Select Size:</div>
                <div class="size-options">
                    <div class="size-option" onclick="selectSize(this)">S</div>
                    <div class="size-option selected" onclick="selectSize(this)">M</div>
                    <div class="size-option" onclick="selectSize(this)">L</div>
                    <div class="size-option" onclick="selectSize(this)">XL</div>
                    <div class="size-option" onclick="selectSize(this)">XXL</div>
                </div>
            </div>
            
            <div class="quantity-container">
                <div class="quantity-title">Quantity:</div>
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="updateQuantity(-1)">-</button>
                    <input type="number" class="quantity-input" id="quantity" value="1" min="1" readonly>
                    <button class="quantity-btn" onclick="updateQuantity(1)">+</button>
                </div>
            </div>
            
            <div class="action-buttons">
                <button class="btn btn-primary">Add to Cart</button>
                <button class="btn btn-secondary">Add to Wishlist</button>
            </div>
            
            <div class="product-description">
                <h3 class="description-title">Product Description</h3>
                <p class="description-text">${product.description}</p>
                <ul class="product-features" style="margin-top: 1rem; padding-left: 1.5rem; color: var(--dark-gray);">
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="reviews-section">
                <h3 class="reviews-title">Customer Reviews</h3>
                <div id="reviewsContainer">
                    ${product.reviewsData.map(review => `
                        <div class="review-card">
                            <div class="review-header">
                                <span class="review-author">${review.author}</span>
                                <span class="review-rating">
                                    ${renderStars(review.rating)}
                                </span>
                            </div>
                            <div class="review-date">Reviewed on ${review.date}</div>
                            <p class="review-text">${review.text}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Load product data based on URL parameter
let basePrice;
function loadProductData() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Simulate API delay
    setTimeout(() => {
        const product = products[productId];
        const productContainer = document.getElementById('productContainer');
        
        if (product) {
            // Update page title
            document.title = `${product.title} | THE GOLDEN FOLD`;
            
            // Render product
            productContainer.innerHTML = generateProductHTML(product);
            basePrice = parseFloat(product.currentPrice.replace('$', ''));
        } else {
            // Product not found
            productContainer.innerHTML = `
                <div class="error-message">
                    <h2>Product Not Found</h2>
                    <p>We couldn't find the product you're looking for.</p>
                    <a href="/" style="color: var(--primary);">Return to homepage</a>
                </div>
            `;
        }
    }, 500); // Simulate network delay
}

// Image gallery functions
function changeImage(element) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = element.src;
    
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
}

// Size selection function
function selectSize(element) {
    document.querySelectorAll('.size-option').forEach(option => {
        option.classList.remove('selected');
    });
    element.classList.add('selected');
}

// Quantity update function
function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let newValue = parseInt(quantityInput.value) + change;
    
    if (newValue < 1) newValue = 1;
    
    quantityInput.value = newValue;
    updatePrice(newValue);
}

// Price update function
function updatePrice(quantity) {
    const currentPriceElement = document.getElementById('currentPrice');
    const totalPrice = (basePrice * quantity).toFixed(2);
    currentPriceElement.textContent = `$${totalPrice}`;
}

// Initialize the page when loaded
document.addEventListener('DOMContentLoaded', loadProductData);