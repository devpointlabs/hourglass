import React from "react";

import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import AddNewTasks from "./AddNewTasks";
import NewTaskTableRow from "./EditTaskTableRows"

class EditTaskTable extends React.Component {
  state = { tasks: [], project: this.props.project };

  componentDidMount = () => {
    this.getProjectTasks();
  };

  getProjectTasks = () => {
    axios
      .get(`/api/projectdata/${this.props.project.project_id}/tasks_with_data`)
      .then(response => {
        this.setState({ tasks: response.data })
      });
  };

  handleDelete = (task_id) => {
    const { project, tasks } = this.state;
    axios.delete(`/api/projects/${project.id}/tasks/${task_id}`).then(
      this.setState({ tasks: tasks.filter(t => t.task_id !== task_id) })
    )
  }

  handleSubmit2 = () => {
    this.props.taskView ? this.props.closeModal2() : this.props.openModal3();

  };

  render() {
    const UnbillableTasks = this.state.tasks.filter(t => t.billable === false)
    const billableTasks = this.state.tasks.filter(t => t.billable === true)
    return (
      <>
        <AddNewTasks
          project={this.props.project}
          getProjectTasks={this.getProjectTasks}
          getProjectTasksTaskView={this.props.getProjectTasksTaskView}
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
              <NewTaskTableRow tasks={billableTasks} getProjectTasks={this.getProjectTasks} handleDelete={this.handleDelete} />
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
              <NewTaskTableRow tasks={UnbillableTasks} getProjectTasks={this.getProjectTasks} handleDelete={this.handleDelete} />
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
