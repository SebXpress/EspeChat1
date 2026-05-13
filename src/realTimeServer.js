module.exports = httpServer => {
    const {Server} = require("socket.io");
    const io = new Server(httpServer);
    io.on("connection", socket => {
        // Capturamos el nombre de la cookie
        const cookie = socket.handshake.headers.cookie;
        const userName = cookie.split("=")[1];

        socket.on("message", message =>{
            io.emit("message", {
                message,
                user: userName,
                date: new Date().toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            });
        });

        // Evento cuando el usuario comienza a escribir
        socket.on("typing", () => {
            socket.broadcast.emit("typing", {
                user: userName
            });
        });

        // Evento cuando el usuario deja de escribir
        socket.on("stopTyping", () => {
            socket.broadcast.emit("stopTyping", {
                user: userName
            });
        });
    })
};