import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { AuthConsumer } from "../../../providers/AuthProvider";
import { CircleCountConsumer } from "../../../providers/CircleCountProvider";

class TimeBlockNavbar extends React.Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <>
        <Menu style={{ marginTop: "0" }}>
          <NavLink to="/timesheet">
            <Menu.Item name="timesheet" active={pathname === "/timesheet"}>
              Time Sheet
              <div style={{ height: "18px" }} />
            </Menu.Item>
          </NavLink>
          <NavLink to="/timesheet/unsubmitted">
            <Menu.Item
              name="unsubmitted"
              active={pathname === "/timesheet/unsubmitted"}
            >
              Unsubmitted
              <div
                style={{
                  visibility:
                    parseInt(this.props.circleCount.unSubmittedCircleCount) !==
                      0 && this.props.circleCount.unSubmittedCircleCount
                      ? "visible"
                      : "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "18px",
                  height: "18px",
                  background: "rebeccapurple",
                  color: "white",
                  borderRadius: "15px",
                  fontSize: "10px",
                  padding: 0,
                  marginLeft: "5px",
                  fontWeight: "bold"
                }}
              >
                {this.props.circleCount.unSubmittedCircleCount}
              </div>
            </Menu.Item>
          </NavLink>
          <NavLink to="/timesheet/approve_timesheets">
            <Menu.Item
              name="pending"
              active={pathname === "/timesheet/approve_timesheets"}
            >
              Pending Approval
              <div
                style={{
                  visibility:
                    parseInt(this.props.circleCount.pendingCircleCount) !== 0 &&
                    this.props.circleCount.pendingCircleCount
                      ? "visible"
                      : "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "18px",
                  height: "18px",
                  background: "rebeccapurple",
                  color: "white",
                  borderRadius: "15px",
                  fontSize: "10px",
                  padding: 0,
                  marginLeft: "5px",
                  fontWeight: "bold"
                }}
              >
                {this.props.circleCount.pendingCircleCount}
              </div>
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

export class DoubleConnectedTimeBlockNavbar extends React.Component {
  render() {
    return (
      <CircleCountConsumer>
        {circleCount => (
          <ConnectedTimeBlockNavbar {...this.props} circleCount={circleCount} />
        )}
      </CircleCountConsumer>
    );
  }
}

export default withRouter(DoubleConnectedTimeBlockNavbar);
