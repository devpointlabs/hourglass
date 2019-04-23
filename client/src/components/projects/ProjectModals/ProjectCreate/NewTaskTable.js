import React from "react";
import { Table, Button, TableCell } from "semantic-ui-react";
import axios from "axios";
import AddNewTasks from "./AddNewTasks";
import NewTaskTableRow from "./NewTaskTableRows";

class NewTaskTable extends React.Component {
  state = {
    tasks: [], project: {},
    defaultTasks: []
  };

  componentDidMount = () => {
    axios
      .get("/api/getlastproject")
      .then(res => this.setState({ project: res.data })
      )
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.project !== this.state.project)
      this.getProjectTasks()
  }

  getProjectTasks = () => {
    const { project } = this.state;
    axios
      .get(`/api/projectdata/${project.id}/tasks_with_data`)
      .then(response => this.setState({ tasks: response.data }));
  };

  handleDelete = (task_id) => {
    const { project, tasks } = this.state;
    axios.delete(`/api/projects/${project.id}/tasks/${task_id}`).then(
      this.setState({ tasks: tasks.filter(t => t.task_id !== task_id) })
    )
  }

  handleSubmit2 = () => {
    this.props.openModal3();
  };

  render() {
    const UnbillableTasks = this.state.tasks.filter(t => t.billable === false)
    const billableTasks = this.state.tasks.filter(t => t.billable === true)
    return (
      <>
        <AddNewTasks
          project={this.state.project}
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
            style={{
              width: "100px",
              color: "white",
              background: "RebeccaPurple",
              marginLeft: "10px"
            }}
            onClick={() => this.handleSubmit2()}
          >
            Next
          </Button>
        </div>
      </>
    );
  }
}

export default NewTaskTable;
