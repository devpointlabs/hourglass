import React from "react";
import axios from "axios";
import { Table, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AdminCheckbox from "./AdminCheckbox";
import "./usersPage.css";

const defaultImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png";

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
            <Table.Row key={u.id} className="usersTableRow">
              <Table.Cell>
                <Header as="h4" image>
                  <Image
                    src={u.image || defaultImage}
                    circular
                    size="mini"
                    style={{
                      height: "35px",
                      width: "35px",
                      objectFit: "cover",
                      marginLeft: "5px"
                    }}
                  />
                  <Link as="div" to={`/users/${u.id}`}>
                    <Header.Content
                      style={{ color: "RebeccaPurple", paddingLeft: "10px" }}
                    >
                      {u.name}
                      <Header.Subheader>{u.nickname}</Header.Subheader>
                    </Header.Content>
                  </Link>
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
