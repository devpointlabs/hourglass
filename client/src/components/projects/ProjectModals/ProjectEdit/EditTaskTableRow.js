import React from 'react';
import { Table, Button, Icon, Form } from "semantic-ui-react"
import axios from 'axios';

class TaskTableRow extends React.Component {
  state = {
    editing: false,
    task: this.props.uniqueTask
  }


  handleEdit = (uniqueTask) => {
    this.setState({ editing: true, task: uniqueTask })
  }

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ task: { ...this.state.task, [name]: value } });
  };

  handleBillable = () => {
    this.setState({
      checkboxStatus: !this.statecheckboxStatus,
      task: { ...this.state.task, billable: !this.state.task.billable }
    });
  };

  handleSubmit = () => {
    const { task } = this.state
    axios.put(`/api/projects/${task.project_id}/tasks/${task.task_id}`, { task }).then(res => {
      this.setState({ task: task, editing: false }, () => this.props.getProjectTasks())
    })

  }

  render() {
    const { editing, task } = this.state
    const { uniqueTask } = this.props
    return (
      <>
        <Table.Row key={uniqueTask.name}>
          <Table.Cell style={{ width: "40%" }}>
            {editing ? <Form.Input
              name="name"
              placeholder="Task Name"
              value={task.name}
              autoFocus
              required
              onChange={this.handleChange}
            /> :
              uniqueTask.name
            }
          </Table.Cell>
          <Table.Cell
            style={{ borderRight: "solid grey 0.5px", width: "10%" }}
          >
            {task.total_hours ? parseFloat(task.total_hours).toFixed(2) : 0}
          </Table.Cell>
          <Table.Cell style={{ width: "30%" }}>
            {editing ? <Form.Input
              name="price_per_hour"
              placeholder="Price per hour"
              value={task.price_per_hour}
              required
              onChange={this.handleChange}
              type="number"

            /> :
              parseFloat(uniqueTask.price_per_hour).toFixed(2)}
          </Table.Cell>
          <Table.Cell style={{ width: "11%" }}>
            {uniqueTask.total_cost ? uniqueTask.total_cost : "$0"}
          </Table.Cell>
          <Table.Cell style={{ width: "15%" }}>
            {editing ? <Button
              circular
              style={{
                background: "RebeccaPurple",
                color: "white"
              }}
              onClick={() => this.handleSubmit(uniqueTask.task_id)}
              size="mini"
              icon="plus"
            /> : <div>
                <Icon style={{ color: 'grey' }} onClick={() => this.handleEdit(uniqueTask)} name="pencil"></Icon>
                <Icon
                  onClick={() =>
                    this.props.handleDelete(uniqueTask.task_id)
                  }
                  name="trash alternate"
                  style={{ color: "RebeccaPurple", paddingLeft: '10px' }}
                />
              </div>}
          </Table.Cell>
        </Table.Row>
      </>
    )
  }
}


export default TaskTableRow