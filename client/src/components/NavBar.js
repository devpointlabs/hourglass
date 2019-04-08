import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Menu, Image, Divider } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends React.Component {
  rightNavItems = () => {
    const {
      auth: { user, handleLogout },
      location
    } = this.props;

    if (user) {
      return (
        <Menu.Menu
          position="right"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Link to="/profile">
            <Menu.Item
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: ".5em"
              }}
            >
              <div style={{ paddingRight: "1em" }}>
                <Image size="mini" src={this.props.auth.user.image} avatar />
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
              style={{ color: "white" }}
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
            <Image
              src={require("../images/hourglass_white_inside.png")}
              size="tiny"
              style={{ height: "40px", width: "40px", margin: "5px" }}
            />
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
                pathname === "/timesheet/pending" ||
                pathname === "/timesheet/unsubmitted"
              }
            />
          </Link>
          <Link to="/dashboard">
            <Menu.Item
              name="dashboard"
              id="dashboard"
              style={{ color: "white" }}
              active={pathname === "/dashboard"}
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
