import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext} from '../../context/users/UserContext'
export const Header = () => {
    const {user, logout} = useContext(UserContext)
    const navigate = useNavigate()
    const admin = user? user.admin : false
  return (
    <header className='header'>
        <div className='header_slogan'>
            <h1>Hostal Delicias</h1>
        </div>
        <nav className='header_nav'>
            <ul className='nav_list'>
                <li>
                    <Link className='list_item' to={'/'}>Inicio</Link>
                </li>
                <li>
                    <Link className='list_item' to={'/rooms'}>Habitaciones</Link>
                </li>
                {
                    user?(
                        !admin&&(
                        <li>
                        <Link className='list_item' to={'/misreservas'}>Mis reservas</Link>
                    </li>
                    )
                    ):(
                        <>
                        <li>
                        <Link className='list_item' to={'/login'}>Login</Link>
                    </li>
                    <li>
                        <Link className='list_item' to={'/register'}>Register</Link>
                    </li>
                    </>
                    )
                }
                    {
                        admin?(
                            <li>
                            <Link className='list_item'to={'/admin/crudRooms'}>Crud Rooms</Link>
                        </li>
                        ):(
                            ''
                        )
                    }
        {
            user&&(
                <>
                <div className='header_user'>
                    <img className='user_logout' onClick={()=>{logout(), navigate('/')}} src="https://img.icons8.com/ios-filled/50/1db0e6/x.png"/>
                    <img width="40" height="40" src="https://img.icons8.com/ios-filled/50/1db0e6/user-male-circle.png" alt="user-male-circle"/>
                </div>
                <p className='user_nombre'>{user.apellido}</p>
                </>
               
            )
        }
        </ul>
          </nav>
    </header>
  )
}
