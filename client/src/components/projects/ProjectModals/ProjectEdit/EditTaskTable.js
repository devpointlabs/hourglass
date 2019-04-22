import React from "react";

import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import AddNewTasks from "./AddNewTasks";

class EditTaskTable extends React.Component {
  state = { tasks: [], project: this.props.project };

  componentDidMount = () => {
    this.getProjectTasks();
  };

  getProjectTasks = () => {
    const { project } = this.state;
    axios
      .get(`/api/projectdata/${this.props.project.project_id}/tasks_with_data`)
      .then(response => this.setState({ tasks: response.data }));
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
          {task.total_cost ? "$" + task.total_cost.toFixed(2) : "$0"}
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
          {task.total_cost ? "$" + task.total_cost.toFixed(2) : "$0"}
        </Table.Cell>
      </Table.Row>
    ));
  };

  handleSubmit2 = () => {
    this.props.taskView ? this.props.closeModal2() : this.props.openModal3();
  };

  render() {
    return (
      <>
        <AddNewTasks
          project={this.props.project}
          getProjectTasks={this.getProjectTasks}
        />
        <div
          style={{
            height: "50vh",
            overflowY: "scroll",
            padding: "0 10px 0 20px"
          }}
        >
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
                  {/* ${this.state.billableTotals.total_billable_cost ? (this.state.billableTotals.total_billable_cost).toFixed(2) : '0'} */}
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
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginTop: "10px"
          }}
        >
          <Button
            floated="left"
            style={{ width: "100px" }}
            onClick={() => this.props.closeModal2()}
          >
            Close
        </Button>
          <Button
            style={{
              width: "100px",
              color: "white",
              background: "RebeccaPurple",
              marginLeft: "10px"
            }}
            onClick={() => this.handleSubmit2()}
          >
            {this.props.taskView ? "Submit" : "Next"}
          </Button>
        </div>
      </>
    );
  }
}

export default EditTaskTable;
