import React from 'react';
import { Table, Button, Icon, Form, Checkbox } from "semantic-ui-react"
import axios from 'axios';
import NewTaskTableRow from './NewTaskTableRow'

class NewTaskTableRows extends React.Component {


  render() {
    return (
      <>
        {this.props.tasks.map(task =>
          <NewTaskTableRow uniqueTask={task} handleDelete={this.props.handleDelete} getProjectTasks={this.props.getProjectTasks} />
        )}
      </>
    )
  }
}


export default NewTaskTableRows