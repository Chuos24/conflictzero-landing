function submitContact(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  fetch('/api/v3/notify-admin', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  }).then(() => alert('Mensaje enviado'));
}
