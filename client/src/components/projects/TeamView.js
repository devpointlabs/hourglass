import React, { Fragment } from "react";
import { Table, Header, Modal, Button } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../../providers/AuthProvider";
import TaskForm from "./TaskView/TaskForm";

class TeamView extends React.Component {
  state = {
    users: [],
    project: {}
  };

  componentDidMount() {
    const { id } = this.props.project;
    axios.get(`/api/projects/${id}/users`).then(res => {
      debugger;
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

  showTeam = () => {
    debugger;
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
        <Header as="h1" textAlign="center">
          Team
        </Header>
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
              icon="add"
              size="mini"
            />
          }
        >
          <Modal.Header>Add New Team Member</Modal.Header>
          <Modal.Content>
            <TaskForm />
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
