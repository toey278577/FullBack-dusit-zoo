import React, { Component } from 'react'
import logo from '../../imges/dusit-zoo-logo.png';
import './home_cpnt.css'
export default class Home extends Component {
  render() {
    return (
      <div className='text101'>
          <img src={logo} alt="Dusit Logo" className='login-logo' />
          <h1>ยินดีตอนรับพนักงานทุกท่าน</h1>
          <h1>ขอให้ทำงานอย่างมีความสุข</h1>
      </div>
    )
  }
}
