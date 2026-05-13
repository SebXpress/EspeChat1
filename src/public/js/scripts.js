const socket = io();

const send =  document.querySelector("#send-message");
const allMessages = document.querySelector("#all-messages");
const messageInput = document.querySelector("#message");
const typing = document.querySelector("#typing");

// Variable para controlar si el usuario está escribiendo
let isTyping = false;
let typingTimeout;

// Escuchamos al escribir en el input del mensaje
messageInput.addEventListener("input", () => {
    if (!isTyping) {
        isTyping = true;
        socket.emit("typing");
    }
    
    // Resetear el timeout cada vez que el usuario escribe
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        isTyping = false;
        socket.emit("stopTyping");
    }, 1000); // Si pasan 1 segundo sin escribir, se considera que dejó de hacerlo
});

// Escuchamos al clic cuando hacemos click en el boton de enviar mensaje
send.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit("message", message);
        messageInput.value = "";
        isTyping = false;
        socket.emit("stopTyping");
    }
});

// También enviamos mensaje al presionar Enter
messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const message = messageInput.value.trim();
        if (message) {
            socket.emit("message", message);
            messageInput.value = "";
            isTyping = false;
            socket.emit("stopTyping");
        }
    }
});

socket.on("message", ({user, message, date}) => {
    const msg = document.createRange().createContextualFragment(`
    
        <div class="message">
          <div class="image-container">
            <img src="/img/f1.png" alt="" />
          </div>
          <div class="message-body">
            <div class="user-info">
              <span class="username">${user}</span>
              <span class="time">${date}</span>
              <p>
                ${message}
              </p>
            </div>
          </div>
        </div>
        
        `); 

    allMessages.append(msg);
});

// Escuchamos el evento typing del servidor
socket.on("typing", ({user}) => {
    typing.innerHTML = `<em>${user} está escribiendo...</em>`;
});

// Escuchamos el evento stopTyping del servidor
socket.on("stopTyping", ({user}) => {
    typing.innerHTML = "";
});