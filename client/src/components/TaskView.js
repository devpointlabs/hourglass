import React, { Fragment } from "react";
import TimeblocksByTask from "./TimeblocksByTask";

import {
  Table,
  Header,
  Checkbox,
  Button,
  Icon,
  Modal,
  Accordian
} from "semantic-ui-react";
import axios from "axios";
import TaskForm from "./TaskForm";

import AddTask from "./AddTask";

class TaskView extends React.Component {
  state = { tasks: [], showForm: false };

  componentDidMount() {
    const { id } = this.props.project;
    axios
      .get(`/api/projects/${id}/tasks`)
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

  showBillableTasks = () => {
    const billableTasks = this.state.tasks.filter(t => t.billable === true);
    return billableTasks.map(task => (
      <Table.Row key={task.id}>
        <Table.Cell>{task.name}</Table.Cell>
        <Table.Cell style={{ borderRight: "solid grey 0.5px" }}>
          Total Hours
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
        <Table.Cell>Billable Ammount</Table.Cell>
      </Table.Row>
    ));
  };

  // handleDelete = task_id => {
  //   this.setState({ tasks: this.state.tasks.filter(t => task_id !== task_id) });
  // };

  showUnBillableTasks = () => {
    const UnbillableTasks = this.state.tasks.filter(t => t.billable === false);
    return UnbillableTasks.map(task => (
      <Table.Row key={task.id}>
        <Table.Cell>{task.name}</Table.Cell>
        <Table.Cell style={{ borderRight: "solid grey 0.5px" }}>
          Total Hours
        </Table.Cell>
        <Table.Cell>{task.price_per_hour}</Table.Cell>
        <Table.Cell>Billable Ammount</Table.Cell>
      </Table.Row>
    ));
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  render() {
    return (
      <>
        <Header as="h1" textAlign="center">
          Tasks
        </Header>
        <Table>
          <Table.Header>
            <Table.Row style={{ background: "#e2e2e2" }}>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "450px",
                  fontWeight: "bold"
                }}
              >
                Billable Tasks
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold"
                }}
              >
                Total
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "450px",
                  fontWeight: "bold"
                }}
              >
                Price per Hour
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold"
                }}
              >
                Billable Amount
              </Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colspan="4" />
            </Table.Row>
            {this.showBillableTasks()}
          </Table.Body>
          <Table.Row>
            <Table.Cell colspan="6" />
          </Table.Row>
        </Table>
        <Table>
          <Table.Header>
            <Table.Row style={{ background: "#e2e2e2" }}>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "450px",
                  fontWeight: "bold"
                }}
              >
                UnBillable Tasks
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold"
                }}
              >
                Total
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "450px",
                  fontWeight: "bold"
                }}
              >
                Price per Hour
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold"
                }}
              >
                Billable Amount
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell colspan="4" />
            </Table.Row>
            {this.showUnBillableTasks()}
          </Table.Body>

          <Table.Row>
            <Table.Cell colspan="4" />
          </Table.Row>
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
      </>
    );
  }
}

export default TaskView;
