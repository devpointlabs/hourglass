import React from "react";
import { Segment, Button, Form, Checkbox, Icon } from "semantic-ui-react";
import axios from "axios";

class TaskViewForForm extends React.Component {
  state = [
    { editing: false },
    { newTask: { name: "", description: "", price_per_hour: "", billable: "" } }
  ];

  toggleEdit = () => this.setState({ editing: !this.state.editing });

  handleDelete = () => {
    const { task } = this.props;
    axios.delete(`/api/tasks/${task.id}`);
    this.props.removeTask(task.id);
  };

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ newTask: { ...this.state.newTask, [name]: value } });
  };

  render() {
    const { task } = this.props;
    const { name, billable, description, price_per_hour } = this.props.task;
    return (
      <>
        {" "}
        <Segment>
          <Button
            style={{ borderRadius: "100%" }}
            color="red"
            icon="times"
            size="tiny"
            onClick={() => this.handleDelete(task.id)}
          />
          <Button
            style={{ borderRadius: "100%" }}
            color="blue"
            icon="pencil"
            size="tiny"
            onClick={() => this.toggleEdit()}
          />
          {this.state.editing ? (
            <Form>
              <Form.Group>
                <Form.Input
                  name="name"
                  label="Name"
                  placeholder={name}
                  value={this.state.newTask.name}
                  autofocus
                  required
                  onChange={this.handleChange}
                />

                <Form.Input
                  name="price_per_hour"
                  label="Price per hour"
                  placeholder={price_per_hour}
                  value={this.state.newTask.price_per_hour}
                  required
                  onChange={this.handleChange}
                />

                <Form.Input
                  name="description"
                  label="Description"
                  placeholder={description}
                  value={this.state.newTask.description}
                  onChange={this.handleChange}
                />
                <Checkbox label="Billable" onClick={this.handleBillable} />
                <Button color="violet" onClick={() => this.submitEdit()}>
                  <Icon name="plus" />
                </Button>
              </Form.Group>
            </Form>
          ) : (
            <div>
              {" "}
              {task.name} || ${task.price_per_hour}/hr || {task.description} ||{" "}
              {task.billable ? "Billable" : "Unbillable"}
            </div>
          )}
        </Segment>
      </>
    );
  }
}
export default TaskViewForForm;
