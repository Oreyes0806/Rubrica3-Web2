import React, { useEffect, useState } from 'react'
import { HostalContext } from './HostalContext'
import axios from 'axios'
import { ModalAlert } from '../../componentes/ModalAlert'
export const HostalProvider = ({children}) => {
    const [Bookings, setBookings] = useState()
    const [Rooms, setRooms] = useState()
    const [Alert, setAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    
    const handleAlert = (info) => {
        setAlert(info);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            setAlert('');
        }, 2000);
    };
    const URL_API = import.meta.env.VITE_URL_API
    const cargarRooms = async()=>{
        try {
            const {data} = await axios.get(`${URL_API}/rooms`, {withCredentials:true})
            if(data){
                setRooms(data)
            }else{
                setRooms([])
            }
           
        } catch ({response}) {
            console.log(response.data.message)
        }
    }
    const crearRoom = async(values)=>{
        try {
            await axios.post(`${URL_API}/rooms`, values, {withCredentials:true})
            cargarRooms()
            handleAlert({message:"Creado correctamente", success:true})
        } catch ({response}) {
            console.log(response.data.message)
            handleAlert({message:response.data.message,success:false})
        }
    }
    const eliminarRoom = async(values)=>{
        const {id} = values
        try {
            await axios.delete(`${URL_API}/rooms/${id}`, {withCredentials:true})
            cargarRooms()
            handleAlert({message:"Eliminado correctamente", success:true})
        } catch ({response}) {
            console.log(response.data.message)
            handleAlert({message:response.data.message, success:false})
        }
    }
    const actualizarRoom = async(values)=>{
        try {
            await axios.put(`${URL_API}/rooms/${values.idrooms}`,values, {withCredentials:true})
            cargarRooms()
            handleAlert({message:"Actualizado correctamente", success:true})
        } catch ({response}) {
            console.log(response.data.message)
            handleAlert({message:response.data.message, success:false})
        }
    }
    const reservarRoom = async(data)=>{
        try {
            await axios.post(`${URL_API}/bookings/`,data, {withCredentials:true})
            handleAlert({message:'Reservado correctamente!!',success:true})
        } catch ({response}) {
            console.log(response.data.message)
            handleAlert({message:response.data.message, success:false})
        }
    }
    const getReservasByUser = async(id)=>{
        try {
          const {data} = await axios.get(`${URL_API}/bookings/${id}`,{withCredentials:true})
          setBookings(data)
        } catch ({response}) {
            console.log(response.data.message)
            handleAlert({message:response.data.message, success:false})
        }
    }
    const deleteReserva = async(id)=>{
        try {
            const {data}= await axios.delete(`${URL_API}/bookings/${id}`,{withCredentials:true})
            handleAlert({message:data.message, success:true})
        } catch ({response}) {
            console.log(response.data.message)
            handleAlert({message:response.data.message, success:false})
        }
    }
    const editarReserva = async(values)=>{
        try {
            await axios.put(`${URL_API}/bookings/${values.idbookings}`, values, {withCredentials:true})
            handleAlert({message:'Actualizado', success:true})
            
        } catch ({response}) {
            console.log(response.data.message)
            handleAlert({message:response.data.message, success:false})
        }
    }
    useEffect(() => {
      cargarRooms()
      setAlert('')
    }, [])

  return (
   <HostalContext.Provider value={{crearRoom, deleteReserva, Rooms, Bookings, Alert ,setAlert, eliminarRoom, actualizarRoom, reservarRoom, getReservasByUser, editarReserva}}>
        {children}
        {showAlert && <ModalAlert message={Alert} />}
   </HostalContext.Provider>
  )
}
