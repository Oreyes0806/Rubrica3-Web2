import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../context/users/UserContext'
export const Register = () => {
    const {register, handleSubmit} = useForm()
    const {crearUsuario } = useContext(UserContext)

    
  return (
    <div className='container'>
        <form action="POST" onSubmit={handleSubmit(values=>{
            crearUsuario(values)
        })} className='form form-auth'>
            <h1 className='form_title'>SignIn</h1>
            <div className='form_group_row'>
                <div className='form_group form_group_rown-divided'>
                    <label htmlFor="nombre" className='form_label'>Nombre:</label>
                    <input type="text" className='form_input' {...register('nombre',{required:true})} />
                </div>
                <div className='form_group form_group_rown-divided'>
                    <label htmlFor="apellido" className='form_label'>Apellido:</label>
                    <input type="text" className='form_input' {...register('apellido', {required:true})} />
                </div>
            </div>
                <div className='form_group'>
                    <label className='form_label' htmlFor="email">Email:</label>
                    <input type="email" className='form_input' {...register('email', {required:true})}/>
                </div> 
                <div className='form_group'>
                    <label htmlFor="telefono" className='form_label'>Telefono:</label>
                    <input type="tel" className='form_input' {...register('telefono', {required:true})}/>
                </div> 
                <div className='form_group'>
                    <label htmlFor="password" className='form_label'>Password:</label>
                    <input type="password" className='form_input' {...register('password', {required:true})} />
                </div> 
                <button className='btn'>Registrarse</button>
        </form>
    </div>
  )
}
