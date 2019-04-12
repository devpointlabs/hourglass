import React, { useReducer } from "react";
import axios from "axios";
import { AuthConsumer } from "../providers/AuthProvider";
import { Segment, Header, Image } from "semantic-ui-react";

const defaultImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png";

class Employee extends React.Component {
  state = {
    projects: [],
    timeblocks: []
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/users/${id}/projects`)
      .then(res => this.setState({ projects: res.data }));
    axios
      .get(`/api/users/${id}/timeblocks`)
      .then(res => this.setState({ timeblocks: res.data }));
  }

  render() {
    const {
      auth: { user }
    } = this.props;
    return (
      <Segment>
        <Image circular src={defaultImage || user.image} />
        <Header>{user.name}</Header>
        <Header>Projects</Header>
        {this.state.projects.map(project => (
          <div>{project.name}</div>
        ))}
      </Segment>
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
