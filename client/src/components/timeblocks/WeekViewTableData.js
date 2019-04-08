import React from "react";
import WeekViewTableHeaderRow from "./WeekViewTableHeaderRow";
import WeekViewTableRow from "./WeekViewTableRow";
import { Table, Button } from "semantic-ui-react";
import moment from "moment";

class WeekViewTableData extends React.Component {
  render() {
    return (
      <>
        <Table.Header>
          <WeekViewTableHeaderRow selectedDate={this.props.selectedDate} />
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan="10" />
          </Table.Row>
          <WeekViewTableRow />
          <WeekViewTableRow />
          <WeekViewTableRow />
          <Table.Row>
            <Table.Cell clSpan="10" />
          </Table.Row>
          <Table.Row style={{ background: "lightgray" }}>
            <Table.Cell colSpan="2">
              <Button>New Row</Button>
              <Button>Save</Button>
            </Table.Cell>
            <Table.Cell>total</Table.Cell>
            <Table.Cell>total</Table.Cell>
            <Table.Cell>total</Table.Cell>
            <Table.Cell>total</Table.Cell>
            <Table.Cell>total</Table.Cell>
            <Table.Cell>total</Table.Cell>
            <Table.Cell>total</Table.Cell>
            <Table.Cell>9</Table.Cell>
            <Table.Cell>10</Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    );
  }
}

export default WeekViewTableData;
