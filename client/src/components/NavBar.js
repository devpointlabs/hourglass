import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Menu, Image } from "semantic-ui-react";
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
        <Menu.Menu
          position="right"
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* <Menu.Item
            name="logout"
            onClick={() => handleLogout(this.props.history)}
          /> */}
          <Link to="/profile">
            <Menu.Item style={{ display: "flex", alignItems: "center" }}>
              <Image size="mini" src={this.props.auth.user.image} avatar />
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
          <Image src={require("../images/hourglass.png")} size="tiny" />
          <Link to="/">
            <Menu.Item id="home" active={this.props.location.pathname === "/"}>
              Home
              {/*     <img src={HourGlass} height="35px" /> */}
            </Menu.Item>
          </Link>
          <Link to="/projects">
            <Menu.Item
              name="projects"
              id="projects"
              style={{ color: "white" }}
              active={this.props.location.pathname === "/projects"}
            />
          </Link>
          <Link to="user/timesheet">
            <Menu.Item
              name="timeblock"
              id="timeblock"
              style={{ color: "white" }}
              active={this.props.location.pathname === "/timeblock"}
            />
          </Link>
          <Link to="/assignments">
            <Menu.Item
              name="assignments"
              style={{ color: "white" }}
              id="assignments"
              active={this.props.location.pathname === "/assignments"}
            />
          </Link>
          <Link to="/dashboard">
            <Menu.Item
              name="dashboard"
              id="dashboard"
              style={{ color: "white" }}
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
