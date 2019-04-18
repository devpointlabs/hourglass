import React from "react";
import axios from "axios";
import { Header, Image, Table, Button } from "semantic-ui-react";
import "./EditTeamModalv2.css";

class EditTeamModalv2 extends React.Component {
  state = { allUsers: [], assignedUsers: this.props.users };

  componentDidMount() {
    axios.get(`/api/projects/${this.props.project_id}/users`)
      .then(res => this.setState(
        { assignedUsers: res.data }, () => axios.get("/api/users").then(res =>
          this.setState({
            allUsers: this.filterAssignedUsersFromAllUsers(res.data)
          })
        )));

  }

  filterAssignedUsersFromAllUsers = allUsers => {
    const assignedUserIds = this.state.assignedUsers.map(u => u.id);
    return allUsers.filter(u => !assignedUserIds.includes(u.id));
  };

  setRowData = () => {
    let i;
    const { allUsers, assignedUsers } = this.state;
    let tableRows = [];
    const number_of_rows =
      allUsers.length >= assignedUsers.length
        ? allUsers.length
        : assignedUsers.length;
    for (i = 0; i < number_of_rows; i++) {
      tableRows.push({ user: allUsers[i], assignedUser: assignedUsers[i] });
    }
    return tableRows;
  };

  toggleIn = user => {
    const updatedUser = { ...user, updated: !user.updated };
    const allUsers = this.state.allUsers.filter(u => updatedUser.id !== u.id);
    const assignedUsers = [...this.state.assignedUsers, updatedUser];
    this.setState({ allUsers, assignedUsers });
  };

  toggleOut = user => {
    const updatedUser = { ...user, updated: !user.updated };
    const assignedUsers = this.state.assignedUsers.filter(
      u => updatedUser.id !== u.id
    );
    const allUsers = [...this.state.allUsers, updatedUser];
    this.setState({ allUsers, assignedUsers });
  };

  handleSubmit = () => {
    // on project
    let completeAllUsers = 0;
    let completeAssignedUsers = 0;
    let changeCount = [
      this.state.allUsers.reduce((acc, u) => {
        if (u.updated) return acc + 1;
        return acc;
      }, 0),
      this.state.assignedUsers.reduce((acc, u) => {
        if (u.updated) return acc + 1;
        return acc;
      }, 0)
    ];

    if (changeCount[0] === 0 && changeCount[1] === 0) this.props.handleClose();
    else {
      this.state.allUsers.map(
        u =>
          u.updated &&
          axios
            .delete(
              `/api/assignment/${u.id}/${
              this.props.project_id
              }/delete_by_u_and_p`
            )
            .then(res => {
              completeAllUsers += 1;
              if (
                completeAllUsers === changeCount[0] &&
                completeAssignedUsers === changeCount[1]
              ) {
                this.updateTeamViewPageAndCloseModal();
              }
            })
      );
      // off project
      this.state.assignedUsers.map(
        u =>
          u.updated &&
          axios
            .post(`/api/projects/${this.props.project_id}/assignments`, {
              project_id: this.props.project_id,
              user_id: u.id
            })
            .then(res => {
              completeAssignedUsers += 1;
              if (
                completeAllUsers === changeCount[0] &&
                completeAssignedUsers === changeCount[1]
              ) {
                this.updateTeamViewPageAndCloseModal();
              }
            })
      );
    }
  };

  updateTeamViewPageAndCloseModal = () => {
    this.props.getUsersAndHours();
    this.props.handleClose();
  };

  render() {
    const rowData = this.setRowData();

    return (
      <>
        <div style={{ height: "70vh", overflowY: "scroll" }}>
          <Table
            basic="very"
            celled
            collapsing
            style={{ width: "100%", padding: "20px", paddingTop: 0 }}
          >
            <Table.Body>
              {rowData.map(row => (
                <Table.Row>
                  <Table.Cell
                    className="userTableCell"
                    style={{ width: "50%" }}
                    onClick={() => row.user && this.toggleIn(row.user)}
                  >
                    <Header as="h4" image>
                      <Image
                        src={row.user && row.user.image}
                        rounded
                        size="mini"
                      />
                      <Header.Content>
                        {row.user && row.user.name}
                        <Header.Subheader>
                          {row.user && row.user.nickname}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell
                    className="userTableCell"
                    style={{ width: "50%" }}
                    onClick={() =>
                      row.assignedUser && this.toggleOut(row.assignedUser)
                    }
                  >
                    <Header as="h4" image>
                      <Image
                        src={row.assignedUser && row.assignedUser.image}
                        rounded
                        size="mini"
                      />
                      <Header.Content>
                        {row.assignedUser && row.assignedUser.name}
                        <Header.Subheader>
                          {row.assignedUser && row.assignedUser.nickname}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginTop: "10px"
          }}
        >
          {!this.props.newProjectType &&
            <Button
              style={{
                width: "100px"
              }}
              onClick={() => this.props.handleClose()}
            >
              Cancel
          </Button>}
          <Button
            style={{
              width: "100px",
              color: "white",
              background: "RebeccaPurple",
              marginLeft: "10px"
            }}
            onClick={() => this.handleSubmit()}
          >
            Submit
          </Button>
        </div>
      </>
    );
  }
}

export default EditTeamModalv2;
