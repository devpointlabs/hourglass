import React from "react";

import { Table, Button, } from "semantic-ui-react";
import axios from "axios";
import AddNewTasks from "./AddNewTasks"


class NewTaskTable extends React.Component {
  state = { tasks: [], project: {} };

  componentDidMount = () => {
    axios.get('/api/getlastproject')
      .then(res => this.setState({ project: res.data }))
  }

  getProjectTasks = () => {
    const { project, } = this.state;
    axios
      .get(`/api/projectdata/${project.id}/tasks_with_data`)
      .then(response => this.setState({ tasks: response.data }));
  };

  showBillableTasks = () => {
    const billableTasks = this.state.tasks.filter(t => t.billable === true);
    return billableTasks.map(task => (
      <Table.Row key={task.task_name}>
        <Table.Cell>{task.task_name}</Table.Cell>
        <Table.Cell style={{ borderRight: "solid grey 0.5px", textAlign: 'center' }}>
          {task.total_hours ? task.total_hours : 0}
        </Table.Cell>
        <Table.Cell style={{ paddingLeft: "200px", }}>
          ${parseFloat(task.price_per_hour).toFixed(2)}
        </Table.Cell>
        <Table.Cell style={{ textAlign: 'center' }}>{task.total_cost ? ('$' + task.total_cost) : '$0'}</Table.Cell>
      </Table.Row>
    ));
  };

  showUnBillableTasks = () => {
    const UnbillableTasks = this.state.tasks.filter(t => t.billable === false);
    return UnbillableTasks.map(task => (
      <Table.Row key={task.task_name}>
        <Table.Cell>{task.task_name}</Table.Cell>
        <Table.Cell style={{ borderRight: "solid grey 0.5px", textAlign: 'center' }}>
          {task.total_hours ? task.total_hours : 0}
        </Table.Cell>
        <Table.Cell style={{ paddingLeft: "200px" }}>
          ${parseFloat(task.price_per_hour).toFixed(2)}
        </Table.Cell>
        <Table.Cell style={{ textAlign: 'center' }}>{task.total_cost ? ('$' + task.total_cost) : '$0'}</Table.Cell>
      </Table.Row>
    ));
  };

  handleSubmit2 = () => {
    this.props.openModal3()
  }

  render() {
    return (
      <>
        <AddNewTasks project={this.state.project} getProjectTasks={this.getProjectTasks} />
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
                <div style={{ textAlign: 'center' }}>Hours</div>
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "450px",
                  fontWeight: "bold",
                  paddingLeft: "200px"
                }}
              >
                Price per Hour
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                <div>Total</div>
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
                Unbillable Tasks
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold"
                }}
              >
                <div style={{ textAlign: 'center' }}>Hours</div>
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "450px",
                  fontWeight: "bold",
                  paddingLeft: "200px"
                }}
              >
                Price per Hour
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                <div>Total</div>
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
        </Table>
        <Button
          floated="left"
          style={{ background: "RebeccaPurple", color: "white" }}
          onClick={() => this.props.closeModal2()}
        >
          Close
            </Button>
        <Button
          floated="right"
          style={{ background: "RebeccaPurple", color: "white" }}
          onClick={() => this.handleSubmit2()}
        >
          Next
            </Button>
      </>
    );
  }
}

export default NewTaskTable;
