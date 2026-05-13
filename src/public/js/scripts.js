const socket = io();

const send =  document.querySelector("#send-message");
const allMessages = document.querySelector("#all-messages");

// escuchamos al clic cuando hacemos click en el boton de enviar mensaje
send.addEventListener("click", () => {
    const message = document.querySelector("#message");
    socket.emit("message",message.value);
    message.value = "";
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