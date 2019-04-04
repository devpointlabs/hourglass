import React from "react";
import axios from "axios";
import { Table, Header, Image, Input } from "semantic-ui-react";

class hoursTable extends React.Component {
  state = { users: [] };

  componentDidMount() {
    axios
      .get("/api/users")
      .then(response => this.setState({ users: response.data }));
  }

  render() {
    return (
      <Table basic="very" celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Employee</Table.HeaderCell>
            <Table.HeaderCell>Total Hours</Table.HeaderCell>
            <Table.HeaderCell>Hourly Wage</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {this.state.users.map(user => (
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Image src={user.image} rounded size="massive" />
                  <Header.Content>
                    {user.name}
                    <Header.Subheader>{user.nickname}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Input focus placeholder="Hours" type="number" />
              </Table.Cell>
              <Table.Cell>$9.00</Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    );
  }
}

export default hoursTable;
