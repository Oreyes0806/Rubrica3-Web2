import React, { useContext } from 'react'
import {UserContext} from '../../context/users/UserContext'
import { HostalContext } from '../../context/Hostal/HostalContext'
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
export const CardRoom = ({id, numero, tipo, valor}) => {
 const {user} = useContext(UserContext)
 const {reservarRoom} = useContext(HostalContext)
 const {register, handleSubmit} = useForm()
 const navigate = useNavigate()
 const admin = user? user.admin : false

  return (
    <div className='CardRoom'>
        <div className='CardRoom_container-img'>
          <img src="https://img.freepik.com/foto-gratis/comodo-dormitorio-moderno-elegante-cabecero-madera-generado-ia_24640-87460.jpg" alt="img room" />
        </div>
        <div className='CardRoom_info'>
          <span>Id: {id}</span>
          <h2>{tipo}</h2>
          <p>Numero: {numero}</p>
          <p>Valor: {valor}</p>
        </div>
        {
          !admin&&(
            <form action="POST" onSubmit={handleSubmit(values=>{
                const fecha_reservacion = new Date()
                reservarRoom({idrooms: id, idcliente:user.idusers,telefono_cliente:user.telefono, nombre_cliente:user.nombre+' '+user.apellido, fecha_reservacion, ...values})
            
            })} className='form'>
              <div className='form_group'>
                  <label htmlFor="fecha_entrada" className='form_label'>Fecha Entrada:</label>
                  <input type="datetime-local" className='form_input' {...register('fecha_entrada',{required:true})}/>
              </div>
              <div className='form_group'>
                  <label htmlFor="fecha_salida" className='form_label'>Fecha Salida:</label>
                  <input type="datetime-local" className='form_input' {...register('fecha_salida',{required:true})}/>
              </div>
              {
                user?(
                  <button className='btn'>Reservar</button>
                ):(
                  <Link className='btn btn-home' to={'/login'}>Loguarse</Link>
                )
              }
              
            </form>
            
          )
        }
       
    </div>
  )
}
