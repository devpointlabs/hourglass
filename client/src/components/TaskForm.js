import React from "react";

import { Form, Button, Header, Checkbox } from "semantic-ui-react";
import axios from "axios";
import UsersArray from "./UsersArray";


class TaskForm extends React.Component {
  state = {
    task: { name: "", description: "", billable: false, price_per_hour: "" },
    usersShown: false
  };

  toggleUsers = () => (
    this.setState({
      usersShown: { ...this.state, usersShown: !this.state.usersShown }
    }),
    this.handleSubmit()
  );

  handleSubmit = () => {
    const { task } = this.state;
    const { project_id } = this.props;
    axios.post(`/api/projects/${project_id}/tasks`, { task }).then(res => {
      this.props.resetState(res.data);
    });
  };

  handleBillable = () => {
    this.setState({
      task: { ...this.state.task, billable: !this.state.task.billable }
    });
  };

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ task: { ...this.state.task, [name]: value } });
  };

  render() {
    const { name, description, price_per_hour } = this.state.task;
    return (
      <>
        <Form>
          <Form.Group>
            <Form.Input
              name="name"
              label="Name"
              placeholder="Task Name"
              value={name}
              autofocus
              required
              onChange={this.handleChange}
            />

            <Form.Input
              name="price_per_hour"
              label="Price per hour"
              placeholder="Price per hour"
              value={price_per_hour}
              required
              onChange={this.handleChange}
            />

            <Form.Input
              name="description"
              label="Description"
              placeholder="Description"
              value={description}
              onChange={this.handleChange}
            />
            <Checkbox label="Billable" onClick={this.handleBillable} />
            <Button onClick={() => this.handleSubmit()}>Add Task</Button>
          </Form.Group>
        </Form>
        <UsersArray project_id={this.props.project_id} />
      </>
    );
  }
}

export default TaskForm;
