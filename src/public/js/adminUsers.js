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
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    alert("Usuario no encontrado.");
                } else {
                    throw new Error('Failed to delete user');
                }
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            location.reload(); 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al eliminar el usuario.');
        });
    }
}

