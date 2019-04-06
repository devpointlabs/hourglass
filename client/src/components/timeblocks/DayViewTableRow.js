import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";

const DayViewTableRow = ({ timeBlock }) => (
  <Table.Row>
    <Table.Cell style={{ padding: 0 }} colSpan="6">
      <div>
        <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
          {timeBlock.taskInfo && timeBlock.taskInfo.projectInfo.name} (
          {timeBlock.taskInfo && timeBlock.taskInfo.projectInfo.client_name})
        </div>
        <div>{timeBlock.taskInfo && timeBlock.taskInfo.name}</div>
      </div>
    </Table.Cell>
    <Table.Cell
      style={{ padding: "0 5px 0 5px", textAlign: "center", fontSize: "1.1em" }}
    >
      {parseFloat(timeBlock.hours).toFixed(2)}
    </Table.Cell>
    <Table.Cell style={{ padding: 0 }}>
      <div style={{ display: "flex" }}>
        <Button>
          <Icon name="stopwatch" />
          Start
        </Button>
        <Button>
          <Icon name="pencil" />
        </Button>
      </div>
    </Table.Cell>
  </Table.Row>
);

export default DayViewTableRow;
