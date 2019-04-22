import React, { useReducer } from "react";
import axios from "axios";
import { AuthConsumer } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import {
  Segment,
  Header,
  Image,
  List,
  Divider,
  Table
} from "semantic-ui-react";

const defaultImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png";

class Employee extends React.Component {
  state = {
    projects: [],
    timeblocks: [],
    user: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/users/${id}/projects`)
      .then(res => this.setState({ projects: res.data }));
    axios
      .get(`/api/users/${id}/timeblocks`)
      .then(res => this.setState({ timeblocks: res.data }));
    axios
      .get(`/api/users/${id}`)
      .then(res => this.setState({ user: res.data }));
  }

  totals = () => {
    const { timeblocks } = this.state;
    const time = [];
    let total = 0;
    timeblocks.map(timeblock => {
      let date1 = new Date(timeblock.start_time);
      let date2 = new Date(timeblock.end_time);

      const hours = Math.abs(date1 - date2) / 36e5;
      time.push(hours);
    });
    time.map(hour => {
      total = hour + total;
    });
    return <div>{total}</div>;
  };

  render() {
    const { user } = this.state;

    return (
      <>
        <Segment stackable>
          <Image circular centered src={user.image || defaultImage} />
          <Header textAlign="center">{user.name}</Header>
        </Segment>
        <Header as="h1" textAlign="center">
          <Header.Content>Hours This Week</Header.Content>
          <Header.Subheader>{this.totals()}</Header.Subheader>
        </Header>
        <Divider />
        <Table celled stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Client</Table.HeaderCell>
              <Table.HeaderCell>Project</Table.HeaderCell>
              <Table.HeaderCell>Task</Table.HeaderCell>
              <Table.HeaderCell>Hours</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.projects.map(project => (
              <Table.Row>
                <Table.Cell>{project.client_name}</Table.Cell>
                <Table.Cell>{project.name}</Table.Cell>
                <Table.Cell>(task)</Table.Cell>
                <Table.Cell>(hours)</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  }
}

export default class ConnectedEmployee extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Employee {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
