import React, { Fragment } from "react";
import TaskForm from "./TaskForm";
import { Table, Header, Button, Modal, Accordion } from "semantic-ui-react";
import axios from "axios";
import AddTask from "./AddTask";

class TaskView extends React.Component {
  state = { tasks: [] };

  componentDidMount() {
    this.getProjectTasks();
  }

  // componentDidUpdate = (prevState) => {
  //   if (prevState.modalOpen !== this.state.modalOpen)
  //     this.getProjectTasks()
  // }

  getProjectTasks = () => {
    const { project } = this.props;
    axios
      .get(`/api/projects/${project.id}/tasks`)
      .then(response => this.setState({ tasks: response.data }));
  };

  showBillableTasks = () => {
    const billableTasks = this.state.tasks.filter(t => t.billable === true);
    return billableTasks.map(task => (
      <Table.Row key={task.id}>
        <Table.Cell>{task.name}</Table.Cell>
        <Table.Cell style={{ borderRight: "solid grey 0.5px" }}>
          Total Hours
        </Table.Cell>
        <Table.Cell style={{ paddingLeft: '200px' }}>${parseFloat(task.price_per_hour).toFixed(2)}</Table.Cell>
        <Table.Cell>Billable Ammount</Table.Cell>
      </Table.Row>
    ));
  };

  showUnBillableTasks = () => {
    const UnbillableTasks = this.state.tasks.filter(t => t.billable === false);
    return UnbillableTasks.map(task => (
      <Table.Row key={task.id}>
        <Table.Cell>{task.name}</Table.Cell>
        <Table.Cell style={{ borderRight: "solid grey 0.5px" }}>
          Total Hours
        </Table.Cell>
        <Table.Cell style={{ paddingLeft: '200px' }}>${parseFloat(task.price_per_hour).toFixed(2)}</Table.Cell>
        <Table.Cell>Billable Ammount</Table.Cell>
      </Table.Row>
    ));
  };

  render() {
    return (
      <>
        <Header as="h1">Tasks</Header>
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
                Hours
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "450px",
                  fontWeight: "bold",
                  paddingLeft: '200px'
                }}
              >
                Price per Hour
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold",
                  textAlign: 'center'

                }}
              >
                <div>Total</div>
                0
              </Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan="4" />
            </Table.Row>
            {this.showBillableTasks()}
            <Table.Row>
              <Table.Cell colSpan="6" />
            </Table.Row>
          </Table.Body>
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
                Hours
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "450px",
                  fontWeight: "bold",
                  paddingLeft: '200px'
                }}
              >
                Price per Hour
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold",
                  textAlign: 'center'
                }}
              >
                <div>Total</div>
                0
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan="4" />
            </Table.Row>
            {this.showUnBillableTasks()}
            <Table.Row>
              <Table.Cell colSpan="4" />
            </Table.Row>
          </Table.Body>
          <Table.Header >
            <Table.Row style={{ background: "#e2e2e2" }}>
              <Table.Cell colSpan='3' />
              <Table.Cell style={{
                fontSize: "1.1em",
                width: "100px",
                fontWeight: "bold",
                textAlign: 'center'
              }}>
                <div>Total</div>
                0
              </Table.Cell>
            </Table.Row>
          </Table.Header>
        </Table>
        <AddTask project={this.props.project} />
        <br />
        <br />
      </>
    );
  }
}

export default TaskView;
