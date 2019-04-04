import React from "react";
import { Menu, MenuItem } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class TimeBlockNavbar extends React.Component {
  render() {
    return (
      <>
        <div
          style={{
            backgroundImage: "linear-gradient(to right, grey, white)",
            width: "100%",
            height: "10px"
          }}
        />
        <Menu style={{ marginTop: "0" }}>
          <Link to="/user/timesheet">
            <Menu.Item>Time Sheet</Menu.Item>
          </Link>
          <Link to="/user/pending">
            <Menu.Item>Pending Approval</Menu.Item>
          </Link>
          <Link to="/user/unsubmitted">
            <Menu.Item>Unsubmitted</Menu.Item>
          </Link>
        </Menu>
      </>
    );
  }
}

export default TimeBlockNavbar;
