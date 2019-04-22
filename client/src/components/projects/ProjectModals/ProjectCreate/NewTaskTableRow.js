import React from 'react';
import {Table, Button, Icon, Form, Checkbox} from "semantic-ui-react"
import axios from 'axios';

class NewTaskTableRow extends React.Component {
  state = {editing: false,
  task: this.props.task }

  handleEdit = () => {
    this.setState({editing: true})
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
    const {project} = this.props
    const {task} = this.state
    axios.put(`/api/projects/${project.id}/tasks/${task.task_id}`, {task} ).then(res => {
      debugger
     this.setState({task: res.data, editing: false})
    })
  }

  render() {
    const {editing, task} = this.state
    return (
      <>  
       <Table.Row key={task.name}>
        <Table.Cell>
        {editing ? <Form.Input
              name="name"
              label="Name"
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
          style={{ borderRight: "solid grey 0.5px", textAlign: "center" }}
        >
          {task.total_hours ? task.total_hours : 0}
        </Table.Cell>
        <Table.Cell style={{ paddingLeft: "200px" }}>
        {editing? <Form.Input
              name="price_per_hour"
              label="Price per hour"
              placeholder="Price per hour"
              value={task.price_per_hour}
              required
              onChange={this.handleChange}
            /> :
          parseFloat(task.price_per_hour).toFixed(2)  }
        </Table.Cell>
        <Table.Cell style={{ textAlign: "center" }}>
          {task.total_cost ? "$" + task.total_cost : "$0"}
        </Table.Cell>
        <Table.Cell>
          {editing ?   <Button
              circular
              style={{
                marginTop: "20px",
                background: "RebeccaPurple",
                color: "white"
              }}
              onClick={() => this.handleSubmit(task.task_id)}
              size="mini"
              icon="plus"
            /> : <div>
          <Button onClick={()=>this.props.handleDelete(task.task_id)}icon="times" color="black" size="mini" circular></Button>
          <Button style={{backgroundColor: "RebeccaPurple", color: "white"}} onClick={()=>this.handleEdit()}icon="pencil"  size="mini" circular></Button>
            </div> }
        </Table.Cell>
      </Table.Row>
</>
    )}
}
const styles = {
  modal: {
    position: "relative",
    maxWidth: "100%",
    textAlign: "center",
    padding: "20px"
  }
}

export default NewTaskTableRow