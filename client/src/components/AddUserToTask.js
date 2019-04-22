import React from "react";
import { Form, Button, Select, Header, Icon, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
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
    e && e.preventDefault();
    const { user_id } = this.state.assignment;
    const { project_id, resetState } = this.props;
    let addedUser = {};
    axios.post(`/api/projects/${project_id}/assignments`, { user_id: user_id });
    this.state.users.forEach(user => {
      if (user.id === user_id) addedUser = user;
    });
    resetState(addedUser);
    this.setState({ assignment: { user_id: "" } });
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
      <Form>
        <Form.Select control={this.employeeDropdown} />
        {this.props.handleToggle ? (
          <>
            <div style={{ transform: "translate(45.75%)" }}>
              <Button
                color="violet"
                animated="vertical"
                onClick={() => this.handleSubmit()}
              >
                <Button.Content visible>Add Member</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow up" />
                </Button.Content>
              </Button>
            </div>
            <br />
            <div style={{ transform: "translate(48%)" }}>
              <Button
                onClick={() => this.props.handleToggle()}
                inverted
                animated="vertical"
                color="violet"
              >
                <Button.Content visible>Save</Button.Content>
                <Button.Content hidden>
                  <Icon name="save outline" />
                </Button.Content>
              </Button>
            </div>
          </>
        ) : (
          <Button
            onClick={this.handleSubmit}
            color="violet"
            style={{ marginBottom: "20px" }}
          >
            <Icon name="arrow alternate circle left outline" />
            Add User
          </Button>
        )}
        <Link to={"/projects"}>
          <Button>Save Project</Button>
        </Link>
        <Button
          onClick={this.handleSubmit}
          color="violet"
          style={{ marginBottom: "20px" }}
        >
          <Icon name="arrow alternate circle left outline" />
          Add User
        </Button>
        )}
        <Link to={"/projects"}>
          <Button>Save Project</Button>
        </Link>
      </Form>
    );
  }
}

export default AddUserToTask;
