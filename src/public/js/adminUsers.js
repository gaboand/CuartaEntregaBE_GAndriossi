function changeRole(userId, newRole) {
    fetch(`/api/users/premium/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      },
      body: JSON.stringify({ role: newRole })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      location.reload();
    })
    .catch(error => console.error('Error:', error));
  }
  
  function deleteUser(userId) {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        location.reload();
      })
      .catch(error => console.error('Error:', error));
    }
  }
  