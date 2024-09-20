// Signature pad setup
const canvas = document.getElementById('signatureCanvas');
const signaturePad = new SignaturePad(canvas);

// Clear signature button event listener
document.getElementById('clearSignature').addEventListener('click', function () {
    signaturePad.clear();
});

// Form submission
document.getElementById('checkinForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);

    // Check if the signature is empty
    if (signaturePad.isEmpty()) {
        alert('Please provide a signature.');
        return;
    }

    // Get the signature as data URL (image)
    const signatureData = signaturePad.toDataURL();

    // Append the signature data to the form data
    formData.append('signature', signatureData);

    // Simulate form submission (this is where you send data to the server)
    alert('Form submitted successfully!');
    console.log('Form data:', formData);

    // Example: Send formData to server using fetch or XMLHttpRequest
    // fetch('your-server-endpoint', {
    //     method: 'POST',
    //     body: formData
    // }).then(response => {
    //     console.log('Server response:', response);
    // }).catch(error => {
    //     console.error('Error:', error);
    // });
});
