import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Menu, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import HourGlassIcon from "./HourGlassIcon";
import Clock from "./Clock";
import styled from "styled-components";

const defaultImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png";

class Navbar extends React.Component {
  rightNavItems = () => {
    const {
      auth: {
        user
        //  handleLogout
      },
      location
    } = this.props;

    if (user) {
      return (
        <Menu.Menu
          position="right"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Fade>
            <Clock />
          </Fade>
          <SwitchDisplay>
            <Link to="/profile">
              <Menu.Item
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: ".5em"
                }}
              >
                <Fade style={{ paddingRight: "1em" }}>
                  <Image
                    size="mini"
                    src={this.props.auth.user.image || defaultImage}
                    avatar
                  />
                </Fade>
                <TextSize>
                  <span style={{ color: "white" }}>
                    {this.props.auth.user.name}
                  </span>
                </TextSize>
              </Menu.Item>
            </Link>
          </SwitchDisplay>
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position="right">
          <Link to="/login">
            <TextSize>
              <Menu.Item
                id="login"
                style={{ color: "white" }}
                name="login"
                active={location.pathname === "/login"}
              />
            </TextSize>
          </Link>
          <Link to="/register">
            <TextSize>
              <Menu.Item
                id="register"
                style={{ color: "white" }}
                name="register"
                active={location.pathname === "/register"}
              />
            </TextSize>
          </Link>
        </Menu.Menu>
      );
    }
  };

  render() {
    const { pathname } = this.props.location;
    return (
      <Styled>
        <Menu
          pointing
          secondary
          style={{
            backgroundColor: "RebeccaPurple",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Fade>
            <Link to="/">
              <HourGlassIcon />
            </Link>
          </Fade>
          {this.props.auth.user && this.props.auth.user.admin === true && (
            <Link to="/projects">
              <TextSize>
                <Menu.Item
                  name="projects"
                  id="projects"
                  style={{ color: "white" }}
                  active={
                    pathname === "/projects" ||
                    pathname === "/projects/new" ||
                    pathname === `/projects/${this.props.match.params.id}`
                  }
                />
              </TextSize>
            </Link>
          )}
          <Link to="/timesheet">
            <TextSize>
              <Menu.Item
                name="timesheet"
                id="timesheet"
                style={{ color: "white" }}
                active={
                  pathname === "/timesheet" ||
                  pathname === "/timesheet/approve_timesheets" ||
                  pathname === "/timesheet/unsubmitted"
                }
              />
            </TextSize>
          </Link>
          {this.props.auth.user && this.props.auth.user.admin === true && (
            <Link to="/users">
              <TextSize>
                <Menu.Item
                  name="users"
                  id="users"
                  style={{ color: "white" }}
                  active={pathname === "/users"}
                />
              </TextSize>
            </Link>
          )}
          {this.rightNavItems()}
        </Menu>
      </Styled>
    );
  }
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Navbar {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

const Styled = styled.div`
  @media (max-width: 700px) {
    display: inline-block;
    width: 100%;
  }
`;

const TextSize = styled.div`
  @media (max-width: 700px) {
    font-size: .8em
    float: left;
  }
`;

const SwitchDisplay = styled.div`
  @media (max-width: 700px) {
    justify-content: space-around;
  }
`;

const Fade = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
`;

export default withRouter(ConnectedNavbar);
