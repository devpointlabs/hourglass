import React from "react";
import { Form, Button, Select, Header } from "semantic-ui-react";

import axios from "axios";

class AddUserToTask extends React.Component {
  state = { users: [], assignment: { user_id: "" } };
  componentDidMount = () => {
    axios.get("/api/users").then(res => this.setState({ users: res.data }));
    console.log(this.props);
  };

  handleChange = (e, { name, value }) => {
    this.setState({ assignment: { ...this.state.assignment, user_id: value } });
  };

  handleSubmit = e => {
    // e.preventDefault();
    const { user_id } = this.state.assignment;
    const { project_id, resetState } = this.props;
    let addedUser = {};
    axios.post(`/api/projects/${project_id}/assignments`, { user_id: user_id });
    this.state.users.forEach(user => {
      if (user.id === user_id) addedUser = user;
    });
    resetState(addedUser);
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
        <Form>
          <Form.Select control={this.employeeDropdown} />
          <Button onClick={() => this.handleSubmit()}>Save</Button>
        </Form>
      </>
    );
  }
}

export default AddUserToTask;
