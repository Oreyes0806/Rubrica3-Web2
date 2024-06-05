import React, { useContext } from 'react'
import {Routes , Route, Navigate} from 'react-router-dom'
import { UserContext } from './context/users/UserContext'
import {Register} from './componentes/Login-Register/Register'
import {Login} from './componentes/Login-Register/Login'
import { Header } from './componentes/header/Header'
import { Home } from './Paginas/Home'
import { Rooms } from './Paginas/Rooms'
import { CrudRoom } from './Paginas/CrudRoom'
import { MisReservaciones } from './Paginas/MisReservaciones'
import { Footer } from './componentes/Footer/Footer'
export const ConfigRoutes = () => {
  const {user} = useContext(UserContext)
  const admin = user ? user.admin : false;
  return (
    <>
        <Header/>
          <Routes>
            <Route path='/' index element={<Home/>}/>
            <Route path='/register' element={!user?<Register/>: <Navigate to={'/'}/>}/>
            <Route path='/login'  element={!user?<Login/>: <Navigate to={'/'}/>}/>
            <Route path='/admin/crudRooms' element={admin?<CrudRoom/>: <Navigate to={'/'}/>}/> 
            <Route path='/rooms' element={<Rooms/>}/> 
            <Route path='/misreservas' element={user?<MisReservaciones/>:<Navigate to={'/login'}/>}/> 
          </Routes>
        <Footer/>
    </>
  )
}
