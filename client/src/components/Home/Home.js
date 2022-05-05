import React from 'react'
import { Balance } from './Balance/Balance'
import Form from './Form/Form'
import Latest from './Latest/Latest'
import './Home.css'

const Home = () => {
  return (
    <div className='home'><Balance/><Form/><Latest/></div>
  )
}

export default Home