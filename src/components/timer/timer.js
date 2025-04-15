import React from 'react'
import './timer.css'

function convertTime(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const paddedMinutes = String(minutes).padStart(2, '0')
  const paddedSeconds = String(seconds).padStart(2, '0')

  return `${paddedMinutes}:${paddedSeconds}`
}

const Timer = ({ timer, onStartTimer, onPausedTimer }) => (
  <span className="timer">
    <button className="icon icon-play " onClick={onStartTimer}></button>
    <button className="icon icon-pause" onClick={onPausedTimer}></button>
    {convertTime(timer)}
  </span>
)

export default Timer
