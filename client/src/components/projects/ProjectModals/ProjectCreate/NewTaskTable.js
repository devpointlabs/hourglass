import React from "react";
import { Table, Button, TableCell } from "semantic-ui-react";
import axios from "axios";
import AddNewTasks from "./AddNewTasks";
import NewTaskTableRow from "./NewTaskTableRow";

class NewTaskTable extends React.Component {
  state = { tasks: [], project: {}, 
  defaultTasks: [] };

  componentDidMount = () => {
    axios
      .get("/api/getlastproject")
      .then(res => this.setState({ project: res.data }));
  };

  getProjectTasks = () => {
    const { project } = this.state;
    axios
      .get(`/api/projectdata/${project.id}/tasks_with_data`)
      .then(response => this.setState({ tasks: response.data }));
  };

  handleDelete = (task_id) => {
    const { project, tasks } = this.state;
    axios.delete(`/api/projects/${project.id}/tasks/${task_id}`).then(
    this.setState({tasks: tasks.filter(t => t.task_id !== task_id )})
    )}
  
  handleEdit = () => {
    }

  showBillableTasks = () => {
    const billableTasks = this.state.tasks.filter(t => t.billable === true);
    return billableTasks.map(task => (
     <NewTaskTableRow task={task} handleDelete={this.handleDelete}/>
    ));
  };

  showUnBillableTasks = () => {
    const UnbillableTasks = this.state.tasks.filter(t => t.billable === false);
    return UnbillableTasks.map(task => (
      <NewTaskTableRow task={task} handleDelete={this.handleDelete} project={this.state.project}/>
    ));
  };

  handleSubmit2 = () => {
    this.props.openModal3();
  };

  render() {
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
                </Table.Cell>
                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "100px",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  <div></div>
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
                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "100px",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  <div></div>
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
