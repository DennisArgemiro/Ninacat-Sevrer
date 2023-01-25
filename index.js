import Express from "express"
import http from "http"

// Controllers
import ApiController from './controllers/apiController.js'
import clientController from './controllers/client.js'


const app = Express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3000

server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

app.use(Express.json())

app.use("/", ApiController)
app.use("/", clientController)

app.use("/", (req, res)=>{
    res.send("Hello")
})