async function postForgot(email) {
  try {
      const response = await fetch("/api/session/forgot", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
          alert('Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.');
          window.location.href = "/login";
      } else {
          alert(data.message || "Ocurrió un error al intentar recuperar la contraseña.");
      }
  } catch (error) {
      console.error(error);
      alert("Error al procesar la solicitud. Por favor, intenta de nuevo.");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("forgot-form");
  if (form) {
      form.addEventListener("submit", function(e) {
          e.preventDefault();
          const email = document.getElementById("email").value;
          postForgot(email);
      });
  } else {
      console.error("El formulario forgot-form no fue encontrado.");
  }
});
