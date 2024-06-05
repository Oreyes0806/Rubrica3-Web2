import React, { useContext } from 'react'
import { HostalContext } from '../context/Hostal/HostalContext'
import { CardRoom } from '../componentes/CardRoom/CardRoom'

export const Rooms = () => {
    const {Rooms} = useContext(HostalContext)
  return (
    <div className='container-rooms'>
        {
          Rooms?(
            Rooms.map(room=><CardRoom key={room.idrooms} id={room.idrooms} numero={room.numero} tipo={room.tipo} valor={room.valor}/>)
          ):(
            <h2>No hay habitaciones</h2>
          )
            
        }
    </div>
  )
}
