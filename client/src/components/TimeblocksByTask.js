import React from "react";
import { Table } from "semantic-ui-react";
import axios from "axios";

class TimeblocksByTask extends React.Component {
  state = { timeblocks: [] };

  componentDidMount() {
    const { task } = this.props;
    axios.get(`/api/task/${task.id}/timeblocks_by_task`).then(res => {
      this.setState({ timeblocks: res.data });
    });
  }

  showTimeblocks = () => {
    return this.state.timeblocks.map(tb => (
      <Table.Row>
        <Table.Cell>{tb.name}</Table.Cell>
        <Table.Cell>{tb.start_time}</Table.Cell>
        <Table.Cell>{tb.end_time}</Table.Cell>
        <Table.Cell>{tb.hours}</Table.Cell>
      </Table.Row>
    ));
  };

  render() {
    return (
      <div>
        <Table fluid>
          <Table.Header>
            <Table.HeaderCell>Employee</Table.HeaderCell>
            <Table.HeaderCell>Start Time</Table.HeaderCell>
            <Table.HeaderCell>End Time</Table.HeaderCell>
            <Table.HeaderCell>Hours</Table.HeaderCell>
          </Table.Header>
          <Table.Body>{this.showTimeblocks()}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default TimeblocksByTask;
