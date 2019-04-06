import React from "react";
import DayViewTableHeaderRow from "./DayViewTableHeaderRow";
import DayViewTableRow from "./DayViewTableRow";
import { Table, Button, Icon } from "semantic-ui-react";
import moment from "moment";

class DayViewTableData extends React.Component {
  render() {
    const { selectedDate, timeBlocks } = this.props;
    const currentDayBlocks = timeBlocks.filter(
      b =>
        moment(b.start_time).format("YYYY-MM-DD") ===
        moment(selectedDate).format("YYYY-MM-DD")
    );

    const dailyTotal = currentDayBlocks.reduce(
      (runningTotal, block) => runningTotal + parseFloat(block.hours),
      0
    );

    return (
      <>
        <Table.Header>
          <DayViewTableHeaderRow selectedDate={selectedDate} />
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan="10" />
          </Table.Row>
          {currentDayBlocks.map(b => (
            <DayViewTableRow timeBlock={b} />
          ))}
          <Table.Row>
            <Table.Cell colSpan="10">
              <hr />
            </Table.Cell>
          </Table.Row>
          <Table.Cell colSpan="6">Daily Total:</Table.Cell>
          <Table.Cell>{dailyTotal.toFixed(2)}</Table.Cell>
          <Table.Row />
        </Table.Body>
      </>
    );
  }
}

export default DayViewTableData;
