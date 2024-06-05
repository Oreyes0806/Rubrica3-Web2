import React, { useContext } from 'react'
import {useForm} from 'react-hook-form'
import { HostalContext } from '../../context/Hostal/HostalContext'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../../context/users/UserContext'
export const FormEditBooking = ({idbookings, idrooms, telefono_cliente, fecha_entrada, fecha_salida, setopenEdit}) => {
    const {user} = useContext(UserContext)
    const {editarReserva, getReservasByUser} = useContext(HostalContext)
    const navigate = useNavigate()
    const { register, handleSubmit } =useForm({
        defaultValues:{
            idrooms: idrooms,
            telefono_cliente:telefono_cliente,
            fecha_entrada: new Date(fecha_entrada).toISOString().slice(0, 16),
            fecha_salida:new Date(fecha_salida).toISOString().slice(0, 16),
        }
    })

  return (
    <div className='modal'>
        <form action="POST" className='form' onSubmit={handleSubmit(values=>{
            editarReserva({idbookings,...values})
            getReservasByUser(user.idusers)
            setopenEdit(false)
            navigate('/misreservas')
        })}>
        <img className='close' onClick={()=>setopenEdit(false)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACEElEQVR4nO2YTUhVQRTHf738olQUw02CPBIRNATBhQs1LXCT7mwVRO1ci6ILNwa5dSHoRnAltghxEbWplWJQILUJQnlggraoqEQLP54MzOJyOL3eh8ydcH4wmzvnnPnfOzNnzlwIBAKBQOCC0gr0A1cKjNMF9ACXcchjIG3bOnA1zzgTkTivgQSO+B4Z2LT5PGLcAU5FnCSO2BADmzaQg3818Fn47wAlOOIWcCIEfAFqs/RfEr6ndj85ZUqZhZUs/O4rftPEQJHdwFLMoww+dcA3Yf8BKCMmbgA/haB9oEGxTdhMI22biJmHyiysKnl9VLF7gCcsKuJGIv3NwKHof4pHVAEpIfC3Pa1LgfeibxOoxDM6gWMh1AifFc/+AO14yqSylGQbxmOKgLUM4l8Cl/CcJPBLEb+bw0kdKx3AkfICWz5uXEk58CnDEvIqdWosZLGJTS3kJfcUscvAnnj2w5YgXnEd+CqEbtu6v0+5uLx1Wfv/C1OkvRICzV2hO2Izo8zOEzxhTBFnDrQoZbZsli95m5hps6VBVNg7oFixbVEKuh3gGjFhfqd8VOr7xgw+I8psPY/rdJ7L8Tb2t/2SBoZwzIAi4lmWvnVKxjqwdwYnlNi1K9dyTQ4xBpUP8AJH1CvZxPykKvTUTuEIeTkfzzNOBfAmEsekY6d1f6+tPAvNZHeBm+ekKxAIBAIB/ivOAM2OAh166TcAAAAAAElFTkSuQmCC"/>
        <h1 className='form_title'>Edit Booking</h1>
        <div className='form_group'>
            <label htmlFor="" className='form_label'>Id Room:</label>
            <input type="number" className='form_input' {...register('idrooms', {required:true})}/>
        </div>
        <div className='form_group'>
            <label htmlFor="" className='form_label'>Telefono cliente:</label>
            <input type="number" className='form_input'{...register('telefono_cliente', {required:true})} />
        </div>
        <div className='form_group'>
            <label htmlFor="" className='form_label'>Fecha Entrada:</label>
            <input type="datetime-local" className='form_input'{...register('fecha_entrada', {required:true})} />
        </div>
        <div className='form_group'>
            <label htmlFor="" className='form_label'>Fecha Salida:</label>
            <input type="datetime-local" className='form_input' {...register('fecha_salida', {required:true})} />
        </div>
        <button className='btn'>Editar</button>
        </form>
    </div>
  )
}
