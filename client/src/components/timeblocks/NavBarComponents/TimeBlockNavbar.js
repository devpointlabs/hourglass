import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { AuthConsumer } from "../../../providers/AuthProvider";

class TimeBlockNavbar extends React.Component {
  render() {
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
          <Link to="/timesheet">
            <Menu.Item>Time Sheet</Menu.Item>
          </Link>
          <Link to="/timesheet/unsubmitted">
            <Menu.Item>Unsubmitted</Menu.Item>
          </Link>
          <Link to="/timesheet/approve_timesheets">
            <Menu.Item>Pending Approval</Menu.Item>
          </Link>
        </Menu>
      </>
    );
  }
}

export class ConnectedTimeBlockNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <TimeBlockNavbar {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
export default withRouter(ConnectedTimeBlockNavbar);
