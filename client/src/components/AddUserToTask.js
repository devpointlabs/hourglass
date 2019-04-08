import React from "react";
import { Form, Select } from "semantic-ui-react";
import axios from "axios";

class AddUserToTask extends React.Component {
  state = { users: [], assignment: { user_id: "", task_id: "" } };
  componentDidMount = () => {
    axios.get("/api/users").then(res => this.setState({ users: res.data }));
  };

  handleChange = (e, { name, value }) => {
    this.setState({ assignment: { ...this.state.assignment, user_id: value } });
  };

  employeeDropdown = () => {
    let FindEmployee = [];
    this.state.users.map(u =>
      FindEmployee.push({
        id: u.id,
        text: u.name,
        value: u.id
      })
    );
    return (
      <Select
        placeholder="Find an Employee"
        fluid
        selection
        options={FindEmployee}
        onChange={this.handleChange}
      />
    );
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Select control={this.employeeDropdown} />
        </Form>
      </>
    );
  }
}

export default AddUserToTask;
