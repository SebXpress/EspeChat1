module.exports = httpServer => {
    const {Server} = require("socket.io");
    const io = new Server(httpServer);
    io.on("connection", socket => {
        socket.on("message", message =>{
            // capturamos el nombre de la cookie
            const cookie = socket.handshake.headers.cookie;
            io.emit("message", {
                message,
                user: cookie.split("=")[1],
                date: new Date().toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            });
        });
    })
};