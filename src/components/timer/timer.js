import React, { Component } from 'react'
import './timer.css'

export default class Timer extends Component {
  state = {
    timer: this.props.timer,
  }

  timerId = null

  static convertTime(ms) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    const paddedMinutes = String(minutes).padStart(2, '0')
    const paddedSeconds = String(seconds).padStart(2, '0')

    return `${paddedMinutes}:${paddedSeconds}`
  }

  onStartTimer = () => {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
    this.timerId = setInterval(() => {
      this.setState(({ timer }) => {
        if (timer <= 1000) {
          clearInterval(this.timerId)
          this.timerId = null
          return { timer: 0 }
        }
        return { timer: timer - 1000 }
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
    this.timerId = null
  }

  onPausedTimer = () => {
    console.log(this.timerId)
    clearInterval(this.timerId)
    this.timerId = null
  }

  render() {
    return (
      <span className="timer">
        <button className="icon icon-play " onClick={this.onStartTimer}></button>
        <button className="icon icon-pause" onClick={this.onPausedTimer}></button>

        {Timer.convertTime(this.state.timer)}
      </span>
    )
  }
}
