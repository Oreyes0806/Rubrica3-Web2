import React, { useState } from 'react'
import { UserContext } from './UserContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'
import {ModalAlert} from '../../componentes/ModalAlert'
export const UserProvider = ({children}) => {
    const [user, setUser] = useState()
    const [error, seterror] = useState('')
    const [Alert, setAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate()
    const URL_API = import.meta.env.VITE_URL_API
    
      const handleAlert = (info) => {
        setAlert(info);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            setAlert('');
        }, 2000);
    };
    const crearUsuario = async(values)=>{
        try {
            const {data} = await axios.post(`${URL_API}/users/register`,values, { withCredentials: true }) 
            if(data){
                setUser(data)
                handleAlert({message:"Creado correctamente", success:true})
            }
        } catch (error) {
            console.log(error)
            seterror(error)
            handleAlert({message: error.message, success:false})
        }
        
    }
    const login = async(values)=>{
        try {
            const {data} = await axios.post(`${URL_API}/users/login`,values, {withCredentials:true})
            if(data){
                setUser(data)
                navigate('/')
                handleAlert({message:"Inicio Sesion Corrrecto", success:true})
            }
        } catch (error) {
            console.log(error)
            seterror(error)
            handleAlert({message: error.message, success:false})
          
        }
    }
    const logout =async()=>{
        try {
            const {data} = await axios.post(`${URL_API}/users/logout`,{}, {withCredentials:true})
            if(data)setUser(null)
                
        } catch (error) {
            console.log(error)
            seterror(error)
            handleAlert({message:error, success:false})
        }
    }
    const editarPerfil = async(values)=>{
        try {
            const {data} = await axios.put(`${URL_API}/users/profile`, {id:user.idusers, email:user.email, values})
            if(data){
                delete values.passsword
                setUser({...user, values})
                handleAlert({message:"Actualizado Correctamente", success:true})
            }
        } catch (error) {
            console.log(error)
            seterror(error)
            handleAlert({message: error.message, success:false})
        }
    }
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
          try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000; 
            if (decoded.exp < currentTime) {
              console.error('Token has expired');
                logout()
            } else {
              setUser({ ...decoded.user });
            }
          } catch (error) {
            console.error('Token decoding failed', error);
          }
        }
      }, []);
  return (
   <UserContext.Provider value={{login, crearUsuario, logout, user, error, seterror, editarPerfil}}>
        {children}
        {showAlert && <ModalAlert message={Alert} />}
   </UserContext.Provider>
  )
}
