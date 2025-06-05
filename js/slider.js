export function initializeSlider() {
    const heroBanner = document.querySelector('.hero-banner');
    if (!heroBanner) return;

    const images = [
        'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
        'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg',
        'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg'
    ];

    let currentImageIndex = 0;

    function updateBackground() {
        heroBanner.style.backgroundImage = `url(${images[currentImageIndex]})`;
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }

    // Initial background
    updateBackground();

    // Change background every 5 seconds
    setInterval(updateBackground, 5000);
}