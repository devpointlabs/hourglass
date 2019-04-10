import React from "react";
import { Segment, Button, Form, Checkbox, Icon } from "semantic-ui-react";
import axios from "axios";
import TaskForm from "./TaskForm";

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

  resetEditing = () => {
    this.setState({ editing: false });
  };

  render() {
    const { task } = this.props;
    const { name, billable, description, price_per_hour } = this.props.task;
    return (
      <>
        {this.state.editing ? (
          <Segment>
            <TaskForm
              resetEditing={this.resetEditing}
              resetState={this.props.resetState}
              task={this.props.task}
              project_id={this.props.project_id}
              editing={this.state.editing}
            />
          </Segment>
        ) : (
          <div>
            <Segment>
              <Button color="red" onClick={this.handleDelete}>
                <Icon name="times" />{" "}
              </Button>
              <Button color="blue" onClick={this.toggleEdit}>
                <Icon name="pencil" />
              </Button>
              {task.name} || ${task.price_per_hour}/hr || {task.description} ||{" "}
              {task.billable ? "Billable" : "Unbillable"}
            </Segment>
          </div>
        )}
      </>
    );
  }
}
export default TaskViewForForm;
