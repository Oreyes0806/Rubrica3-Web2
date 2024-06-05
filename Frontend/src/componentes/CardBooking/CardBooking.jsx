import React, { useContext, useState } from 'react'
import { HostalContext } from '../../context/Hostal/HostalContext'
import { FormEditBooking } from './FormEditBooking'

export const CardBooking = ({idbookings, idrooms, tipo, numero, valor, fecha_entrada, fecha_salida, telefono_cliente}) => {
  const {deleteReserva} = useContext(HostalContext)
  const [openEdit, setopenEdit] = useState(false)
  return (
    <div className='CardRoom'>
        <div className='CardRoom_container-img'>
            <img src="https://img.freepik.com/foto-gratis/comodo-dormitorio-moderno-elegante-cabecero-madera-generado-ia_24640-87460.jpg" alt="img-room" />
        </div>
        <div>
            <div className='CardRoom_info'>
               <p>Id Room: {idrooms}</p>
               <p>Tipo: {tipo}</p>
               <p>Numero: {numero}</p>
               <p>Valor: {valor}</p>
            </div>
            <div className='CardRoom_info'>
                <p>Fecha Entrada: {new Date(fecha_entrada).toISOString().slice(0, 16)}</p>
                <p>Fecha Salida: {new Date(fecha_salida).toISOString().slice(0, 16)}</p>
            </div>
            <div className='Card_Btn'>
            <img width="30" onClick={()=>setopenEdit(true)} height="30" src="https://img.icons8.com/ios-filled/50/edit--v1.png" alt="edit--v1"/>
            <img width="30" onClick={()=>deleteReserva(idbookings)} height="30" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash"/>
            </div>
        </div>
        {
          openEdit&&(
            <FormEditBooking idbookings={idbookings} idrooms={idrooms} telefono_cliente={telefono_cliente} fecha_entrada={fecha_entrada} fecha_salida={fecha_salida} setopenEdit={setopenEdit}/>
          )
        }
    </div>
  )
}
