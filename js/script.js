// Main JavaScript file
import { initializeNavigation } from './navigation.js';
import { initializeSlider } from './slider.js';
import { movies } from './movieData.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeSlider();
    displayFeaturedMovies();
    initializeSeatSelection();
});

function displayFeaturedMovies() {
    const featuredMoviesGrid = document.getElementById('featured-movies-grid');
    if (!featuredMoviesGrid) return;

    const featuredMovies = movies.filter(movie => movie.featured);
    
    featuredMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        featuredMoviesGrid.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>${movie.genre}</p>
            <p>${movie.description}</p>
            <p class="price">$${movie.price}</p>
            <select class="showtime-select">
                ${movie.showTimes.map(time => `<option value="${time}">${time}</option>`).join('')}
            </select>
            <button class="btn-primary book-ticket" data-movie-id="${movie.id}">Book Tickets</button>
        </div>
    `;
    
    const bookButton = card.querySelector('.book-ticket');
    bookButton.addEventListener('click', () => openSeatSelection(movie));
    
    return card;
}

function openSeatSelection(movie) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Select Seats for ${movie.title}</h2>
            <p>Show Time: <span class="selected-time"></span></p>
            <div class="seat-grid">
                ${generateSeats()}
            </div>
            <p>Selected Seats: <span class="selected-seats">0</span></p>
            <p>Total: $<span class="total-price">0</span></p>
            <button class="btn-primary proceed-payment">Proceed to Payment</button>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    const showtimeSelect = document.querySelector('.showtime-select');
    const selectedTime = modal.querySelector('.selected-time');
    selectedTime.textContent = showtimeSelect.value;

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.remove();
    };

    initializeSeatSelection(modal, movie);
}

function generateSeats() {
    let seats = '';
    for (let i = 0; i < 32; i++) {
        const isOccupied = Math.random() < 0.3;
        seats += `<div class="seat ${isOccupied ? 'occupied' : ''}" data-seat="${i + 1}">${i + 1}</div>`;
    }
    return seats;
}

function initializeSeatSelection(modal, movie) {
    const seats = modal.querySelectorAll('.seat:not(.occupied)');
    const selectedSeatsCount = modal.querySelector('.selected-seats');
    const totalPrice = modal.querySelector('.total-price');
    const proceedButton = modal.querySelector('.proceed-payment');

    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            seat.classList.toggle('selected');
            const selectedCount = modal.querySelectorAll('.seat.selected').length;
            selectedSeatsCount.textContent = selectedCount;
            totalPrice.textContent = (selectedCount * movie.price).toFixed(2);
        });
    });

    proceedButton.addEventListener('click', () => {
        const selectedCount = modal.querySelectorAll('.seat.selected').length;
        if (selectedCount === 0) {
            alert('Please select at least one seat.');
            return;
        }
        // Simulate payment processing
        alert('Proceeding to payment gateway...');
        modal.remove();
    });
}