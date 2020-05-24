import app from "./app";
import dotenv from "dotenv";
import net from "net";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
});

// const server = net.createServer((socket) => {
//     socket.write("Echo server\r\n");
//     socket.pipe(socket);
// });
//
// server.listen(1337, "127.0.0.1");
