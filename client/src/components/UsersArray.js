import React from "react";
import { Container, Divider, Header } from "semantic-ui-react";
import axios from "axios";
import UsersViewForForm from "./UsersViewForForm";
import AddUserToTask from "./AddUserToTask";

class UsersArray extends React.Component {
  state = { users: [], addedUsers: [] };

  componentDidMount = () => {
    const { project_id } = this.props;
    axios.get(`/api/users`).then(res => this.setState({ users: res.data }));
    axios
      .get(`/api/projects/${project_id}/users`)
      .then(res => this.setState({ addedUsers: res.data }));
  };

  resetState = user => {
    const users = [...this.state.addedUsers, user];
    this.setState({ addedUsers: users });
  };

  deleteTeamMember = user_id => {
    this.setState({
      addedUsers: this.state.addedUsers.filter(u => u.id !== user_id)
    });
  };

  showUsers = () => {
    return this.state.addedUsers.map(user => (
      <>
        <UsersViewForForm
          deleteTeamMember={this.deleteTeamMember}
          user={user}
          project_id={this.props.project_id}
        />
      </>
    ));
  };

  render() {
    return (
      <>
        <Header>Team</Header>
        {this.showUsers()}
        <AddUserToTask
          resetState={this.resetState}
          project_id={this.props.project_id}
        />
      </>
    );
  }
}

export default UsersArray;
