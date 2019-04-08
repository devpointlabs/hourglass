import React, { Fragment } from "react";
import { Table } from "semantic-ui-react";
import axios from "axios";
import { AuthConsumer } from "../providers/AuthProvider";

class TeamView extends React.Component {
  state = {
    users: [],
    project: {}
  };

  componentDidMount() {
    axios
      .get("/api/users")
      .then(res => this.setState({ ...this.state, users: res.data }));
  }

  componentDidUpdate(prevprops) {
    if (prevprops != undefined) {
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

  // showTeam = () => {
  //   return this.state.users.map(user => (
  //     // <Table.Row key={this.user.id}>
  //     <Table.Cell>{this.user}</Table.Cell>
  //     // </Table.Row>
  //   ));
  // };

  render() {
    return (
      <Fragment>
        <Table celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Team Members</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {/* <Table.Body>{this.showTeam()}</Table.Body> */}
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
