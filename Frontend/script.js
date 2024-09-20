document.getElementById('checkinForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", document.getElementById('name').value);
    formData.append("email", document.getElementById('email').value);
    formData.append("idUpload", document.getElementById('idUpload').files[0]);

    // Clear any previous messages
    let messageDiv = document.getElementById('message');
    messageDiv.innerHTML = '';

    fetch('YOUR_API_GATEWAY_URL', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then(data => {
        // Show success message
        messageDiv.innerHTML = 'Check-in successful!';
        messageDiv.classList.add('success');
    })
    .catch(error => {
        // Show error message
        messageDiv.innerHTML = 'Error: ' + error.message;
        messageDiv.classList.add('error');
    });
});
