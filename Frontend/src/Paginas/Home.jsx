import React from 'react'
import bgHome from '../assets/bg-home.jpeg'
import {Link} from 'react-router-dom'
export const Home = () => {
  return (
    <div className='home'>
      <div className='home_containerImg'>
        <img src={bgHome} alt="" />
      </div>
      <div className='home_info'>
        <h1>Bienvenidos</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit sequi ipsum hic totam. Nostrum dicta minus, eos optio sint ratione laborum sapiente consequuntur, quibusdam eligendi nihil similique, voluptatum voluptatibus. Cum?</p>
        <Link to={'/rooms'} className='btn btn-home'>Rooms</Link>
      </div>
    </div>
  )
}
