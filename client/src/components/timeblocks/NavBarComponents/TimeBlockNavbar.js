import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { AuthConsumer } from "../../../providers/AuthProvider";

class TimeBlockNavbar extends React.Component {
  
  render() {
    const {pathname} =this.props.location
    return (
      <>
        <Menu style={{ marginTop: "0" }}>
          <NavLink to="/timesheet" 
          >
            <Menu.Item 
            name='timesheet' 
            active={pathname === '/timesheet'} 
           
            >Time Sheet
            </Menu.Item>
          </NavLink>
          <NavLink to="/timesheet/unsubmitted" 
          >
            <Menu.Item 
            name='unsubmitted' 
            active={pathname === '/timesheet/unsubmitted'} 
            
            >Unsubmitted
            </Menu.Item>
          </NavLink>
          <NavLink to="/timesheet/approve_timesheets" 
          >
            <Menu.Item 
            name='pending' 
            active={pathname === '/timesheet/approve_timesheets'} 
            
            >Pending Approval
            </Menu.Item>
          </NavLink>
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
