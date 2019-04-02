import React from "react";
import { Header } from "semantic-ui-react";
import { AuthConsumer } from "../providers/AuthProvider";

class Home extends React.Component {
  render() {
    const { admin, name } = this.props.auth.user;

    if (admin)
      return (
        <Header as="h3" textAlign="center">
          Hour Glass, Hello Admin {name}!
        </Header>
      );
    else return <div>Not an admin, hello {name}</div>;
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
