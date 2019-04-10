import React, { Fragment } from "react";
import { Table, Header } from "semantic-ui-react";
import axios from "axios";
import { AuthConsumer } from "../providers/AuthProvider";

class TeamView extends React.Component {
  state = {
    users: [],
    project: {}
  };

  // componentDidMount() {
  //   const { id } = this.props;
  //   axios.post("/api/projects/users", { id: id }).then(res => {
  //     this.setState({ users: res.data });
  //   });
  // }

  componentDidMount() {
    const { id } = this.props;
    axios.get(`/api/projects/${id}/users`).then(res => {
      this.setState({ users: res.data });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      axios.get(`/api/projects/${this.props.id}`).then(res => {
        this.setState({ project: res.data });
      });
    }
  }

  // findUser = () => {
  //   return this.state.users.map(u => (
  //     <Segment text={u.name} name="user_id" value={u.id} />
  //   ));
  // };

  // findProject = () => {
  //   return this.state.projects.map(p => (
  //     <Segment text={p.name} name="project_id" value={p.id} />
  //   ));
  // };

  showTeam = () => {
    return this.state.users.map(user => (
      <Table.Row key={user.id}>
        <Table.Cell>{user.name}</Table.Cell>
      </Table.Row>
    ));
  };

  render() {
    return (
      <Fragment>
        <Header as="h1" textAlign="center">
          Team
        </Header>
        <Table celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="1">Assigned Members</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.showTeam()}</Table.Body>
        </Table>
      </Fragment>
    );
  }
}

export default class ConnectTeamView extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <TeamView {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
