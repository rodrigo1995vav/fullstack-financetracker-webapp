import React from 'react'
import { Balance } from './Balance/Balance'
import Latest from './Latest/Latest'
import './MyBalance.css'

const MyBalance = () => {
  return (
    <div className='container'><Balance/><Latest/></div>
  )
}

export default MyBalance