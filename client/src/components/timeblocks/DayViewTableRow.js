import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import TimerStartStopButton from "./TimerStartStopButton";

const DayViewTableRow = ({ timeBlock, stopTimer }) => (
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
      {timeBlock.end_time ? parseFloat(timeBlock.hours).toFixed(2) : 0}
    </Table.Cell>
    <Table.Cell style={{ padding: 0 }}>
      <div style={{ display: "flex" }}>
        <div style={{ height: "30px" }}>
          {!timeBlock.end_time && (
            <TimerStartStopButton
              large={false}
              handleClick={stopTimer}
              id={timeBlock.id}
            />
          )}
        </div>
        {/* <Button>
          <Icon name="pencil" />
        </Button> */}
      </div>
    </Table.Cell>
  </Table.Row>
);

export default DayViewTableRow;
