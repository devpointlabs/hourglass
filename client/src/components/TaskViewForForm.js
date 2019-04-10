import React from "react";

import {
  Segment,
  Button,
  Form,
  Checkbox,
  Icon,
  Table
} from "semantic-ui-react";
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
          <Table.Row key={task.id}>
            <Table.Cell>{task.name}</Table.Cell>
            <Table.Cell>{task.description}</Table.Cell>
            <Table.Cell>{task.price_per_hour}</Table.Cell>
            <Table.Cell>{task.billable ? "Billable" : "Unbillable"}</Table.Cell>
            <Table.Cell>
              <Button
                circular
                color="red"
                onClick={this.handleDelete}
                icon="times"
                size="mini"
              />
              <Button
                circular
                color="blue"
                onClick={this.toggleEdit}
                icon="pencil"
                size="mini"
                style={{ alignItems: "right" }}
              />
            </Table.Cell>
          </Table.Row>
        )}
      </>
    );
  }
}
export default TaskViewForForm;
