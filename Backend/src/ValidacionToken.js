import jwt from "jsonwebtoken"
import { JWT_KEYSECRET } from "./config.js"

export const validarToken = (req, res, next)=>{
    const {token} = req.body
    if(!token) return res.send({message: 'No existe token'})
    jwt.verify(token,JWT_KEYSECRET,(error,user)=>{
        if(error)return res.send({message: 'Error: Token es invalido '})
        req.user = user
        next();
})
}