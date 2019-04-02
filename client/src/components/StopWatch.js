import React from 'react';
import { Button, Header } from 'semantic-ui-react'
import moment from 'moment'

class StopWatch extends React.Component {
  state = {timeTotal: '',
           startTimeFull: '',
           endTimeFull: '',
           timeEntry: {startEntry: '', endEntry: '', totalTime: ''}}


  startButton = () => {
  const createNewDate = new moment()
  this.setState({startTimeFull: createNewDate})
  //   //The Start Button should not be able to setState if the stopButton has not been clicked
  // axios post start time to entry object
}

stopButton = () => {
  const createNewDate = new moment()
  this.setState({endTimeFull: createNewDate}, () => this.calculateTimeTotal())
  //   //prevent stop button from triggering if startButton value is null
  // axios get start time,
  // calculate difference
  // axios put difference, and end time to entry object
}

  calculateTimeTotal = () => {
    const newTimeTotal = moment.utc(moment.duration(this.state.endTimeFull.diff(this.state.startTimeFull)).asMilliseconds()).format('HH:mm:ss')
    this.setState({timeTotal: newTimeTotal}, () => this.createTimeEntry())
  }
        
  createTimeEntry = () => {
    const start = this.state.startTimeFull
    const end = this.state.endTimeFull
    this.setState({timeEntry: {startEntry: start, endEntry: end, timeEntry: this.state.timeTotal}})
    //setState for startTime and endTime to Null when you create a time entry

  }

 



  render () {
    const { startTimeFull, endTimeFull, timeTotal } = this.state
   
    return (
      <Header as="h1" style={{textAlign: 'center'}}>
      PlaceHolder Project Name: 
        <br />
        Total Time:
        {timeTotal}
        <br />
        <Button color="green" size="mini" onClick={() => this.startButton()}>Start</Button>
        <Button color="red" size="mini" onClick={() => this.stopButton()}>Stop</Button>
        <div>
          Start Time
          <br />
            {moment(startTimeFull).format('HH:mm:ss')}
          <br />
          End Time
          <br />
          {moment(endTimeFull).format('HH:mm:ss')}
        </div>
      </Header>
    )
  }
}

export default StopWatch;

