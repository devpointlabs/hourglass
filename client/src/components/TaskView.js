import React, { Fragment } from "react";
import {
  Table,
  Header,
  Checkbox,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import axios from "axios";
import TaskForm from "./TaskForm";

class TaskView extends React.Component {
  state = { tasks: [] };

  componentDidMount() {
    const { id } = this.props.project;
    axios
      .get(`/api/${id}/view_tasks`)
      .then(response => this.setState({ tasks: response.data }));
  }

  handleDelete = task => {
    const { id } = this.props.project;
    axios.delete(`/api/tasks/${id}`).then(res => {
      this.setState(previousState => {
        return {
          tasks: previousState.tasks.filter(t => t.id !== task.id)
        };
      });
    });
  };

  showTasks = () => {
    return this.state.tasks.map(task => (
      <Table.Row key={task.id}>
        <Table.Cell>{task.name}</Table.Cell>
        <Table.Cell>{task.description}</Table.Cell>
        <Table.Cell>
          <Checkbox defaultChecked />
        </Table.Cell>
        <Table.Cell>{task.price_per_hour}</Table.Cell>
        <Table.Cell>
          <Button
            circular
            color="violet"
            onClick={this.handleDelete}
            icon="minus"
            size="mini"
          />
        </Table.Cell>
      </Table.Row>
    ));
  };

  // handleDelete = task_id => {
  //   this.setState({ tasks: this.state.tasks.filter(t => task_id !== task_id) });
  // };

  render() {
    return (
      <Fragment>
        <Header as="h1" textAlign="center">
          Tasks
        </Header>

        <Table celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name of Task</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Billable</Table.HeaderCell>
              <Table.HeaderCell>Price per Hour</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.showTasks()}</Table.Body>
        </Table>
        <Modal
          trigger={
            <Button
              circular
              color="violet"
              onClick={this.handleNew}
              icon="add"
              size="mini"
            />
          }
        >
          <Modal.Header>Create a New Task</Modal.Header>
          <Modal.Content>
            <TaskForm />
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}

export default TaskView;
