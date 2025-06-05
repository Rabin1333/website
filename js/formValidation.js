document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            showSuccessMessage();
            form.reset();
        }
    });
});

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    // Reset previous error messages
    clearErrors();

    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

function showError(element, message) {
    const formGroup = element.parentElement;
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    formGroup.appendChild(error);
    element.classList.add('error');
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('.error');
    
    errors.forEach(error => error.remove());
    inputs.forEach(input => input.classList.remove('error'));
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
    
    const form = document.getElementById('contact-form');
    form.insertAdjacentElement('beforebegin', successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}