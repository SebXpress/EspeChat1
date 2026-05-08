//const login = document.getElementById("login");
//la misma función pero con querySelector
const login = document.querySelector("#login");

login.addEventListener('click', ()=>{
    const user = document.querySelector("#username").value;

    if(user != ""){
        document.cookie = `username=${user}`;
        document.location.href = "../"
    }else {
        alert("Porfavor ingrese el nombre de usuario");
    }

});