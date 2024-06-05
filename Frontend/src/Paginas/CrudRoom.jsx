import React, { useContext, useState } from 'react'
import { HostalContext } from '../context/Hostal/HostalContext'
import { CardRoom } from '../componentes/CardRoom/CardRoom'
import { FormCreateRoom} from '../componentes/CrudAdminRoom/FormCreateRoom'
import { ModalDeleteRoom } from '../componentes/CrudAdminRoom/ModalDeleteRoom'
import { ModalGetId } from '../componentes/CrudAdminRoom/ModalGetId'

export const CrudRoom = () => {
    const {Rooms} = useContext(HostalContext)
    const [addRoom, setaddRoom] = useState(false)
    const [deleteRoom, setdeleteRoom] = useState(false)
    const [actualizarRoom, setactualizarRoom] = useState(false)
  return (
    <div className='container-rooms'>
      <div className='container-btn-crudrooms'>
      <button className='btn btn-crudrroms' onClick={()=>{if(!deleteRoom&&!actualizarRoom)setaddRoom(!addRoom)}}>Agregar room</button>
        <button className='btn btn-crudrroms' onClick={()=>{if(!actualizarRoom&&!addRoom)setdeleteRoom(!deleteRoom)}}>Eliminar Room</button>
        <button className='btn btn-crudrroms' onClick={()=>{if(!deleteRoom&&!addRoom)setactualizarRoom(!actualizarRoom)}}>Actualizar Room</button>
      </div>
        {
          Rooms?(
            Rooms.map(room=><CardRoom key={room.idrooms} id={room.idrooms} numero={room.numero} tipo={room.tipo} valor={room.valor}/>)
          ):(
            <h1>No hay habitaciones</h1>
          )
          }
        {
            addRoom&&(
                <FormCreateRoom setaddRoom={setaddRoom} />
            )
        }
        {
            deleteRoom&&(
                <ModalDeleteRoom setdeleteRoom={setdeleteRoom}/>
            )
        }
        {
          actualizarRoom&&(
            <ModalGetId setactualizarRoom={setactualizarRoom}/>
          ) 
        }
    </div>
  )
}
