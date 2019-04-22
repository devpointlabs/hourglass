import React from 'react';
import { Table, Button, Icon, Form, Checkbox } from "semantic-ui-react"
import axios from 'axios';

class NewTaskTableRow extends React.Component {
  state = {
    editing: false,
    task: this.props.task
  }


  handleEdit = () => {
    this.setState({ editing: true })
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

  handleSubmit = (task_id) => {
    const { project } = this.props
    const { task } = this.state
    axios.put(`/api/projects/${task.project_id}/tasks/${task.task_id}`, { task }).then(res => {
      this.setState({ task: task, editing: false })
    })
  }

  render() {
    const { editing, task } = this.state
    return (
      <>
        <Table.Row key={task.name}>
          <Table.Cell style={{ width: "40%" }}>
            {editing ? <Form.Input
              name="name"
              placeholder="Task Name"
              value={task.name}
              autoFocus
              required
              onChange={this.handleChange}
            /> :
              task.name
            }
          </Table.Cell>
          <Table.Cell
            style={{ borderRight: "solid grey 0.5px", width: "10%" }}
          >
            {task.total_hours ? task.total_hours : 0}
          </Table.Cell>
          <Table.Cell style={{ width: "30%" }}>
            {editing ? <Form.Input
              name="price_per_hour"
              placeholder="Price per hour"
              value={task.price_per_hour}
              required
              onChange={this.handleChange}

            /> :
              parseFloat(task.price_per_hour).toFixed(2)}
          </Table.Cell>
          <Table.Cell style={{ width: "11%" }}>
            {task.total_cost ? "$" + task.total_cost : "$0"}
          </Table.Cell>
          <Table.Cell style={{ width: "15%" }}>
            {editing ? <Button
              circular
              style={{
                background: "RebeccaPurple",
                color: "white"
              }}
              onClick={() => this.handleSubmit(task.task_id)}
              size="mini"
              icon="plus"
            /> : <div>
                <Icon style={{ color: 'grey' }} onClick={() => this.handleEdit()} name="pencil"></Icon>
                <Icon
                  onClick={() =>
                    this.props.handleDelete(task.task_id)
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


export default NewTaskTableRow