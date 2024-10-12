import React, { Component } from 'react'

import './navbar_cpnt.css'
import Logo from '../../imges/dusit-zoo-logo.png'

export default class Navbar extends Component {
  render() {
    return (
      <div className="menu-nav" >
        <div className="userstatus">
          <a href='/home_cpnt.js'><img src={Logo} alt="" /></a>
          <h5>duzoo@admin</h5>
          <p>Admin</p>
        </div>
        <hr className="hr" />
        <div className="menuEmployee">
          <ul>
            <li>
              <a href='/animals'>จัดการข้อมูลสัตว์</a>
            </li>
            <li>
            <a href='/animal-types'>จัดการข้อมูลประเภทสัตว์</a>
            </li>
            <li>
            <a href='/users'>จัดการข้อมูลผู้ใช้</a>
            </li>

            <li>
            <a href='/logout'>ออกจากระบบ</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
