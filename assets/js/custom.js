console.log('custom.js loaded!');

function handleFormSubmit(event) {
    console.log('Form Submitted to handler!');
    event.preventDefault(); // Prevent default form submission

    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    const nameInput = document.getElementById('name');
    const name = nameInput.value;
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    
    // console.log('Form data:', { name, email, message });
    
    // Basic validation
    if (name.length > 100) {
        alert('Name is too long.');
        return;
    }
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }
    if (email.length > 254) {
        alert('Email address is too long.');
        return;
    }
    if (!message) {
        alert('Please enter a message.');
        return;
    }
    if (message.length > 1000) {
        alert('Message is too long.');
        return;
    }
    
    console.log('Validation passed, sending to Formspree...');
    
    // Formspree submission
    const formUrl = 'https://formspree.io/f/xyzdzpjl';
    
    // Use FormData for better Formspree compatibility
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    fetch(formUrl, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (response.ok) {
            alert('Thank you! Your message has been sent.');
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
            console.log('Form cleared successfully');
        } else {
            console.error('Response not ok:', response);
            alert('Sorry! There was a problem. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('An error occurred. Please try again.');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('get_in_touch_form');
    if (form) {
        form.onsubmit = handleFormSubmit;
        console.log('Form handler attached successfully');
    } else {
        console.error('Form not found!');
    }
});