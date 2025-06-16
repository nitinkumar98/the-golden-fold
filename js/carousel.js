document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    let currentIndex = 0;
    const itemCount = carouselItems.length;
    let autoSlideInterval;
    const slideDuration = 6000; // 6 seconds
    
    function updateCarousel() {
        // Update slide position
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active class for items
        carouselItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    }
    
    // Initialize first slide
    carouselItems[0].classList.add('active');
    indicators[0].classList.add('active');
    
    // Navigation buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    // Click on indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoSlide();
        });
    });
    
    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, slideDuration);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        }
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlideInterval);
    }, {passive: true});
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }
    
    // Start auto sliding
    startAutoSlide();
});