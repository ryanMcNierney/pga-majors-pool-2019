import React, { Component } from 'react'
import LiveData from './LiveData'
import './admin.css'

class Admin extends Component {
  render() {
    return (
      <div id="admin">
        ADMIN Page
        <LiveData />
      </div>
    )
  }
}

export default Admin
