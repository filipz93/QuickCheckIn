// Initialize the canvas for the signature
const canvas = document.getElementById('signatureCanvas');
const signaturePad = new SignaturePad(canvas);

// Multi-step form functionality
let currentStep = 0;
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const circles = document.querySelectorAll('.progress-container .circle');
const lines = document.querySelectorAll('.progress-container .line');
const languagePicker = document.getElementById('language-picker');

// Citizenship selection elements
const domesticRadio = document.getElementById('domestic');
const foreignRadio = document.getElementById('foreign');
const domesticFields = document.getElementById('domestic-fields');
const foreignFields = document.getElementById('foreign-fields');

// Function to show a specific step and update progress
function showStep(stepIndex) {
    // Show current form step
    steps.forEach((step, index) => {
        step.style.display = index === stepIndex ? 'block' : 'none';
    });

    // Update progress circles and lines
    circles.forEach((circle, index) => {
        if (index <= stepIndex) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });

    lines.forEach((line, index) => {
        if (index < stepIndex) {
            line.classList.add('active');
        } else {
            line.classList.remove('active');
        }
    });

    // Hide the language picker after Step 1
    //if (stepIndex === 0) {
    //    languagePicker.style.display = 'flex';
    //} else {
    //    languagePicker.style.display = 'none';
    //}

    // Handle citizenship logic on Step 2
    if (stepIndex === 1) {
        if (domesticRadio.checked) {
            // Show domestic-specific fields
            domesticFields.style.display = 'block';
            foreignFields.style.display = 'none';
        } else if (foreignRadio.checked) {
            // Show foreign-specific fields
            foreignFields.style.display = 'block';
            domesticFields.style.display = 'none';
        }
    }
}

// Show the first step when the form loads
showStep(currentStep);

// Next button click event
nextBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        if (currentStep < steps.length - 1) {
            currentStep += 1;
            showStep(currentStep);
        }
    });
});

// Previous button click event
prevBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        if (currentStep > 0) {
            currentStep -= 1;
            showStep(currentStep);
        }
    });
});

// Clear the signature canvas
document.getElementById('clearSignature').addEventListener('click', function () {
    signaturePad.clear();
});

// Form submit event
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

// Language switching functionality with flags
const translations = {
    en: {
        "email": "Email *",
        "nationality": "Nationality *",
        "firstname": "First Name *",
        "lastname": "Last Name *",
        "dob": "Date of Birth *",
        "passport": "Passport Number *",
        "issue-date": "Issue Date *",
        "expiry-date": "Expiry Date *",
        "signature": "Signature *",
        "clear-signature": "Clear Signature",
        "privacy-policy": "I agree with the Terms and Conditions.",
        "submit": "Submit"
    },
    sr: {
        "email": "Email *",
        "nationality": "Nacionalnost *",
        "firstname": "Ime *",
        "lastname": "Prezime *",
        "dob": "Datum rođenja *",
        "passport": "Broj pasoša *",
        "issue-date": "Datum izdavanja *",
        "expiry-date": "Datum isteka *",
        "signature": "Potpis *",
        "clear-signature": "Obriši potpis",
        "privacy-policy": "Slažem se sa uslovima korišćenja.",
        "submit": "Pošalji"
    }
};

// Function to switch language
function setLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        el.textContent = translations[lang][key];
    });
}

// Add click event listeners for language flags
const flagIcons = document.querySelectorAll('.flag-icon');

flagIcons.forEach(flag => {
    flag.addEventListener('click', function () {
        flagIcons.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        setLanguage(this.getAttribute('data-lang'));
    });
});
