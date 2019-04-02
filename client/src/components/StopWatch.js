import React from 'react';
import { Button, Header } from 'semantic-ui-react'
import moment from 'moment'
import axios from 'axios';

class StopWatch extends React.Component {
  state = {timeTotal: '',
           startTime: '',
           endTime: '',
           timeEntry: {startEntry: '', endEntry: '', totalTime: ''}}


  startButton = () => {
  const createNewDate = new moment()
    axios.post('/api', createNewDate)
      .then( res => {
        this.setState({startTime: res.data})
      })
  //   //The Start Button should not be able to setState if the stopButton has not been clicked
  // axios post start time to entry object
}

  stopButton = () => {
    const createNewDate = new moment()
      axios.put('/api', {end_time: createNewDate, billable: '', unbillable: '',})
        .then( res => {

        })
  this.setState({endTime: createNewDate}, () => this.calculateTimeTotal())
  //   //prevent stop button from triggering if startButton value is null
  // axios get start time,
  // calculate difference
  // axios put difference, and end time to entry object
}

  calculateTimeTotal = () => {
    const newTimeTotal = moment.utc(moment.duration(this.state.endTime.diff(this.state.startTime)).asMilliseconds()).format('HH:mm:ss')
    this.setState({timeTotal: newTimeTotal}, () => this.createTimeEntry())
  }
        
  createTimeEntry = () => {
    const start = this.state.startTime
    const end = this.state.endTime
    this.setState({timeEntry: {startEntry: start, endEntry: end, timeEntry: this.state.timeTotal}})
    //setState for startTime and endTime to Null when you create a time entry

  }

 



  render () {
    const { startTime, endTime, timeTotal } = this.state
   
    return (
      <Header as="h1" style={{textAlign: 'center'}}>
        {timeTotal}
        <br />
        <Button color="green" size="mini" onClick={() => this.startButton()}>Start</Button>
        <Button color="red" size="mini" onClick={() => this.stopButton()}>Stop</Button>
        <div>
       
        </div>
      </Header>
    )
  }
}

export default StopWatch;

