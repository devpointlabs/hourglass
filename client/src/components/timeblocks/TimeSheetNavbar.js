import React from "react";
import { Menu, MenuItem } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class TimeSheetNavbar extends React.Component {
  render() {
    return (
      <>
        <Menu style={{ marginTop: "0" }}>
          <Menu.Item>Day</Menu.Item>
          <Menu.Item>Day Selector</Menu.Item>
          <Menu.Item>Calendar</Menu.Item>
          <Menu.Item>Day Week</Menu.Item>
          <Menu.Item>Teamate DropDown</Menu.Item>
        </Menu>
      </>
    );
  }
}

export default TimeSheetNavbar;
