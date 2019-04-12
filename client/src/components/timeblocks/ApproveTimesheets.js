import React from "react";
import { Table, Header } from "semantic-ui-react";
import TimeBlockNavbar from "./NavBarComponents/TimeBlockNavbar";
import ApproveTimesheetsRow from "./ApproveTimesheetsRow";
import axios from "axios";

class ApproveTimesheets extends React.Component {
  state = {
    timeblocks: []
  };
  componentDidMount() {
    axios.get("/api/timeblock/pending").then(res => {
      this.setState({ timeblocks: res.data });
    });
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

  render() {
    return (
      <>
        <TimeBlockNavbar />
        <Header textAlign="center" as="h1">
          Approve Timeblocks
        </Header>
        <Table>
          <Table.Header>
            <Table.HeaderCell> Employee</Table.HeaderCell>
            <Table.HeaderCell> Project</Table.HeaderCell>
            <Table.HeaderCell> Task</Table.HeaderCell>
            <Table.HeaderCell> Input Type</Table.HeaderCell>
            <Table.HeaderCell> Date</Table.HeaderCell>
            <Table.HeaderCell> Clocked In</Table.HeaderCell>
            <Table.HeaderCell> Clocked Out</Table.HeaderCell>
            <Table.HeaderCell> Hours</Table.HeaderCell>
            <Table.HeaderCell> Approve or Edit</Table.HeaderCell>
          </Table.Header>
          <Table.Body>{this.showTimeblocks()}</Table.Body>
        </Table>
      </>
    );
  }
}

export default ApproveTimesheets;
