import { Socket } from "socket.io";
import http from "http";
import cors from 'cors';

import express, { Request, Response } from 'express';

import { Server } from 'socket.io';
import { UserManager } from "./managers/UserManger";
import { run } from "./learn/model";


const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,

}
const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});


app.post("/chat", async (req: Request, res: Response) => {
  const { emailID, userInput } = req.body;
  try {
    const response = await run(emailID, userInput);
    return res.status(200).json({message: "success", data: response});
  } catch (error) {
    
  }
})

const userManager = new UserManager();

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  userManager.addUser("randomName", socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userManager.removeUser(socket.id);
  })
});



server.listen(3000, () => {
    console.log('listening on *:3000');
});