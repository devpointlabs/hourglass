import React from "react";
import { Table, Button } from "semantic-ui-react";

class ApproveTimesheetsRow extends React.Component {
  render() {
    const { tb } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{tb.name}</Table.Cell>
        <Table.Cell>{tb.project_name}</Table.Cell>
        <Table.Cell>{tb.task_name}</Table.Cell>
        <Table.Cell>{tb.date}</Table.Cell>
        <Table.Cell>
          {tb.manualEntry ? "Manual Entry" : "Clocked In/Out"}
        </Table.Cell>
        <Table.Cell>{tb.clock_in}</Table.Cell>
        <Table.Cell>{tb.clock_out}</Table.Cell>
        <Table.Cell>{tb.hours}</Table.Cell>
        <Table.Cell>
          <Button color="green" icon="check" size="mini" circular />
          <Button color="red" icon="pencil" size="mini" circular />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default ApproveTimesheetsRow;
