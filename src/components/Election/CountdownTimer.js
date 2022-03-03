import React, { useEffect, useState } from 'react'

class CountdownTimer extends React.Component {
  state = {
    remaining: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    isExpired: false,
  }
  // used to set and clear interval
  timer
  // used to calculate the distance between "current date and time" and the "target date and time"
  distance

  componentDidMount() {
    this.setDate()
    this.counter()
  }

  setDate = () => {
    const { time } = this.props,
      // Get todays date and time
      now = new Date().getTime(),
      // Set the date we're counting down to
      countDownDate = new Date(time).getTime()

    // Find the distance between now and the count down date
    this.distance = countDownDate - now

    // target date and time is less than current date and time
    if (this.distance < 0) {
      clearInterval(this.timer)
      this.setState({ isExpired: true })
    } else {
      let time_data = {
        days: Math.floor(this.distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((this.distance % (1000 * 60)) / 1000),
      }
      if (time_data.days < 10) {
        time_data.days = '0' + time_data.days
      }
      if (time_data.hours < 10) {
        time_data.hours = '0' + time_data.hours
      }
      if (time_data.minutes < 10) {
        time_data.minutes = '0' + time_data.minutes
      }
      if (time_data.seconds < 10) {
        time_data.seconds = '0' + time_data.seconds
      }
      this.setState({
        remaining: {
          ...time_data,
        },
        isExpired: false,
      })
    }
  }

  counter = () => {
    this.timer = setInterval(() => {
      this.setDate()
    }, 1000)
  }
  render() {
    const { remaining, isExpired } = this.state
    return (
      <>
        {!isExpired ? (
          <h3>
            {remaining.days}:{remaining.hours}:{remaining.minutes}:
            {remaining.seconds}
          </h3>
        ) : (
          <h3>Election Ended</h3>
        )}
      </>
    )
  }
}

export default CountdownTimer
