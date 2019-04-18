import React from "react";
import { Table, Header, Button } from "semantic-ui-react";
import TimeBlockNavbar from "./NavBarComponents/TimeBlockNavbar";
import ApproveTimesheetsRow from "./ApproveTimesheetsRow";
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider";

class ApproveTimesheets extends React.Component {
  state = {
    timeblocks: []
  };
  componentDidMount() {
    if (this.props.auth.user.admin === true) {
      axios.get("/api/timeblock/pending").then(res => {
        this.setState({ timeblocks: res.data });
      });
    } else {
      const { id } = this.props.auth.user;
      axios.get(`/api/user/${id}/pendingtimeblocks`).then(res => {
        this.setState({ timeblocks: res.data });
      });
    }
  }

  removeTimeblock = id => {
    this.setState({
      timeblocks: this.state.timeblocks.filter(t => t.id !== id)
    });
  };

  showTimeblocks = () => {
    return this.state.timeblocks.map(tb => (
      <ApproveTimesheetsRow removeTimeblock={this.removeTimeblock} tb={tb} />
    ));
  };

  approveAll = () => {
    axios.put(`/api/approve_all_pending`);
    this.setState({ timeblocks: [] });
  };

  render() {
    return (
      <>
        <TimeBlockNavbar />
        <Header textAlign="center" as="h1">
          Pending Approval
        </Header>
        <Table>
          <Table.Header>
            <Table.HeaderCell> Employee</Table.HeaderCell>
            <Table.HeaderCell> Project</Table.HeaderCell>
            <Table.HeaderCell> Task</Table.HeaderCell>
            <Table.HeaderCell> Input Type</Table.HeaderCell>
            <Table.HeaderCell> Clocked In</Table.HeaderCell>
            <Table.HeaderCell> Clocked Out</Table.HeaderCell>
            <Table.HeaderCell> Hours</Table.HeaderCell>
            <Table.HeaderCell>
              {" "}
              {this.props.auth.user.admin ? (
                <Button onClick={this.approveAll}>Approve All</Button>
              ) : null}
            </Table.HeaderCell>
          </Table.Header>
          <Table.Body>{this.showTimeblocks()}</Table.Body>
        </Table>
      </>
    );
  }
}

export class ConnectedApproveTimesheets extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <ApproveTimesheets {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
export default ConnectedApproveTimesheets;
