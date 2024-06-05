import express from 'express'
import { urlencoded } from "express"
import roomsRoutes from "./routes/roomsRoutes.js"
import { PORT } from './config.js'
import bookingsRoutes from './routes/bookingsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import cookies from 'cookie-parser'
import {URLClient} from './config.js'
const app = express()
app.use(express.json())
app.use(cors({
    origin: URLClient,
    credentials:true
}))
app.use(cookies())
app.use(urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send('Wel')
})
app.use('/users', userRoutes)
app.use('/rooms', roomsRoutes)
app.use('/bookings', bookingsRoutes)
app.listen(PORT, ()=>console.log(`Servidor ejecutandose!! http://localhost:${PORT}`))
