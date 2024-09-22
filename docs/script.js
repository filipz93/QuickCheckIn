// Initialize citizenship toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const toggleContainer = document.getElementById('citizenship-toggle');
    const citizenshipInput = document.getElementById('citizenship-status');
    const yesSpan = document.getElementById('yes-span');
    const submitAllBtn = document.getElementById('submit-all-btn');
    const submitOneBtn = document.getElementById('submit-one-btn');
    const noSpan = document.getElementById('no-span');
    const domesticFields = document.getElementById('domestic-fields'); // Domestic-specific fields
    const foreignFields = document.getElementById('foreign-fields'); // Foreign-specific fields
    const foreignFieldsSimple = document.getElementById('foreign-fields-simple'); 
    const nextWithUploadBtn = document.getElementById('next-with-upload');
    const skipUploadBtn = document.getElementById('skip-upload');
    const simplifiedForm = document.getElementById('simplified-form');
    const fullForm = document.getElementById('full-form');
    const fileInput = document.getElementById('id-photo');
    const addGuestBtn = document.getElementById('add-guest-btn');
    const guestsContainer = document.getElementById('guests-container');
    let guestCount = 1; // Track the number of guests
    const guestsData = []; // Store guest data

    // If the user uploads a photo, show the simplified form
    nextWithUploadBtn.addEventListener('click', function () {
        if (fileInput.files.length > 0) {
            document.getElementById('step-1').style.display = 'none';
            simplifiedForm.style.display = 'block';
            fullForm.style.display = 'none';
        } else {
            alert('Please upload a file first.');
        }
    });

    // If the user skips the upload, show the full form
    skipUploadBtn.addEventListener('click', function () {
        document.getElementById('step-1').style.display = 'none';
        fullForm.style.display = 'block';
        simplifiedForm.style.display = 'none';
    });

    // Handle "Add Another Guest" button click
    addGuestBtn.addEventListener('click', function () {
        const currentGuestData = getFormData(); // Get current guest form data
        guestsData.push(currentGuestData); // Store the current guest data

        guestCount++; // Increment guest count

        // Reset the form for a new guest and move back to step 1
        resetForm();
        currentStep = 0; // Reset step to 1
        showStep(currentStep);
        //steps.forEach((step, index) => {
        //    step.style.display = index === 0 ? 'block' : 'none'; // Show step 1
        //});

        // Show Submit button after adding at least one guest
        if (guestCount > 1) {
            submitAllBtn.style.display = 'inline-block';
            submitAllBtn.style.display = 'none';
        }
    });

    // Function to gather current guest form data
    function getFormData() {
        const formData = {};
        document.querySelectorAll('input, select').forEach(input => {
            formData[input.name] = input.value;
        });
        return formData;
    }

    // Reset form fields for the next guest
    function resetForm() {
        document.querySelectorAll('input').forEach(input => input.value = '');
        document.querySelectorAll('select').forEach(select => select.value = '');
    }

    // Final form submission
    submitAllBtn.addEventListener('click', function () {
        const currentGuestData = getFormData();
        guestsData.push(currentGuestData); // Add last guest's data
        console.log(guestsData); // All guest data is available for submission
        // You can now submit the `guestsData` array to your server
    });
    toggleContainer.addEventListener('click', function () {
        toggleContainer.classList.toggle('active');

        // Update the hidden input based on the toggle's state
        if (toggleContainer.classList.contains('active')) {
            citizenshipInput.value = 'domestic'; // Yes selected
            yesSpan.style.display = 'block';
            noSpan.style.display = 'none';
            domesticFields.style.display = 'block'; // Show domestic fields
            foreignFields.style.display = 'none'; // Hide foreign fields
            foreignFieldsSimple.style.display = 'none';
        } else {
            citizenshipInput.value = 'foreign'; // No selected
            yesSpan.style.display = 'none';
            noSpan.style.display = 'block';
            domesticFields.style.display = 'none'; // Hide domestic fields
            foreignFields.style.display = 'block'; // Hide foreign fields
        }
    });

    // Multi-step form functionality
    let currentStep = 0;
    const steps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const circles = document.querySelectorAll('.progress-container .circle');
    const lines = document.querySelectorAll('.progress-container .line');
    // Display the file name when the user selects a file
    document.getElementById('id-photo').addEventListener('change', function () {
        const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
        //const fileInput = document.getElementById('id-photo');
        const nextButton = document.getElementById('next-with-upload');
        const skipButton = document.getElementById('skip-upload');
        document.getElementById('file-name').textContent = fileName;
        if (fileInput.files.length > 0) {
            nextButton.style.display = 'inline-block';
            skipButton.style.display = 'none';
        } else {
            nextButton.style.display = 'none';
            skipButton.style.display = 'inline-block';
        }
    });
    //camera functions
    // Handle display logic for buttons based on file input and camera input
    //const fileInput = document.getElementById('id-photo');
    const cameraInput = document.getElementById('camera-input');
    const nextButton = document.getElementById('next-with-upload');
    const skipButton = document.getElementById('skip-upload');

    // On page load, show skip button by default
    window.onload = function () {
        nextButton.style.display = 'none';
        skipButton.style.display = 'inline-block';
    };

    // When a file is selected from file input or camera input
    function handleFileChange(input) {
        if (input.files.length > 0) {
            document.getElementById('file-name').textContent = input.files[0].name;
            nextButton.style.display = 'inline-block';
            skipButton.style.display = 'none';
        } else {
            nextButton.style.display = 'none';
            skipButton.style.display = 'inline-block';
        }
    }

    // Event listeners for file input and camera input
    fileInput.addEventListener('change', function () {
        handleFileChange(fileInput);
    });

    cameraInput.addEventListener('change', function () {
        handleFileChange(cameraInput);
    });

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
            "citizenshipLabel": "Citizenship *", 
            "municipality": "Municipality of residence *",
            "residencePlace": "Place of residence *", 
            "residenceCountry": "Country of residence *",
            "email": "Email *",
            "firstname": "First Name *",
            "lastname": "Last Name *",
            "dob": "Date of Birth *",
            "birthcountry": "Country of Birth *",
            "birthplace": "Place of Birth *",
            "submit": "Next"
        },
        sr: {
            "citizenship": "Da li ste državljanin Srbije? *",
            "citizenshipLabel": "Državljanstvo *",
            "municipality": "Opština prebivališta *",
            "residencePlace": "Mesto prebivališta *",
            "residenceCountry": "Država prebivališta *",
            "email": "Email *",
            "firstname": "Ime *",
            "lastname": "Prezime *",
            "dob": "Datum rođenja *",
            "birthcountry": "Država rodjenja *",
            "birthplace": "Mesto rodjenja *",
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
