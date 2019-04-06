import React from "react";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskArrayForForm from "./TaskArrayForForm";
import AddUserToTask from "./AddUserToTask";

class ProjectForm extends React.Component {
  state = {
    project: {
      name: "",
      client_name: "",
      planned_start: "",
      planned_end: "",
      notes: ""
    },
    project_id: "",
    taskShown: false
  };

  toggleTask = () => (
    this.setState({
      taskShown: { ...this.state, taskShown: !this.state.taskShown }
    }),
    this.handleSubmit()
  );
  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ project: { ...this.state.project, [name]: value } });
  };

  handleSubmit = e => {
    const { project } = this.state;
    // e.preventDefault();
    axios.post(`/api/projects`, project).then(res => {
      this.setState({ ...this.state, project_id: res.data.id });
      this.props.resetState();
    });
  };

  render() {
    const {
      name,
      client_name,
      planned_start,
      planned_end,
      notes
    } = this.state.project;
    return (
      <>
        <Form style={{ marginTop: "30px" }}>
          <Form.Group>
            <Form.Input
              label="Name"
              name="name"
              value={name}
              placeholder="Name of Project"
              required
              autoFocus
              onChange={this.handleChange}
            />
            <Form.Input
              label="Client Name"
              name="client_name"
              value={client_name}
              placeholder="Client Name"
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Start Date"
              name="planned_start"
              value={planned_start}
              placeholder="YYYY-MM-DD"
              onChange={this.handleChange}
            />
            <Form.Input
              label="End Date"
              name="planned_end"
              value={planned_end}
              placeholder="YYYY-MM-DD"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Notes"
              name="notes"
              value={notes}
              placeholder="Notes"
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
        {this.state.taskShown ? (
          <div>
            <TaskArrayForForm project_id={this.state.project_id} /> <br />{" "}
            <AddUserToTask project_id={this.state.project_id} />{" "}
          </div>
        ) : (
          <div>
            {" "}
            <Button onClick={() => this.toggleTask()}>
              Add Tasks and Employees
            </Button>{" "}
            <Button onClick={this.handleSubmit}>Save Project</Button>{" "}
          </div>
        )}
      </>
    );
  }
}

export default ProjectForm;
