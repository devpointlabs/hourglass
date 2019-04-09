import React from "react";
import axios from "axios";
import { Table, Header, Image, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";

const defaultImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png";

class hoursTable extends React.Component {
  state = { users: [], projects: [] };

  componentDidMount() {
    axios
      .get("/api/users")
      .then(response => this.setState({ users: response.data }));
    axios
      .get("/api/projects")
      .then(response => this.setState({ projects: response.data }));
  }

  render() {
    return (
      <Table definition size="small" striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            {this.state.projects.map(project => (
              <Table.HeaderCell>
                <Link to={`projects/${project.id}`} style={{ color: "black" }}>
                  {project.name}
                </Link>
              </Table.HeaderCell>
            ))}
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {this.state.users.map(user => (
          <Table.Body>
            <Table.Row>
              <Table.Cell size="small">
                <Header as="h4">
                  <Image circular src={user.image || defaultImage} />
                  {user.name}
                </Header>
              </Table.Cell>
              {this.state.projects.map(project => (
                <Table.Cell>
                  {project.planned_start} - {project.planned_end}
                </Table.Cell>
              ))}
              <Table.Cell>Total</Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
        <Table.Body>
          <Table.Row>
            <Table.Cell>Total</Table.Cell>
            {this.state.projects.map(project => (
              <Table.Cell>Total</Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default hoursTable;
