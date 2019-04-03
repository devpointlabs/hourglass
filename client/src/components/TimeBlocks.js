import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Table, Form } from "semantic-ui-react";
import TimeBlock from "./TimeBlock";
import TimeBlockForm from "./TimeBlockForm";
import axios from "axios";

class TimeBlocks extends React.Component {
  state = { timeBlocks: [] };

  componentDidMount() {
    // need to update when routes make more sense
    const project_id = 1;
    axios
      .get(`/api/projects/${project_id}/timeblocks`)
      .then(res => this.setState({ timeBlocks: res.data }));
  }

  updateTimeBlocks = timeBlock => {
    this.setState({ timeBlocks: [...this.state.timeBlocks, timeBlock] });
  };

  render() {
    return (
      <Form>
        <Table basic="very" celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Start Time</Table.HeaderCell>
              <Table.HeaderCell>End Time</Table.HeaderCell>
              <Table.HeaderCell>Total Time</Table.HeaderCell>
              <Table.HeaderCell>Billable Hours</Table.HeaderCell>
              <Table.HeaderCell>UnBillable Hours</Table.HeaderCell>
              <Table.HeaderCell>Clock In/Clock Out</Table.HeaderCell>

              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.timeBlocks.map(t => (
              <TimeBlockForm
                key={t.id}
                data={t}
                updateTimeBlocks={this.updateTimeBlocks}
              />
            ))}
          </Table.Body>
        </Table>
      </Form>
    );
  }
}

const ConnectedTimeBlocks = props => (
  <AuthConsumer>{auth => <TimeBlocks auth={auth} {...props} />}</AuthConsumer>
);

export default ConnectedTimeBlocks;
