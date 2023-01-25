import Express from "express"
import * as supabase from '../data/interface/supabase.js'

const __dirname = process.cwd(".")

const router = Express.Router()

router.post("/createRoom", async (req, res) => {
    // Códigos:
    // 010 - Privado
    // 011 - Grupo
    // Código do tipo de Sala + ID do 1° usuário + 010 + ID do 1° usuário
    // Exemplo de código de sala : 010873444983764
    const {
        idRequester,
        idRequested,
        typeRoom,
        msgs
    } = req.body

    // Criar arquivo da sala
    const _private = "010";
    const group = "011"

    const types = { _private, group }

    const roomCode = `${types[typeRoom]}${idRequester}${idRequested}`

    const filePath = __dirname + `/rooms/${roomCode}.json`


    // Criar cabeçalho do Arquivo da Sala   
    var headerRoom = {
        idRoom: roomCode,
        type: types[typeRoom],
        idRequester,
        idRequested,
        msgs
    }

    const data = await supabase.select("Room", "msgs")

    res.json(data)
})

router.get("/supa", async (req, res) => {
    res.json(await supabase.select())
})

export default router 