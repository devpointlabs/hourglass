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
        <div style={{ padding: "0 10px 0 10px" }}>
          <Table stackable>
            <Table.Header>
              <Table.Row style={{ background: "#e2e2e2" }}>
                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "50px",
                    fontWeight: "bold"
                  }}
                />
                <Table.Cell style={{ width: "1100px", fontWeight: "bold" }} />
                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "350px",
                    fontWeight: "bold"
                  }}
                >
                  Start Time
                </Table.Cell>
                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "350px",
                    fontWeight: "bold"
                  }}
                >
                  End Time
                </Table.Cell>

                <Table.Cell
                  style={{
                    fontSize: "1.1em",
                    width: "50px",
                    fontWeight: "bold"
                  }}
                >
                  Hours
                </Table.Cell>
                <Table.Cell>
                  {this.props.auth.user.admin ? (
                    <Button onClick={this.approveAll}>Approve All</Button>
                  ) : null}
                </Table.Cell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.showTimeblocks()}</Table.Body>
          </Table>
        </div>

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
