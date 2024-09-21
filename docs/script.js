﻿const canvas = document.getElementById('signatureCanvas');
const signaturePad = new SignaturePad(canvas);

// Add translations for both English and Serbian
const translations = {
    en: {
        "form-title": "Guest Check-In Form",
        "email": "Email *",
        "nationality": "Nationality *",
        "sex": "Sex *",
        "firstname": "First Name *",
        "lastname": "Last Name *",
        "dob": "Date of Birth *",
        "address": "Address *",
        "passport": "Passport Number *",
        "issue-date": "Issue Date *",
        "expiry-date": "Expiry Date *",
        "signature": "Signature *",
        "clear-signature": "Clear Signature",
        "privacy-policy": "I agree with the Terms and Conditions.",
        "submit": "Submit"
    },
    sr: {
        "form-title": "Prijava gosta",
        "email": "Email *",
        "nationality": "Nacionalnost *",
        "sex": "Pol *",
        "firstname": "Ime *",
        "lastname": "Prezime *",
        "dob": "Datum rođenja *",
        "address": "Adresa *",
        "passport": "Broj pasoša *",
        "issue-date": "Datum izdavanja *",
        "expiry-date": "Datum isteka *",
        "signature": "Potpis *",
        "clear-signature": "Obriši potpis",
        "privacy-policy": "Slažem se sa uslovima korišćenja.",
        "submit": "Pošalji"
    }
};

// Function to update form language
function updateLanguage(language) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        el.textContent = translations[language][key] || el.textContent;
    });
}

// Event listener for language selector
document.getElementById('language').addEventListener('change', function () {
    const selectedLanguage = this.value;
    updateLanguage(selectedLanguage);
});

// Initialize form with English as default language
updateLanguage('en');

// Handle multi-step form
let currentStep = 0;
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');

// Function to show the current step
function showStep(step) {
    steps.forEach((el, index) => {
        if (index === step) {
            el.classList.add('active');
            el.style.display = 'block'; // Show current step
        } else {
            el.classList.remove('active');
            el.style.display = 'none';  // Hide other steps
        }
    });
}

// Event listeners for "Next" buttons
nextBtns.forEach((btn, index) => {
    btn.addEventListener('click', function () {
        if (currentStep < steps.length - 1) {
            currentStep += 1;
            showStep(currentStep);
        }
    });
});

// Event listeners for "Previous" buttons
prevBtns.forEach((btn, index) => {
    btn.addEventListener('click', function () {
        if (currentStep > 0) {
            currentStep -= 1;
            showStep(currentStep);
        }
    });
});

// Initialize form with the first step visible
showStep(currentStep);

document.getElementById('clearSignature').addEventListener('click', function () {
    signaturePad.clear();
});

document.getElementById('checkinForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    if (signaturePad.isEmpty()) {
        alert('Please provide a signature.');
        return;
    }

    const signatureData = signaturePad.toDataURL();
    formData.append('signature', signatureData);

    alert('Form submitted successfully!');
    console.log('Form data:', formData);
});
