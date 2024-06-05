import jwt from "jsonwebtoken"
import { JWT_KEYSECRET } from "./config.js"

export const validarToken = (req, res, next)=>{
    const {token} = req.cookies
    if(!token) return res.send({message: 'autorizacion denegada'})
    jwt.verify(token,JWT_KEYSECRET,(error,user)=>{
        if(error)return res.send({message: 'Token invalido'})
        req.user = user
        next();
})
}