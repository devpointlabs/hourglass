import React from "react";
import { Form, Button, Header, Checkbox, Icon } from "semantic-ui-react";
import axios from "axios";
import UsersArray from "./UsersArray";

class TaskForm extends React.Component {
  state = {
    task: {
      name: "",
      description: "",
      billable: false,
      price_per_hour: "",
      id: ""
    },
    usersShown: false
  };

  //   if (this.props.task.id)
  //   { componentDidMount = () => {
  //     this.setState({task: this.props.task})
  //   }}
  //   else null

  //   handleSubmit = () => {
  //     const { task } = this.state;
  //     const { project_id } = this.props;
  //     axios.post(`/api/projects/${project_id}/tasks`, { task }).then(res => {
  //       this.props.resetState(res.data);
  //     });

  //     or
  // const {task} = this.state;
  // const {project_id} = this.props
  //     axios.put(`/api/projects/${project_id}/tasks/${task.id}`, {task}).then(res => {
  //       this.props.resetState(res.data);
  //   };

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
            <Button color="violet" onClick={() => this.handleSubmit()}>
              <Icon name="plus" />
            </Button>
          </Form.Group>
        </Form>
        <UsersArray project_id={this.props.project_id} />
      </>
    );
  }
}

export default TaskForm;
