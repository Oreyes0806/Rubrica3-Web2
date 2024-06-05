import React, { useContext, useEffect } from 'react'
import { HostalContext } from '../context/Hostal/HostalContext'
import { UserContext } from '../context/users/UserContext'
import { CardBooking } from '../componentes/CardBooking/CardBooking'
export const MisReservaciones = () => {
    const {getReservasByUser, Bookings}= useContext(HostalContext)
    const {user} = useContext(UserContext)
    useEffect(() => {
      if(user)getReservasByUser(user.idusers)
    }, [user, Bookings])
    
  return (
    <div className='container-rooms'>
        {
            Bookings?(
               Bookings.map(booking=> <CardBooking key={booking.idbookings} idbookings={booking.idbookings} idrooms={booking.idrooms} numero={booking.numero} tipo={booking.tipo} valor={booking.valor} fecha_entrada={booking.fecha_entrada} fecha_salida={booking.fecha_salida} telefono_cliente={booking.telefono_cliente}/>)
            ):(
                <h2>No tienes reservas</h2>
            )
        }
    </div>
  )
}
