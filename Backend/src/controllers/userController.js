import { pool } from "../db.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {JWT_KEYSECRET} from '../config.js'


export const CreateUser = async(req,res)=>{
    try {
        const {nombre, apellido, telefono, email, password} = req.body
        const passwordEncriptada = await bcrypt.hash(password, 10)
        const [response] = await pool.query('INSERT INTO users (nombre, apellido, telefono, email, password) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, telefono, email, passwordEncriptada])
        if(response.affectedRows === 0) return res.status(404).send({message: 'No se pudo registrar'})
        const idusers = response.insertId
        jwt.sign({idusers, nombre, apellido, telefono, email}, JWT_KEYSECRET,   { expiresIn: '1h' }, (error, token) => {
            if (error) return console.log(error);
            res.cookie('token', token);
            res.status(200).send({ idusers, nombre, apellido, telefono, email });
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [response] = await pool.query('SELECT * FROM users WHERE email= ?', [email]);
        if (response.length === 0) {
            return res.status(404).send({ message: "No existe usuario con ese email" });
        }
        const user = response[0];
        let EquealsPassword = false;
        if (!user.admin) {
            EquealsPassword = await bcrypt.compare(password, user.password);
        } else {
           
            EquealsPassword = user.password === password;
        }

        if (!EquealsPassword) {
            return res.status(401).send({message:'Credenciales invalidas'});
        }
        delete user.password;


        jwt.sign({user},JWT_KEYSECRET, { expiresIn: '1h' }, (error, token) => {
            if (error) {
                console.log(`Error en token: ${error}`);
                return res.send("Error al generar el token" );
            }
            res.cookie('token', token);
            res.status(200).send(user);
        });
    } catch (error) {
        console.log(`Error:`,error);
        res.status(500).send({message: error});
    }
};
export const logout = (req,res)=>{
    res.cookie('token', '',{
    expires: new Date(0)
   })
   return res.sendStatus(200);
}
export const updateUser = async(req, res)=>{
    try {
        const {nombre, apellido, password, email, idusers} = req.body
        if(password){
            const passwordEncriptada = await bcrypt.hash(password, 10);
            const [response] = await pool.query('UPDATE users SET nombre=?, apellido=?, password=?, email=? WHERE idusers=?', 
                                              [nombre, apellido, passwordEncriptada, email, idusers]);
    
            if(response.affectedRows === 0){
                return res.send({message: "No se pudo actualizar el usuario"});
            }
            return res.send({message: "Usuario actualizado con éxito"});
        }
       const [response] = await pool.query('SELECT password FROM users WHERE idusers=?', [idusers])
        const passwordResponse = response[0].password
        const [data] = await pool.query('UPDATE users SET nombre=?, apellido=?, password=?, email=? WHERE idusers=?', 
                                              [nombre, apellido, passwordResponse, email, idusers]);
    
            if(data.affectedRows === 0){
                return res.status(404).send({message: "No se pudo actualizar el usuario"});
            }
            return res.send({message: "Usuario actualizado con éxito"});

    } catch (error) {
        console.log(error);
        res.send({message: 'Error email ya se encuentran registrados'});
    }
}

