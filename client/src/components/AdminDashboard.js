import React from "react";
import axios from "axios";
import { Table, Header, Image, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { CalculateHoursAndWeek } from "./timeblocks/Calculations";

const defaultImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png";

class hoursTable extends React.Component {
  state = { users: [], timeblocks: [], projects: [], totals: [] };

  componentDidMount() {
    axios
      .get("/api/users")
      .then(response => this.setState({ users: response.data }));
    axios
      .get("/api/users/timeblocks")
      .then(response =>
        this.setState({ timeblocks: CalculateHoursAndWeek(response.data) })
      );
    axios
      .get("/api/projects")
      .then(response => this.setState({ projects: response.data }));
  }

  render() {
    const totals = this.state.users.map(user =>
      this.state.timeblocks.reduce((acc, tb) => {
        return tb.user_id === user.id ? acc + parseFloat(tb.hours) : acc;
      }, 0)
    );
    console.log(totals);
    const { projects } = this.state;
    return (
      <Table definition size="small" striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            {projects.map(p => (
              <Table.HeaderCell>
                <Link to={`projects/${p.id}`} style={{ color: "black" }}>
                  {p.name}
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
              {totals.map(t => (
                <Table.Cell>{t}</Table.Cell>
              ))}
              <Table.Cell>Total</Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
        <Table.Body>
          <Table.Row>
            <Table.Cell>Total</Table.Cell>
            {/* {this.state.timeblocks.map(project => (
              <Table.Cell>Total</Table.Cell>
            ))} */}
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default hoursTable;
