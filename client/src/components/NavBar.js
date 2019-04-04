import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Menu, MenuItem } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import HourGlass from "./hourglass.png";

class Navbar extends React.Component {
  rightNavItems = () => {
    const {
      auth: { user, handleLogout },
      location
    } = this.props;

    if (user) {
      return (
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            onClick={() => handleLogout(this.props.history)}
          />
          <Link to="/profile">
            <Menu.Item name="profile" />
          </Link>
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position="right">
          <Link to="/login">
            <Menu.Item
              id="login"
              name="login"
              active={location.pathname === "/login"}
            />
          </Link>
          <Link to="/register">
            <Menu.Item
              id="register"
              name="register"
              active={location.pathname === "/register"}
            />
          </Link>
        </Menu.Menu>
      );
    }
  };

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Link to="/">
            <Menu.Item id="home" active={this.props.location.pathname === "/"}>
              <img src={HourGlass} height="35px" />
            </Menu.Item>
          </Link>
          <Link to="/projects">
            <Menu.Item
              name="projects"
              id="projects"
              active={this.props.location.pathname === "/projects"}
            />
          </Link>
          <Link to="user/timesheet">
            <Menu.Item
              name="timeblock"
              id="timeblock"
              active={this.props.location.pathname === "/timeblock"}
            />
          </Link>
          <Link to="/assignments">
            <Menu.Item
              name="assignments"
              id="assignments"
              active={this.props.location.pathname === "/assignments"}
            />
          </Link>
          <Link to="/dashboard">
            <Menu.Item
              name="dashboard"
              id="dashboard"
              active={this.props.location.pathname === "/dashboard"}
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
