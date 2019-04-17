import React from "react";
import { Menu } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { AuthConsumer } from "../../providers/AuthProvider";

class ProjectNavbar extends React.Component {
  render() {
    const { setPage } = this.props;
    return (
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
