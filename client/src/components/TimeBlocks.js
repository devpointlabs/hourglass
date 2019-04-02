import React from 'react';
import { AuthConsumer } from '../providers/AuthProvider'
import { Table } from 'semantic-ui-react'
import TimeBlock from './TimeBlock'

class TimeBlocks extends React.Component {
  state = {timeBlocks: [{start_time: 'Today', end_time: 'Tommorow', billable: '20', unbillable: '10', project_id: 2, user_id: 2, id: 1}]}

  render () {
    return (
      <div>
        <Table basic='very' celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Start Time</Table.HeaderCell>
              <Table.HeaderCell>End Time</Table.HeaderCell>
              <Table.HeaderCell>Total Time</Table.HeaderCell>
              <Table.HeaderCell>Billable Hours</Table.HeaderCell>
              <Table.HeaderCell>UnBillable Hours</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.timeBlocks.map( t => 
            <TimeBlock key={t.id} data={t}/>
            ) }
          </Table.Body>
        </Table>

      </div>

    )
  }
}

const ConnectedTimeBlocks = (props) => (
  <AuthConsumer>
    {auth => 
      <TimeBlocks auth = {auth} {...props} />
    
    }

  </AuthConsumer>
)


export default ConnectedTimeBlocks;