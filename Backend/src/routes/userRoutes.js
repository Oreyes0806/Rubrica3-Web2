import { Router } from "express";
import {CreateUser, Login, logout, updateUser} from '../controllers/userController.js'
import { validarToken } from "../ValidacionToken.js";
const userRouter = Router();
userRouter.post('/register', CreateUser )
userRouter.post('/login', Login) 
userRouter.post('/logout', logout)
userRouter.put('/profile', validarToken, updateUser)
export default userRouter