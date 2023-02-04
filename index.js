import Express from "express"
import http from "http"
import cors from "cors"
import {Server} from "socket.io"

// Controllers
import ApiController from './controllers/apiController.js'
import clientController from './controllers/client.js'

const app = Express()

const corsOptions = {
    origin: "*",
    credentials: true,
    allowedHeaders:  ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions))
app.use(Express.json())
app.use("/", ApiController)
app.use("/", clientController)

const server = http.createServer(app)
const PORT = process.env.PORT || 3000
const io = new Server(server, {
    path: "/socket.io",
    cors:{
        origin: "*",
        credentials: true
    }
})

io.on("connection", (socket)=>{
    console.log("Hello Motherfucker")
    socket.on("disconnect", ()=>{
        console.log("the gay are disconected")
    })
    socket.on("msg", (data)=>{
        console.log(data)
    })
})

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

app.use("/", (req, res) => {
    res.send("Hello")
})