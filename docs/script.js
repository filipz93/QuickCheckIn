const canvas = document.getElementById('signatureCanvas');
const signaturePad = new SignaturePad(canvas);

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
