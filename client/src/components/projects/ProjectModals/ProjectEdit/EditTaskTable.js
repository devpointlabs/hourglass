import React from "react";

import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import AddNewTasks from "./AddNewTasks";
import NewTaskTableRow from "./NewTaskTableRow"

class EditTaskTable extends React.Component {
  state = { tasks: [], project: this.props.project };

  componentDidMount = () => {
    this.getProjectTasks();
  };

  getProjectTasks = () => {
    axios
      .get(`/api/projectdata/${this.props.project.project_id}/tasks_with_data`)
      .then(response => this.setState({ tasks: response.data }));
  };

  showBillableTasks = () => {
    const billableTasks = this.state.tasks.filter(t => t.billable === true);
    return billableTasks.map(task => (
      <NewTaskTableRow task={task} handleDelete={this.handleDelete} />
    ));
  };

  showUnBillableTasks = () => {
    const UnbillableTasks = this.state.tasks.filter(t => t.billable === false);
    return UnbillableTasks.map(task => (
      <NewTaskTableRow task={task} handleDelete={this.handleDelete} project={this.props.project} />
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
                    width: "40%",
                    fontWeight: "bold"
                  }}
                >
                  Billable Tasks
              </Table.Cell>
                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "10%",
                    fontWeight: "bold"
                  }}
                >
                  <div>Hours</div>

                </Table.Cell>
                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "30%",
                    fontWeight: "bold",
                  }}
                >
                  Price per Hour
              </Table.Cell>
                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "11%",
                    fontWeight: "bold",
                  }}
                >
                  <div>Total</div>
                </Table.Cell>
                <Table.Cell
                  style={{
                    width: "15%"
                  }} />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan="5" />
              </Table.Row>
              {this.showBillableTasks()}
              <Table.Row>
                <Table.Cell colSpan="5" />
              </Table.Row>
            </Table.Body>
          </Table>
          <Table>
            <Table.Header>
              <Table.Row style={{ background: "#e2e2e2" }}>
                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "35%",
                    fontWeight: "bold"
                  }}
                >
                  Unbillable Tasks
              </Table.Cell>
                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "10%",
                    fontWeight: "bold"
                  }}
                >
                  <div>Hours</div>

                </Table.Cell>
                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "30%",
                    fontWeight: "bold",
                  }}
                >
                  Price per Hour
              </Table.Cell>
                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "11%",
                    fontWeight: "bold",
                  }}
                >
                  <div>Total</div>
                </Table.Cell>
                <Table.Cell
                  style={{
                    width: "15%"
                  }} />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan="5" />
              </Table.Row>
              {this.showUnBillableTasks()}
              <Table.Row>
                <Table.Cell colSpan="5" />
              </Table.Row>
            </Table.Body>
          </Table>
          <br />
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
