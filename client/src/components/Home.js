import React from "react";
import { Header } from "semantic-ui-react";
import { AuthConsumer } from "../providers/AuthProvider";

class Home extends React.Component {
  render() {
    const { admin, name } = this.props.auth.user;

    if (admin)
      return (
        <Header as="h3" textAlign="center">
          Hello {name}!
        </Header>
      );
    else
      return (
        <Header as="h3" textAlign="center">
          Hello {name}
        </Header>
      );
  }
}

export default class ConnectedHome extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Home {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
