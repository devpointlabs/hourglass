import React, { Fragment } from "react";
import { Table, Header, Modal, Button } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../../providers/AuthProvider";
import EditTeam from "./EditTeam";

class TeamView extends React.Component {
  state = {
    users: [],
    project: this.props.project
  };

  componentDidMount() {
    const { project_id } = this.props.project;
    axios.get(`/api/projects/${project_id}/users`).then(res => {
      this.setState({ users: res.data });
    });
  }

  showTeam = () => {
    return this.state.users.map(user => (
      <Table.Row key={user.id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell style={{ borderRight: "solid grey 0.5px" }}>
          Total Hours
        </Table.Cell>
      </Table.Row>
    ));
  };

  render() {
    return (
      <Fragment>
        <Table celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">Assigned Members</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.showTeam()}</Table.Body>
        </Table>
        <Modal
          trigger={
            <Button
              circular
              color="violet"
              onClick={this.handleNew}
              icon="edit"
              size="mini"
            />
          }
        >
          <Modal.Header>Edit Team</Modal.Header>
          <Modal.Content>
            <EditTeam />
          </Modal.Content>
        </Modal>
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
