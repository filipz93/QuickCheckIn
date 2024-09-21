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

    // Multi-step form functionality
    let currentStep = 0;
    const steps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const circles = document.querySelectorAll('.progress-container .circle');
    const lines = document.querySelectorAll('.progress-container .line');

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

    // Language switching functionality
    const translations = {
        en: {
            "citizenship": "Are you a citizen of Serbia? *",
            "email": "Email *",
            "firstname": "First Name *",
            "lastname": "Last Name *",
            "dob": "Date of Birth *",
            "submit": "Next"
        },
        sr: {
            "citizenship": "Da li ste državljanin Srbije? *",
            "email": "Email *",
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
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
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
});
