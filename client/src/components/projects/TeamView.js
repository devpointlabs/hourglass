import React from "react";
import { Table, Header, Modal, Image } from "semantic-ui-react";
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider";
import EditTeamModalv2 from "./EditTeamModalv2";

class TeamView extends React.Component {
  state = {
    users: [],
    project: this.props.project,
    hours: [],
    modalOpen: false
  };

  componentDidMount() {
    this.getUsersAndHours();
  }

  getUsersAndHours = () => {
    const { project_id } = this.props.project;
    axios
      .get(`/api/projects/${project_id}/users`)
      .then(res => this.setState({ users: res.data }));
    axios.get(`/api/user/${project_id}/total_project_hours`).then(res => {
      this.setState({ hours: res.data });
    });
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { hours, users } = this.state;
    const usersIds = users.map(u => u.id);
    const hoursUserIds = hours.map(u => u.id);
    const usersNotIncludedInHours = this.state.users.filter(
      u => !hoursUserIds.includes(u.id)
    );
    const combinedUsers = [...hours, ...usersNotIncludedInHours];
    const currentUsersWithHours = combinedUsers.filter(u =>
      usersIds.includes(u.id)
    );
    const previousUsersWithHours = combinedUsers.filter(
      u => !usersIds.includes(u.id)
    );

    return (
      <>
        <Table celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ cursor: 'pointer' }} colSpan="1" onClick={() => this.handleOpen()}>
                Current Team
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="1">hours</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currentUsersWithHours.map(user => (
              <Table.Row
                key={user.id}
                className="editTeamCell"
                onClick={() => this.handleOpen()}
              >
                <Table.Cell onClick={() => console.log("clicked")}>
                  <Header as="h4" image>
                    <Image src={user.image} rounded size="mini" />
                    <Header.Content>
                      {user.name}
                      <Header.Subheader>{user.nickname}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  {user.total_hours && user.total_hours.toFixed(2)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {previousUsersWithHours.length > 0 && (
          <Table celled compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="1">
                  Previously Assigned
                </Table.HeaderCell>
                <Table.HeaderCell colSpan="1">hours</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {previousUsersWithHours.map(user => (
                <Table.Row key={user.id}>
                  <Table.Cell onClick={() => console.log("clicked")}>
                    <Header as="h4" image>
                      <Image src={user.image} rounded size="mini" />
                      <Header.Content>
                        {user.name}
                        <Header.Subheader>{user.nickname}</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    {user.total_hours && user.total_hours.toFixed(2)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
        <Modal open={this.state.modalOpen} onClose={() => this.handleClose()}>
          <Modal.Header style={{ background: "rebeccapurple", color: "white" }}>
            <div>Edit Team</div>
          </Modal.Header>
          <div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "50%",
                  textAlign: "left",
                  padding: "10px",
                  paddingLeft: "40px",
                  fontWeight: "bold"
                }}
              >
                All Users
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  width: "50%",
                  textAlign: "left",
                  padding: "10px"
                }}
              >
                Assigned To Project
              </div>
            </div>
          </div>
          <Modal.Content>
            <EditTeamModalv2
              users={this.state.users}
              project_id={this.props.project.project_id}
              handleClose={this.handleClose}
              getUsersAndHours={this.getUsersAndHours}
            />
          </Modal.Content>
        </Modal>
      </>
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
