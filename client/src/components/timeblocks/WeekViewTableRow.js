import React from "react";
import { Table, Button } from "semantic-ui-react";
import { returnHoursSplitByDay } from "./Calculations";

class WeekViewTableRow extends React.Component {
  render() {
    const { timeBlock } = this.props;
    const {
      mondayHours,
      tuesdayHours,
      wednesdayHours,
      thursdayHours,
      fridayHours,
      saturdayHours,
      sundayHours,
      total
    } = this.props.dayHours;

    return (
      <Table.Row>
        <>
          <Table.Cell>
            <div>
              {timeBlock.taskInfo.projectInfo.name}(
              {timeBlock.taskInfo.projectInfo.client_name})
            </div>
            <div>{timeBlock.taskInfo.name}</div>
          </Table.Cell>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>{mondayHours.toFixed(1)}</Table.Cell>
          <Table.Cell>{tuesdayHours.toFixed(1)}</Table.Cell>
          <Table.Cell>{wednesdayHours.toFixed(1)}</Table.Cell>
          <Table.Cell>{thursdayHours.toFixed(1)}</Table.Cell>
          <Table.Cell>{fridayHours.toFixed(1)}</Table.Cell>
          <Table.Cell>{saturdayHours.toFixed(1)}</Table.Cell>
          <Table.Cell>{sundayHours.toFixed(1)}</Table.Cell>
          <Table.Cell>{total.toFixed(1)}</Table.Cell>
        </>
        <Table.Cell>
          <Button>X</Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default WeekViewTableRow;
