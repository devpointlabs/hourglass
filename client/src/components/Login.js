import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Button, Form, Segment, Header, Image } from "semantic-ui-react";
import {
  NotificationContainer,
} from "react-notifications";

class Login extends React.Component {
  state = { email: "", password: "", message: "" };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.auth.handleLogin({ email, password }, this.props.history);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <Segment basic>
        <Header as="h1" textAlign="center">
          Login
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Email"
            autoFocus
            required
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password"
            required
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            onChange={this.handleChange}
          />
          <Segment textAlign="center" basic>
            <Button
              animated="fade"
              type="submit"
              style={{ color: "white", background: "RebeccaPurple" }}
            >
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>
                <Image
                  src={require("../images/hourglass_white_inside.png")}
                  size="mini"
                  style={{ marginLeft: "2.2em", marginTop: "-1em" }}
                />
              </Button.Content>
            </Button>
            <NotificationContainer />
          </Segment>
        </Form>
      </Segment>
    );
  }
}

export default class ConnectedLogin extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Login {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
//
