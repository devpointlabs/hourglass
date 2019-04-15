import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Menu, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import HourGlassIcon from "./HourGlassIcon";
import Clock from "./Clock";

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
          <Clock />
          <Link to="/profile">
            <Menu.Item
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: ".5em"
              }}
            >
              <div style={{ paddingRight: "1em" }}>
                <Image
                  size="mini"
                  src={this.props.auth.user.image || defaultImage}
                  avatar
                />
              </div>
              <span style={{ color: "white" }}>
                {this.props.auth.user.name}
              </span>
            </Menu.Item>
          </Link>
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position="right">
          <Link to="/login">
            <Menu.Item
              id="login"
              style={{ color: "white" }}
              name="login"
              active={location.pathname === "/login"}
            />
          </Link>
          <Link to="/register">
            <Menu.Item
              id="register"
              style={{ color: "white" }}
              name="register"
              active={location.pathname === "/register"}
            />
          </Link>
        </Menu.Menu>
      );
    }
  };

  render() {
    const { pathname } = this.props.location;
    return (
      <div>
        <Menu
          pointing
          secondary
          style={{
            backgroundColor: "RebeccaPurple",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Link to="/">
            <HourGlassIcon />
          </Link>
          <Link to="/projects">
            <Menu.Item
              name="projects"
              id="projects"
              style={{ color: "white" }}
              active={pathname === "/projects"}
            />
          </Link>
          <Link to="/timesheet">
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
          </Link>

          {this.rightNavItems()}
        </Menu>
      </div>
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

export default withRouter(ConnectedNavbar);
