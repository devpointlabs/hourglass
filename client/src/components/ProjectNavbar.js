import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { AuthConsumer } from "../providers/AuthProvider";
import axios from "axios";

class ProjectNavbar extends React.Component {
  render() {
    const { setPage } = this.props;
    return (
      <>
        <div
          style={{
            backgroundImage: "linear-gradient(to right, grey, white)",
            width: "100%",
            height: "5px"
          }}
        />
        <Menu style={{ marginTop: "0" }}>
          <Menu.Item
            style={{
              width: "110px",
              display: "flex",
              justifyContent: "center"
            }}
            onClick={() => setPage("budget")}
          >
            Budget
          </Menu.Item>
          <Menu.Item
            style={{
              width: "110px",
              display: "flex",
              justifyContent: "center"
            }}
            onClick={() => setPage("task")}
          >
            Tasks
          </Menu.Item>
          <Menu.Item
            style={{
              width: "110px",
              display: "flex",
              justifyContent: "center"
            }}
            onClick={() => setPage("team")}
          >
            Team
          </Menu.Item>
        </Menu>
      </>
    );
  }
}

export class ConnectedProjectNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <ProjectNavbar {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
export default withRouter(ConnectedProjectNavbar);
