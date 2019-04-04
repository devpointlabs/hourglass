import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";

const TableHeaderRow = () => (
  <Table.Row>
    <Table.HeaderCell style={{ paddingTop: "10px" }}>
      <Button
        style={{
          background: "#723186",
          color: "white",
          width: "25%"
        }}
        onClick={() => this.addNewTimeBlock(true)}
      >
        <Icon style={{ color: "white" }} name="add" />
      </Button>
    </Table.HeaderCell>
    <Table.HeaderCell style={{ width: "20%" }}>
      {/* <DateRange
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        updateDateRange={this.updateDateRange}
      /> */}
    </Table.HeaderCell>
    {/* {tableheaderlabels.forEach(cell =>
      <Table.HeaderCell>{cell.dayofweek}here</Table.HeaderCell>
    )} */}
    <Table.HeaderCell />
    <Table.HeaderCell>T</Table.HeaderCell>
    <Table.HeaderCell>W</Table.HeaderCell>
    <Table.HeaderCell>Th</Table.HeaderCell>
    <Table.HeaderCell>F</Table.HeaderCell>
    <Table.HeaderCell>S</Table.HeaderCell>
    <Table.HeaderCell>Su</Table.HeaderCell>

    <Table.HeaderCell />
    <Table.HeaderCell />
  </Table.Row>
);
export default TableHeaderRow;

const tableheaderlabels = [
  { dayofweek: "M", date: "11 Feb" },
  { dayofweek: "T", date: "12 Feb" },
  { dayofweek: "W", date: "13 Feb" },
  { dayofweek: "Th", date: "14 Feb" },
  { dayofweek: "F", date: "15 Feb" },
  { dayofweek: "S", date: "16 Feb" },
  { dayofweek: "Su", date: "17 Feb" }
];
