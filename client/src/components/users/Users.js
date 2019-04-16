import React from "react";
import axios from "axios";
import { Table, Header, Image } from "semantic-ui-react";
import AdminCheckbox from "./AdminCheckbox";
import "./usersPage.css";

class Users extends React.Component {
  state = { users: [] };

  componentDidMount() {
    axios.get(`/api/users`).then(res => this.setState({ users: res.data }));
  }

  render() {
    return (
      <Table
        basic="very"
        celled
        collapsing
        style={{ width: "100%", padding: "20px" }}
      >
        <Table.Body>
          {this.state.users.map(u => (
            <Table.Row className="usersTableRow">
              <Table.Cell>
                <Header as="h4" image>
                  <Image src={u.image} rounded size="mini" />
                  <Header.Content>
                    {u.name}
                    <Header.Subheader>{u.nickname}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell style={{ width: "40%" }}>{u.email}</Table.Cell>
              <Table.Cell style={{ width: "110px" }}>
                <AdminCheckbox user={u} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default Users;
