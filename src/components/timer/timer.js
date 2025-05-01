import React, { useState, useRef, useEffect } from 'react'
import './timer.css'

const Timer = ({ timer }) => {
  const [showTime, setShowTime] = useState(timer)
  const timerIdRef = useRef(null)

  const convertTime = (ms) => {
    const totalSeconds = Math.round(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    const paddedMinutes = String(minutes).padStart(2, '0')
    const paddedSeconds = String(seconds).padStart(2, '0')

    return `${paddedMinutes}:${paddedSeconds}`
  }

  const onStartTimer = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current)
    }

    const startTime = Date.now()
    const endTime = startTime + showTime
    timerIdRef.current = setInterval(() => {
      const nowTime = Date.now()
      const remainingTime = endTime - nowTime
      if (remainingTime <= 1000) {
        clearInterval(timerIdRef.current)
        timerIdRef.current = null
        setShowTime(0)
      } else {
        setShowTime(remainingTime)
      }
    }, 1000)
  }

  const onPausedTimer = (e) => {
    e.stopPropagation()

    clearInterval(timerIdRef.current)
    timerIdRef.current = null
  }

  useEffect(() => () => clearInterval(timerIdRef.current), [])

  return (
    <span className="timer">
      <button className="icon icon-play " onClick={onStartTimer}></button>
      <button className="icon icon-pause" onClick={onPausedTimer}></button>

      {convertTime(showTime)}
    </span>
  )
}

export default Timer
