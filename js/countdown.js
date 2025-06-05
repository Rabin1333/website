function createCountdownWidget(releaseDate, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown-widget';

    const updateCountdown = () => {
        const now = new Date().getTime();
        const release = new Date(releaseDate).getTime();
        const distance = release - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <div class="countdown-value">${days}</div>
                <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-value">${hours}</div>
                <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-value">${minutes}</div>
                <div class="countdown-label">Minutes</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-value">${seconds}</div>
                <div class="countdown-label">Seconds</div>
            </div>
        `;

        if (distance < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = '<div class="countdown-expired">Now Released!</div>';
        }
    };

    container.appendChild(countdownElement);
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}

// Initialize countdowns for upcoming movies
document.addEventListener('DOMContentLoaded', () => {
    const upcomingGrid = document.getElementById('upcoming-grid');
    if (!upcomingGrid) return;

    // Get upcoming movies and create countdown widgets
    const upcomingMovies = movies.filter(movie => new Date(movie.releaseDate) > new Date());
    
    upcomingMovies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'upcoming-card';
        movieElement.innerHTML = `
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.releaseDate}</p>
            <div id="countdown-${movie.id}"></div>
        `;
        upcomingGrid.appendChild(movieElement);
        
        createCountdownWidget(movie.releaseDate, `countdown-${movie.id}`);
    });
});