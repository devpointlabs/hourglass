import React, { Fragment } from "react";
import TaskForm from "./TaskForm";
import { Table, Header, Button, Modal, Accordion } from "semantic-ui-react";
import axios from "axios";
import AddTask from "./AddTask";

class TaskView extends React.Component {
  state = { tasks: [], billableTotals: {}, unbillableTotals: {} };

  componentDidMount() {
    this.getProjectTasks();
  }

  getProjectTasks = () => {
    const { project, } = this.props;
    axios
      .get(`/api/projectdata/${project.project_id}/tasks_with_data`)
      .then(response => this.setState({ tasks: response.data }));
    axios
      .get(`/api/billable/${project.project_id}`)
      .then(response => {
        const billable = response.data.filter(b => b.billable && b)
        const unbillable = response.data.filter(b => {
          if (b.billable === false)
            return b
        })
        this.setState({
          billableTotals: billable[0],
          unbillableTotals: unbillable[0]
        })
      })
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
                <div style={{ textAlign: 'center' }}>Hours</div>
                <div
                  style={{ textAlign: 'center' }}
                >
                  {this.state.billableTotals.total_billable_hours &&
                    (this.state.billableTotals.total_billable_hours).toFixed(1)}
                </div>
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
                ${this.state.billableTotals.total_billable_cost ? (this.state.billableTotals.total_billable_cost).toFixed(2) : '0'}
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
                <div
                  style={{ textAlign: 'center' }}
                >
                  {this.state.unbillableTotals.total_billable_hours &&
                    (this.state.unbillableTotals.total_billable_hours).toFixed(1)}
                </div>
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
                ${this.state.unbillableTotals.total_billable_cost ? (this.state.unbillableTotals.total_billable_cost).toFixed(2) : '0'}
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
          <Table.Header>
            <Table.Row style={{ background: "#e2e2e2" }}>
              <Table.Cell colSpan="3" />
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                <div>Total</div>
                ${this.props.project.total_project_cost ? (this.props.project.total_project_cost).toFixed(2) : '0'}
              </Table.Cell>
            </Table.Row>
          </Table.Header>
        </Table>
        <AddTask project={this.props.project} getProjectTasks={this.getProjectTasks} />
        <br />
        <br />

      </>
    );
  }
}

export default TaskView;
