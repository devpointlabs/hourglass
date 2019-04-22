import React from "react";
import { Header, Menu } from "semantic-ui-react";
import { AuthConsumer } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Clock from "react-clock";

class Home extends React.Component {
  state = {
    date: new Date()
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { name } = this.props.auth.user;
    return (
      <BodyContainer>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "25em"
          }}
        >
          <br />
          <Header as="h1" textAlign="center">
            Hello {name}!
          </Header>
          <br />
          <Clock size="350" renderNumbers value={this.state.date} />
          <br />
          <Menu text style={{ marginLeft: "5.3em" }}>
            <Link to="/projects">
              <Menu.Item name="Projects" />
            </Link>
            <Link to="/timesheet">
              <Menu.Item name="Timesheet" />
            </Link>
            <Link to="/dashboard">
              <Menu.Item name="Dashboard" />
            </Link>
          </Menu>
        </div>
      </BodyContainer>
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

const BodyContainer = styled.div`
  display: flex !important
  width: 100%
  height: 15em
  justify-content: center !important
  align-items: center !important
`;
