import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../context/users/UserContext'
export const Login = () => {
    const {register, handleSubmit} = useForm()
    const {login} = useContext(UserContext)

    
  return (
    <div className='container'>
    <form action="POST" onSubmit={handleSubmit(values=>{
        login(values)
    })} className='form form-auth'>
      <h1 className='form_title'>LogIn</h1>
            <div className='form_group'>
                 <label htmlFor="email" className='form_label'>Email:</label>
                  <input type="email"  className='form_input'{...register('email',{required:true})} />
            </div>
            <div className='form_group'>
                <label htmlFor="password" className='form_label'>Password:</label>
                <input type="password" className='form_input' {...register('password', {required:true})} />
            </div> 
            <button className='btn'>Iniciar sesion</button>
    </form>
</div>
  )
}
