import React, { useReducer } from "react";
import axios from "axios";
import { AuthConsumer } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import { Segment, Header, Image, List, Divider } from "semantic-ui-react";

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
        <Segment>
          <Image circular centered src={user.image || defaultImage} />
          <Header textAlign="center">{user.name}</Header>
        </Segment>
        <Header as="h1" textAlign="center">
          <Header.Content>Hours This Week</Header.Content>
          <Header.Subheader>{this.totals()}</Header.Subheader>
        </Header>
        <Divider />
        <Header as="h1" textAlign="center">
          Projects
        </Header>
        <Divider />
        <List animated>
          {this.state.projects.map(project => (
            <List.Item style={{ textAlign: "center" }}>
              <List.Content>
                <Link to={`/projects/${project.id}`}>
                  <List.Header as="h3" style={{ color: "purple" }}>
                    {project.name}
                  </List.Header>
                </Link>
                <List.Description>TOTAL HOURS ACROSS PROJECT</List.Description>{" "}
                {/*  will change later */}
              </List.Content>
            </List.Item>
          ))}
        </List>
        <Divider />
        <Header as="h1" textAlign="center">
          Tasks
        </Header>
        <Divider />
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
