import React from 'react';
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