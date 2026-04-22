// Añadir al <head> de register.html
function submitRegister(e) {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    full_name: firstName + ' ' + lastName,
    company_name: document.getElementById('company').value,
    ruc: document.getElementById('ruc').value
  };
  fetch('/api/v3/auth/register-web', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  }).then(r => r.json()).then(j => {
    alert(j.success ? 'Registro exitoso' : 'Error: ' + JSON.stringify(j));
  });
}
