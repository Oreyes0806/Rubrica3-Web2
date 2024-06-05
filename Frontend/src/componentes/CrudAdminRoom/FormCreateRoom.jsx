import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { HostalContext } from '../../context/Hostal/HostalContext'
import { ModalAlert } from '../ModalAlert'
export const FormCreateRoom = ({setaddRoom}) => {
    const {crearRoom, Alert, showAlert, setAlert} =useContext(HostalContext)
    const { register, handleSubmit} =useForm()

  return (
    <div className='modal'>
        <form action="POST" onSubmit={handleSubmit(values=>{
            crearRoom(values)
            setaddRoom(false)
        })} className='form'>
          <img className='close' onClick={()=>setaddRoom(false)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACEElEQVR4nO2YTUhVQRTHf738olQUw02CPBIRNATBhQs1LXCT7mwVRO1ci6ILNwa5dSHoRnAltghxEbWplWJQILUJQnlggraoqEQLP54MzOJyOL3eh8ydcH4wmzvnnPnfOzNnzlwIBAKBQOCC0gr0A1cKjNMF9ACXcchjIG3bOnA1zzgTkTivgQSO+B4Z2LT5PGLcAU5FnCSO2BADmzaQg3818Fn47wAlOOIWcCIEfAFqs/RfEr6ndj85ZUqZhZUs/O4rftPEQJHdwFLMoww+dcA3Yf8BKCMmbgA/haB9oEGxTdhMI22biJmHyiysKnl9VLF7gCcsKuJGIv3NwKHof4pHVAEpIfC3Pa1LgfeibxOoxDM6gWMh1AifFc/+AO14yqSylGQbxmOKgLUM4l8Cl/CcJPBLEb+bw0kdKx3AkfICWz5uXEk58CnDEvIqdWosZLGJTS3kJfcUscvAnnj2w5YgXnEd+CqEbtu6v0+5uLx1Wfv/C1OkvRICzV2hO2Izo8zOEzxhTBFnDrQoZbZsli95m5hps6VBVNg7oFixbVEKuh3gGjFhfqd8VOr7xgw+I8psPY/rdJ7L8Tb2t/2SBoZwzIAi4lmWvnVKxjqwdwYnlNi1K9dyTQ4xBpUP8AJH1CvZxPykKvTUTuEIeTkfzzNOBfAmEsekY6d1f6+tPAvNZHeBm+ekKxAIBAIB/ivOAM2OAh166TcAAAAAAElFTkSuQmCC"/>
            <h1 className='form_title'>Crear Room</h1>
          <div className='form_group'>
                 <label className='form_label' htmlFor="numero">Numero:</label>
                  <input className='form_input' type="text" {...register('numero',{required:true})} />
            </div>
            <div className='form_group'>
                <label className='form_label' htmlFor="tipo">Tipo:</label>
                <input className='form_input' type="text" {...register('tipo',{required:true})} />
            </div>
            <div className='form_group'>
                <label className='form_label' htmlFor="valor">Valor:</label>
                <input className='form_input' type="text" {...register('valor',{required:true})} />
            </div>
            <button className='btn'>Crear Room</button>
        </form>
        {showAlert && <ModalAlert message={Alert} />}
    </div>
  )
}
