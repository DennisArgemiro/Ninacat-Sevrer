import Express from 'express'
import * as supabase from '../data/interface/supabase.js'

const router = Express.Router();

router.post("/signUp", async (req, res) => {
    // Registrar-se
    const {
        name,
        password,
        username
    } = req.body
    const data = {
        name,
        username,
        password,
        uid: Math.floor(Math.random() * (999999 - 100000) + 100000)
    }
    const response = await supabase.insert("User", data)
    res.json(response).status(200)
})

router.post("/signIn", async (req, res) => {
    // Logar-se
    const { username, password } = req.body;
    console.log("Cheguei até aqui")
    const data = await supabase.select("User", undefined, { colunm: "username", value: username })
    if (data[0] != undefined) {
        if (data[0].password == password) {
            res.json({
                msg: "Sign In with Sucess",
                status: 200
            })
        } else {
            res.json({
                msg: "Password Incorrect",
                status: 400
            })
        }
    } else {
        res.json({
            msg: "User Not Found",
            status: 400
        })
    }

})

export default router   