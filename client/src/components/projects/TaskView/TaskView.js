import React, { Fragment } from "react";
import TaskForm from "../ProjectLegacy/TaskForm";
import { Table, Header, Button } from "semantic-ui-react";
import axios from "axios";
import EditModalForm from '../ProjectModals/ProjectEdit/EditModalForms'


class TaskView extends React.Component {
  state = { tasks: [], billableTotals: {}, unbillableTotals: {}, taskview: true };

  componentDidMount() {
    this.getProjectTasks();
  }

  getProjectTasks = () => {
    const { project } = this.props;
    axios
      .get(`/api/projectdata/${project.project_id}/tasks_with_data`)
      .then(response => this.setState({ tasks: response.data }));
    axios.get(`/api/billable/${project.project_id}`).then(response => {
      const billable = response.data.filter(b => b.billable && b);
      const unbillable = response.data.filter(b => {
        if (b.billable === false) return b;
      });
      this.setState({
        billableTotals: billable[0],
        unbillableTotals: unbillable[0]
      });
    });
  };

  showBillableTasks = () => {
    const billableTasks = this.state.tasks.filter(t => t.billable === true);
    return billableTasks.map(task => (
      <Table.Row key={task.name}>
        <Table.Cell>{task.name}</Table.Cell>
        <Table.Cell
          style={{ borderRight: "solid grey 0.5px", textAlign: "center" }}
        >
          {task.total_hours ? task.total_hours : 0}
        </Table.Cell>
        <Table.Cell style={{ paddingLeft: "200px" }}>
          ${parseFloat(task.price_per_hour).toFixed(2)}
        </Table.Cell>
        <Table.Cell style={{ textAlign: "center" }}>
          {task.total_cost ? "$" + task.total_cost : "$0"}
        </Table.Cell>
      </Table.Row>
    ));
  };

  showUnBillableTasks = () => {
    const UnbillableTasks = this.state.tasks.filter(t => t.billable === false);
    return UnbillableTasks.map(task => (
      <Table.Row key={task.name}>
        <Table.Cell>{task.name}</Table.Cell>
        <Table.Cell
          style={{ borderRight: "solid grey 0.5px", textAlign: "center" }}
        >
          {task.total_hours ? task.total_hours : 0}
        </Table.Cell>
        <Table.Cell style={{ paddingLeft: "200px" }}>
          ${parseFloat(task.price_per_hour).toFixed(2)}
        </Table.Cell>
        <Table.Cell style={{ textAlign: "center" }}>
          {task.total_cost
            ? "$" + parseFloat(task.total_cost).toFixed(2)
            : "$0"}
        </Table.Cell>
      </Table.Row>
    ));
  };

  render() {
    return (
      <>
        <Header as="h1">
          Tasks
          <EditModalForm project={this.props.project} taskView={this.state.taskview} />
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
                <div style={{ textAlign: "center" }}>Hours</div>
                <div style={{ textAlign: "center" }}>
                  {this.state.billableTotals !== undefined
                    ? parseFloat(
                      this.state.billableTotals.total_billable_hours
                    ).toFixed(2)
                    : "0.00"}
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
                  fontWeight: "bold"
                }}
              >
                <div>Total</div>
                {this.state.billableTotals === undefined
                  ? "$0.00"
                  : this.state.billableTotals.total_billable_cost}
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
                <div style={{ textAlign: "center" }}>Hours</div>
                <div style={{ textAlign: "center" }}>
                  {this.state.unbillableTotals === undefined
                    ? 0
                    : this.state.unbillableTotals.total_billable_hours}
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
                  fontWeight: "bold"
                }}
              >
                <div>Total</div>
                {this.state.unbillableTotals === undefined
                  ? "$0.00"
                  : this.state.unbillableTotals.total_billable_cost}
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
                <div>Total</div>$
                {this.props.project.total_project_cost
                  ? this.props.project.total_project_cost.toFixed(2)
                  : "0"}
              </Table.Cell>
            </Table.Row>
          </Table.Header>
        </Table>
        <br />
        <br />
      </>
    );
  }
}

export default TaskView;
