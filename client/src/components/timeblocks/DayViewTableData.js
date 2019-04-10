import React from "react";
import DayViewTableHeaderRow from "./DayViewTableHeaderRow";
import DayViewTableRow from "./DayViewTableRow";
import { Table } from "semantic-ui-react";
import moment from "moment";
import { returnDayHours, returnDayInfo } from "./Calculations";

class DayViewTableData extends React.Component {
  render() {
    const {
      selectedDate,
      timeBlocks,
      tasks,
      currentWeekTimeBlocks,
      monday,
      stopTimer
    } = this.props;
    const currentDayBlocks = timeBlocks.filter(
      b =>
        moment(b.start_time).format("YYYY-MM-DD") ===
        moment(selectedDate).format("YYYY-MM-DD")
    );

    const dailyTotal = currentDayBlocks.reduce(
      (runningTotal, block) => runningTotal + parseFloat(block.hours),
      0
    );

    const currentDayBlocksWithTaskInfo = currentDayBlocks.map(b => {
      return {
        ...b,
        // {start: '', end: '', taskInfo: tasks}
        taskInfo: tasks
          .filter(t => t.id === b.task_id)
          .reduce((acc, task) => acc + task)
      };
    });

    return (
      <>
        <Table.Header>
          <DayViewTableHeaderRow
            selectedDate={selectedDate}
            currentWeekTimeBlocks={currentWeekTimeBlocks}
            monday={monday}
          />
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan="10" />
          </Table.Row>
          {currentDayBlocksWithTaskInfo.map(b => (
            <DayViewTableRow
              key={b.id}
              timeBlock={b}
              monday={monday}
              stopTimer={stopTimer}
            />
          ))}
          <Table.Row>
            <Table.Cell colSpan="10">
              <hr />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell
              colSpan="6"
              style={{ fontWeight: "bold", fontSize: "1.2em" }}
            >
              Daily Total:
            </Table.Cell>
            <Table.Cell
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.2em"
              }}
            >
              {dailyTotal.toFixed(2)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    );
  }
}

export default DayViewTableData;
