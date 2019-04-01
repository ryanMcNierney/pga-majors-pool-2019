import React, { Component } from 'react'
import axios from 'axios'

// firebase
if (process.env.NODE_ENV !== 'production') require('../../../.env')
import { fb } from '../../../server/firebase'

class LiveData extends Component {
  constructor() {
    super()
    this.state = {
      liveData: false,
      lastPull: ''
    }

    this.handleClickON = this.handleClickON.bind(this)
    this.handleClickOFF = this.handleClickOFF.bind(this)
  }

  componentDidMount() {
    // const archiveRef = fb.ref('masters/archive')
    // archiveRef.on('value', snapshot => {
    //   const archive = snapshot.val()
    //   console.log('archive', archive)
    // })
  }

  async handleClickON() {
    try {
      // call api to turn data on
      console.log('Turning live-data ON')
      await axios.get('/api/liveData/on')
      this.setState({ liveData: true })
    } catch (e) {
      console.log('Error starting live data')
    }
  }

  async handleClickOFF() {
    try {
      // call api to turn data on
      console.log('Turning live-data OFF')
      await axios.get('/api/liveData/off')
      this.setState({ liveData: false })
    } catch (e) {
      console.log('Error starting live data')
    }
  }

  render() {
    const { liveData, lastPull } = this.state
    return (
      <div id="live-data">
        <h2>Live Data</h2>
        <div id="timer">
          {
            liveData
              ? <p>Data is ON - Last pull at {lastPull}</p>
              : <p>Data is OFF - last pull at {lastPull}</p>
          }
        </div>
        <div id="live-data-buttons">
          <button type="button" id="live-data-on" onClick={this.handleClickON}>DATA ON</button>
          <button type="button" id="live-data-off" onClick={this.handleClickOFF}>DATA OFF</button>
        </div>
      </div >
    )
  }
}

export default LiveData
