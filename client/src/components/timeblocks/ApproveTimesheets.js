import React from "react";
import { Table, Header } from "semantic-ui-react";
import TimeBlockNavbar from "./NavBarComponents/TimeBlockNavbar";
import ApproveTimesheetsRow from "./ApproveTimesheetsRow";
import axios from "axios";
// import styled from "styled-components";

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
        {/* <MobileContainer> */}
        <Table stackable>
          <Table.Row>
            <Table.Cell> Employee</Table.Cell>
            <Table.Cell> Project</Table.Cell>
            <Table.Cell> Task</Table.Cell>
            <Table.Cell> Input Type</Table.Cell>
            <Table.Cell> Clocked In</Table.Cell>
            <Table.Cell> Clocked Out</Table.Cell>
            <Table.Cell> Hours</Table.Cell>
            <Table.Cell> Approve or Edit</Table.Cell>
          </Table.Row>
          <Table.Body>{this.showTimeblocks()}</Table.Body>
        </Table>
        {/* </MobileContainer> */}
      </>
    );
  }
}

// const MobileContainer = styled.div`
//   @media (max-width: 425px) {
//     display: flex;
//     flex-direction: column;
//   }
// `;

export default ApproveTimesheets;
