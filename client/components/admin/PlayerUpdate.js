import React, { Component } from 'react'
import axios from 'axios'

class PlayerUpdate extends Component {
  constructor() {
    super()
    this.state = {
      major: 'masters',
      url: ''
    }

    this.handleMajorChange = this.handleMajorChange.bind(this)
    this.handleUrlChange = this.handleUrlChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleMajorChange(evt) {
    this.setState({
      major: evt.target.value
    })
  }

  handleUrlChange(evt) {
    this.setState({
      url: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    try {
      console.log('Sent a POST to /api/admin/players')
      const res = await axios.post('/api/admin/players', {
        major: this.state.major,
        url: this.state.url
      })
      console.log('response =', res)
    } catch (err) {
      console.log(err)
    }

  }

  render() {
    console.log('major =', this.state.major)
    console.log('url =', this.state.url)
    return (
      <div id="player-update">
        <br />
        <h2>Player Update</h2>
        <form onSubmit={this.handleSubmit}>
          <select name="major" value={this.state.major} onChange={this.handleMajorChange}>
            <option value="masters">Masters</option>
            <option value="usOpen">US Open</option>
            <option value="theOpen">The Open</option>
            <option value="pgaChamp">PGA Champ</option>
          </select>
          <label>
            URL:
            <input type="text" name="url" value={this.state.url} onChange={this.handleUrlChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div >
    )
  }
}

export default PlayerUpdate
