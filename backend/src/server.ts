import http from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";

// Configure
dotenv.config();

// Express App
import application from "./app";

// Initialize Server
const server = http.createServer(application);

// Socket
const io = new Server(server, {
    cors: {
        origin: "*",
        // origin: "http://localhost:3000",
    }
});

io.on("connection", (socket) => {
    console.log(socket);
})



