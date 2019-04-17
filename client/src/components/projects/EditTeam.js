import React from "react";
import axios from "axios";
import { Form, Button, Icon } from "semantic-ui-react";

class EditTeam extends React.Component {
  state = { users: [] };

  componentDidMount() {
    const { project_id } = this.props;
    axios.get(`/api/users`).then(res => this.setState({ users: res.data }));
    axios
      .get(`/api/projects/${project_id}/users`)
      .then(res => this.setState({ addedUsers: res.data }));
  }
  employeeDropdown = () => {
    let FindEmployee = [];
    this.state.users.map(u =>
      FindEmployee.push({
        id: u.id,
        text: u.name,
        value: u.id
      })
    );
  };

  render() {
    return (
      <>
        <Form>
          <Form.Select control={this.employeeDropdown} />

          <div style={{ transform: "translate(45.75%)" }}>
            <Button
              color="violet"
              animated="vertical"
              // onClick={() => this.handleSubmit()}
            >
              <Button.Content visible>Add Member</Button.Content>
              <Button.Content>
                <Icon name="arrow up" />
              </Button.Content>
            </Button>
          </div>
          <br />
          <div style={{ transform: "translate(48%)" }}>
            <Button inverted animated="vertical" color="violet">
              <Button.Content visible>Save</Button.Content>
              <Button.Content>
                <Icon name="save outline" />
              </Button.Content>
            </Button>
          </div>

          {/* 
                    <Link to={"/projects"}> */}
          <Button
            onClick={this.handleSubmit}
            color="violet"
            style={{ marginBottom: "20px" }}
          >
            <Icon name="arrow alternate circle left outline" />
            Save
          </Button>
          {/* </Link> */}
        </Form>
      </>
    );
  }
}

export default EditTeam;
