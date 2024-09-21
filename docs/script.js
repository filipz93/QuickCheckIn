// Initialize citizenship toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const toggleContainer = document.getElementById('citizenship-toggle');
    const citizenshipInput = document.getElementById('citizenship-status');

    toggleContainer.addEventListener('click', function () {
        toggleContainer.classList.toggle('active');

        // Update the hidden input based on the toggle's state
        if (toggleContainer.classList.contains('active')) {
            citizenshipInput.value = 'domestic'; // Yes selected
        } else {
            citizenshipInput.value = 'foreign'; // No selected
        }
    });
});

// Language switching functionality
const translations = {
    en: {
        "email": "Email *",
        "nationality": "Nationality *",
        "firstname": "First Name *",
        "lastname": "Last Name *",
        "dob": "Date of Birth *",
        "submit": "Next"
    },
    sr: {
        "email": "Email *",
        "nationality": "Nacionalnost *",
        "firstname": "Ime *",
        "lastname": "Prezime *",
        "dob": "Datum rođenja *",
        "submit": "Sledeći"
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
