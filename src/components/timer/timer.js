import React, { Component } from 'react'
import './timer.css'

export default class Timer extends Component {
  state = {
    showTime: this.props.timer,
  }

  timerId = null

  static convertTime(ms) {
    const totalSeconds = Math.round(ms / 1000)
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

    const startTime = Date.now()
    const endTime = startTime + this.state.showTime
    this.timerId = setInterval(() => {
      const nowTime = Date.now()
      const remainingTime = endTime - nowTime
      if (remainingTime <= 1000) {
        clearInterval(this.timerId)
        this.timerId = null
        this.setState({ showTime: 0 })
      } else {
        this.setState({ showTime: remainingTime })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
    this.timerId = null
  }

  onPausedTimer = () => {
    clearInterval(this.timerId)
    this.timerId = null
  }

  render() {
    return (
      <span className="timer">
        <button className="icon icon-play " onClick={this.onStartTimer}></button>
        <button className="icon icon-pause" onClick={this.onPausedTimer}></button>

        {Timer.convertTime(this.state.showTime)}
      </span>
    )
  }
}
