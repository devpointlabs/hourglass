import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import TimerStartStopButton from "../TimerStartStopButton";
import moment from "moment";

const DayViewTableRow = ({ timeBlock, stopTimer }) => (
  <Table.Row>
    <Table.Cell style={{ padding: 0 }} colSpan={calcColSpan(timeBlock)}>
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
    <Table.Cell style={{ padding: 0, border: "none" }}>
      <div style={{ display: "flex" }}>
        <div style={{ height: "40px" }}>
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

const calcColSpan = timeBlock => {
  let numberDayOfWeek = moment(timeBlock.start_time).format("d");
  return numberDayOfWeek;
};
