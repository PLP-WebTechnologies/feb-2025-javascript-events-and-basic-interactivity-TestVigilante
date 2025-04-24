// script.js

// Menu Tabs Functionality
const menuTabs = document.querySelectorAll('.menu-tabs .tab-button');
const menuContents = document.querySelectorAll('.menu-section .tab-content');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        menuTabs.forEach(btn => btn.classList.remove('active'));
        menuContents.forEach(content => content.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.tab);
        if (target) {
            target.classList.add('active');
        }
    });
});

// Image Gallery Functionality
const galleryThumbnails = document.querySelectorAll('.gallery-section .gallery-thumbnail');
const galleryMainImage = document.getElementById('galleryMainImage');
const prevGalleryButton = document.getElementById('prevGallery');
const nextGalleryButton = document.getElementById('nextGallery');
const galleryImages = Array.from(galleryThumbnails).map(img => img.src.replace('-thumbnail', '')); // Adjust URL as needed
let currentGalleryIndex = 0;

function updateGalleryImage(index) {
    galleryMainImage.src = galleryImages[index];
    galleryThumbnails.forEach(thumb => thumb.classList.remove('active'));
    galleryThumbnails[index].classList.add('active');
}

galleryThumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentGalleryIndex = index;
        updateGalleryImage(currentGalleryIndex);
    });
});

prevGalleryButton.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImage(currentGalleryIndex);
});

nextGalleryButton.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    updateGalleryImage(currentGalleryIndex);
});

// Initial gallery load
if (galleryThumbnails.length > 0) {
    updateGalleryImage(currentGalleryIndex);
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSubmitMessage = document.getElementById('formSubmitMessage');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission for validation

    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = 'Invalid email format.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Validate message
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required.';
        isValid = false;
    } else {
        messageError.textContent = '';
    }

    // If valid, show success message
    if (isValid) {
        formSubmitMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        contactForm.reset(); // Reset the form fields
    } else {
        formSubmitMessage.textContent = ''; // Clear success message if validation fails
    }
});