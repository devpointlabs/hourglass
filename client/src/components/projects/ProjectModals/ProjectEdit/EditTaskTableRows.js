import React from 'react';
import { Table, Button, Icon, Form, Checkbox } from "semantic-ui-react"
import axios from 'axios';
import EditTaskTableRow from './EditTaskTableRow'

class TaskTableRows extends React.Component {


  render() {
    return (
      <>
        {this.props.tasks.map(task =>
          <EditTaskTableRow uniqueTask={task} handleDelete={this.props.handleDelete} getProjectTasks={this.props.getProjectTasks} />
        )}
      </>
    )
  }
}


export default TaskTableRows