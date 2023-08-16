// ==================================================================================== 
// Login
// ====================================================================================

function login() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/api/users");
    xhr.onload = () => {
      const users = JSON.parse(xhr.responseText);
      const username = document.getElementById("username");
      const password = document.getElementById("password");
      const error = document.getElementById("error");
      
      for (let i = 0; i < users.length; i++) {
        if (username.value === users[i].username && password.value === users[i].password) {
          error.innerHTML = "";
          window.location.href = "http://127.0.0.1:5501/html/crud.html";
        } else {
          error.innerHTML = "Usuario o contraseña incorrectos";
          error.style.color = "red";
        }
      }
      
    };
    xhr.send();
  }
  
  const btnLogin = document.getElementById("btnLogin");
  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    login();
  });