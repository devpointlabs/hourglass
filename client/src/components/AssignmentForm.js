import React from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import axios from "axios";

class AssignmentForm extends React.Component {
  state = {
    users: [],
    projects: [],
    assignment: { user_id: "", project_id: "" }
  };

  componentDidMount = () => {
    axios
      .get("/api/projects")
      .then(res => this.setState({ projects: res.data }));
    axios.get("/api/users").then(res => this.setState({ users: res.data }));
  };
  handleChange = (e, { name, value }) => {
    this.setState({ assignment: { ...this.state.assignment, [name]: value } });
  };

  handleSubmit = () => {};

  findEmployee = () => {
    return this.state.users.map(u => (
      <Dropdown.Item
        text={u.name}
        name="user_id"
        value={u.id}
        onClick={this.handleChange}
      />
    ));
  };

  findProject = () => {
    return this.state.projects.map(p => (
      <Dropdown.Item
        text={p.name}
        name="project_id"
        value={p.id}
        onClick={this.handleChange}
      />
    ));
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Dropdown text="Find an Employee">
            <Dropdown.Menu>{this.findEmployee()}</Dropdown.Menu>
          </Dropdown>

          <Dropdown text="Find a Project">
            <Dropdown.Menu>{this.findProject()}</Dropdown.Menu>
          </Dropdown>
        </Form>
      </>
    );
  }
}

export default AssignmentForm;
