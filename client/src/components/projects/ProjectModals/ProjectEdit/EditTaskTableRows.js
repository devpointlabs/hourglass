import React from 'react';
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