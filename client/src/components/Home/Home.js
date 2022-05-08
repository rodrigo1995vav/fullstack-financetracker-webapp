import React from 'react'
import { Balance } from './Balance/Balance'
import Latest from './Latest/Latest'
import './Home.css'

const Home = () => {
  return (
    <div className='home'><Balance/><Latest/></div>
  )
}

export default Home